import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PrimaryButton, Screen, Sheet, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ABILITIES, LEVELS } from '../../hpc/config.js'
import { EvalFooter, Icons, LeaveSheet, LevelBadge, LockNotice, ProvenanceChip } from '../../hpc/components.jsx'
import { OutputBlock } from './GroupOutput.jsx'
import { emit, firstName, groupOf, nameOf, saveWithGuard, stageOpen, useDraft } from './lib.js'
import { AppBar, Card, Field, GroupCard, NoActivityRedirect, Radio, SavedScreen, SectionLabel, StateScreen, StepProgress, ViewSubmission, groupLabel, useBPage } from './parts.jsx'

const empty = () => ({ step: 0, levels: {}, comments: '' })

/**
 * Stage 3 teacher assessment (Page 5): pick ONE level per ability from the teacher's own
 * descriptors (Beginner 5 · Proficient 10 · Advanced 15) + comments. Emits 'B.S3.teacher_evaluated'.
 */
export default function LevelAssess() {
  const { classId, learnerId, a, base } = useBPage()
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const [form, setForm, clearDraft, dirty] = useDraft(`${a?.id}:S3:${learnerId}`, empty())
  const [dir, setDir] = useState('right')
  const [sheet, setSheet] = useState(false)
  const [leave, setLeave] = useState(false)
  const [loading, setLoading] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [shake, setShake] = useState(0)
  const [error, setError] = useState(0)

  if (!a) return <NoActivityRedirect classId={classId} />
  const l = a.learners?.[learnerId]
  const group = groupOf(a, learnerId)
  if (!l || !group) return <Navigate to={base} replace />
  const name = nameOf(a, learnerId)
  const back = () => navigate(`${base}?stage=S3`)
  const title = t('Evaluate {name}', { name: firstName(name) })
  const rubric = a.rubricS3 ?? {}

  if (justSaved) {
    const next = group.members.find((m) => m !== learnerId && !a.learners[m]?.s3Teacher?.savedAt)
    return (
      <SavedScreen title={t('Student Evaluation')} heading={t('Evaluation Submitted')}
        body={t('Stage 3 assessment for {name} has been saved. You can now complete their Overview.\nSaved evaluations can’t be edited.', { name })}
        primary={t('Back to progress')} onPrimary={back}
        secondary={next ? t('Next: {name}', { name: nameOf(a, next) }) : t('Open the Overview')}
        onSecondary={() => navigate(next ? `${base}/s3/${next}` : `${base}/overview/${learnerId}`, { replace: true })} />
    )
  }

  if (l.s3Teacher?.savedAt) {
    return (
      <Screen bg="plain" header={<AppBar title={t('{stage} · {name}', { stage: t('Stage 3'), name })} subtitle={groupLabel(t, group.name)} onBack={back} />}>
        <div className="stagger flex flex-col gap-4 p-4 pb-8">
          <LockNotice>{t('Evaluation saved. Saved evaluations can’t be edited.')}</LockNotice>
          {ABILITIES.map((ab) => {
            const lv = l.s3Teacher.levels?.[ab.id]
            return (
              <Card key={ab.id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <SectionLabel>{t(ab.label)}</SectionLabel>
                  <LevelBadge level={lv} />
                </div>
                <p className="pt-2 text-[0.875rem] leading-5 text-ink-2">{rubric[ab.id]?.[lv] || '—'}</p>
              </Card>
            )
          })}
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2"><SectionLabel>{t('Feedback')}</SectionLabel><ProvenanceChip kind="teacher" /></div>
            <Field label={t('Feedback for the student')} value={l.s3Teacher.comments} readOnly />
          </Card>
          <PrimaryButton onClick={() => navigate(`${base}/overview/${learnerId}`)}>{t('Open the Overview')}</PrimaryButton>
        </div>
      </Screen>
    )
  }

  if (!stageOpen(a, 'S3') || !group.final?.recordedAt || !a.rubricSavedAt) {
    const why = !stageOpen(a, 'S3') ? 'closed' : !a.rubricSavedAt ? 'rubric' : 'record'
    return (
      <StateScreen title={title} subtitle={groupLabel(t, group.name)}
        heading={t({ closed: 'Stage 3 is not open yet', rubric: 'Write the Stage 3 rubric first', record: 'Record the group’s final output first' }[why])}
        body={t('Stage 3 is assessed against your rubric, from the final output you record for the group.')}
        action={t({ closed: 'Back to progress', rubric: 'Write rubric', record: 'Record final' }[why])}
        onAction={() => navigate({ closed: `${base}?stage=S3`, rubric: `${base}/s3/rubric`, record: `${base}/s3/record/${group.id}` }[why])} />
    )
  }

  const step = form.step
  const total = ABILITIES.length
  const ab = ABILITIES[step - 1]
  const go = (s) => { setDir(s > step ? 'right' : 'left'); setForm((f) => ({ ...f, step: s })) }
  const next = () => {
    if (ab && !form.levels[ab.id]) { setShake((n) => n + 1); return }
    go(step + 1)
  }
  const label = step === 0 ? t('Submission') : step <= total ? t('Question {n} of {total}', { n: step, total }) : t('Feedback')

  const save = () => {
    if (!form.comments.trim()) { setError((n) => n + 1); return }
    saveWithGuard({
      setLoading, showToast, t,
      run: () => {
        emit(a.id, 'B.S3.teacher_evaluated', (x) => {
          x.learners[learnerId].s3Teacher = { levels: form.levels, comments: form.comments.trim(), savedAt: new Date().toISOString() }
        }, { target: learnerId })
        clearDraft()
        showToast(t('Evaluation saved for {name}', { name }))
        setJustSaved(true)
      },
    })
  }

  const output = <OutputBlock output={group.final} label={t('Stage 3 · Final output')} />

  return (
    <Screen
      bg="plain"
      header={
        <>
          <AppBar title={title} onBack={() => (dirty ? setLeave(true) : back())} />
          <StepProgress label={label} pct={((step + 1) / (total + 2)) * 100} action={step > 0 && <ViewSubmission onClick={() => setSheet(true)} />} />
        </>
      }
      footer={
        step <= total ? (
          <EvalFooter prevDisabled={step === 0} onPrev={() => go(step - 1)} onNext={next} nextLabel={step === 0 ? t('Start evaluation') : t('Next')} />
        ) : (
          <div className="flex shrink-0 flex-wrap-reverse items-center gap-3 px-4 pb-6 pt-3">
            <button onClick={() => go(step - 1)} className="tap min-h-12 min-w-[min(8rem,100%)] flex-1 rounded-full border border-line bg-white px-4 py-2 text-[1rem] font-semibold text-ink hover:bg-surface">{t('Previous')}</button>
            <PrimaryButton className="min-w-[min(8rem,100%)] flex-1 font-semibold" loading={loading} onClick={save}>{t('Save evaluation')}</PrimaryButton>
          </div>
        )
      }
    >
      <div key={step} className={cx('flex flex-col gap-4 p-4', dir === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
        {step === 0 && (
          <>
            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.96px] text-brand-600">{t('Stage 3')} · {t('Final')}</p>
              <h2 className="pt-1 text-[1.25rem] font-semibold leading-7 text-ink">{name}</h2>
            </div>
            <GroupCard a={a} group={group} />
            {output}
          </>
        )}
        {ab && (
          <div key={shake} className={cx('flex flex-col gap-3', shake > 0 && !form.levels[ab.id] && 'animate-shake')}>
            <SectionLabel>{t(ab.label)}</SectionLabel>
            <p className="text-[1.125rem] leading-[1.625rem] text-ink">{t('Pick the level that best describes {name}’s work for {ability}.', { name: firstName(name), ability: t(ab.label) })}</p>
            <div role="radiogroup" aria-label={t(ab.label)} className="stagger flex flex-col gap-2.5">
              {LEVELS.map((lv) => {
                const on = form.levels[ab.id] === lv.id
                return (
                  <button key={lv.id} type="button" role="radio" aria-checked={on}
                    onClick={() => setForm((f) => ({ ...f, levels: { ...f.levels, [ab.id]: lv.id } }))}
                    className={cx('tap-soft flex items-start gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left transition-colors', on ? 'border-brand-600 bg-[#fffaf5]' : 'border-line hover:border-[#d2cdc7]')}>
                    <span className="pt-0.5"><Radio checked={on} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2"><LevelBadge level={lv.id} /><span className="text-[0.75rem] text-ink-muted">{t('{n} marks', { n: lv.value })}</span></span>
                      <span className="block pt-1.5 text-[0.9375rem] leading-[1.375rem] text-ink">{rubric[ab.id]?.[lv.id]}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            {shake > 0 && !form.levels[ab.id] && <p role="alert" className="text-[0.75rem] text-danger">{t('Pick one level to continue.')}</p>}
          </div>
        )}
        {step > total && (
          <>
            <Field id="fb3" key={`fb${error}`} label={t('Feedback for the student')} hint={t('They will see this once it is released.')} rows={4}
              value={form.comments} onChange={(v) => setForm((f) => ({ ...f, comments: v }))} placeholder={t('e.g. Your water map was clear and your action plan was practical.')}
              error={error && !form.comments.trim() ? t('Write a short comment for the student.') : null} />
            <div className="flex gap-2 rounded-xl border border-[#f1b77f] bg-brand-50 p-3 text-[0.8125rem] leading-[1.1875rem] text-brand-700">
              <Icons.info width="18" height="18" aria-hidden className="mt-0.5 shrink-0" />
              <p><span className="font-bold">{t('Once saved, this evaluation can’t be edited.')}</span> {t('Check your levels and feedback before you save.')}</p>
            </div>
          </>
        )}
      </div>

      <Sheet open={sheet} onClose={() => setSheet(false)}>
        <div className="flex flex-col gap-3 px-4 pb-6 pt-3">
          <h2 className="text-[1.125rem] font-semibold text-ink">{t('Submission')} · {groupLabel(t, group.name)}</h2>
          {output}
          <PrimaryButton onClick={() => setSheet(false)}>{t('Back to evaluation')}</PrimaryButton>
        </div>
      </Sheet>
      <LeaveSheet open={leave} title={t('Leave this evaluation?')} body={t('Your levels and comments will be lost.')} onStay={() => setLeave(false)} onLeave={() => { clearDraft(); setLeave(false); back() }} />
    </Screen>
  )
}
