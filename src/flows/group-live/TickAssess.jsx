import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PrimaryButton, Screen, Sheet, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ABILITIES, GROUP_PROJECT } from '../../hpc/config.js'
import { EvalFooter, EventNotice, Icons, LeaveSheet, LockNotice, ProvenanceChip, TickList } from '../../hpc/components.jsx'
import { OutputBlock } from './GroupOutput.jsx'
import { PlanningBlock, UnpackingBlock } from './Submission.jsx'
import { emit, firstName, groupOf, nameOf, reflectionStatus, saveWithGuard, stageOpen, useDraft } from './lib.js'
import { AppBar, Card, Field, GroupCard, NoActivityRedirect, SavedScreen, SectionLabel, StateScreen, StepProgress, ViewSubmission, groupLabel, useBPage } from './parts.jsx'

const empty = () => ({ step: 0, ticks: Object.fromEntries(ABILITIES.map((a) => [a.id, []])), comments: '', intervention: '' })

/**
 * Stage 1 (Page 3) and Stage 2 (Page 4) teacher assessment for one learner:
 * submission → Awareness → Sensitivity → Creativity (tick cards, kit T09-06 / T10-10) →
 * comments + pedagogical intervention (T09-11) → saved, read-only (T09-13).
 * Emits 'B.S1.teacher_evaluated' / 'B.S2.teacher_evaluated' (target learnerId).
 */
export default function TickAssess({ stage }) {
  const { classId, learnerId, a, base } = useBPage()
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const key = `${stage.toLowerCase()}Teacher`
  const draftKey = `${a?.id}:${stage}:${learnerId}`
  const [form, setForm, clearDraft, hasDraft] = useDraft(draftKey, empty())
  const [dir, setDir] = useState('right')
  const [sheet, setSheet] = useState(false)
  const [leave, setLeave] = useState(false)
  const [loading, setLoading] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [error, setError] = useState(0)

  if (!a) return <NoActivityRedirect classId={classId} />
  const l = a.learners?.[learnerId]
  const group = groupOf(a, learnerId)
  if (!l || !group) return <Navigate to={base} replace />
  const name = nameOf(a, learnerId)
  const stageLabel = t(stage === 'S1' ? 'Stage 1' : 'Stage 2')
  const title = t('Evaluate {name}', { name: firstName(name) })
  const back = () => navigate(`${base}?stage=${stage}`)
  const saved = l[key]
  const statements = GROUP_PROJECT[key]

  if (justSaved) {
    const next = group.members.find((m) => m !== learnerId && !a.learners[m]?.[key]?.savedAt)
    return (
      <SavedScreen
        title={t('Student Evaluation')}
        heading={t('Evaluation Submitted')}
        body={t(stage === 'S1'
          ? '{stage} assessment for {name} has been saved. Their Stage 1 self-reflection is now open.\nSaved evaluations can’t be edited.'
          : '{stage} assessment for {name} has been saved.\nSaved evaluations can’t be edited.', { stage: stageLabel, name })}
        primary={t('Back to progress')}
        onPrimary={back}
        secondary={next ? t('Next: {name}', { name: nameOf(a, next) }) : null}
        onSecondary={() => navigate(`${base}/${stage.toLowerCase()}/${next}`, { replace: true })}
      />
    )
  }

  /* ---------- Read-only (saved) */
  if (saved?.savedAt) {
    const refl = stage === 'S1' ? reflectionStatus(a, learnerId, 'S1') : null
    return (
      <Screen bg="plain" header={<AppBar title={t('{stage} · {name}', { stage: stageLabel, name })} subtitle={groupLabel(t, group.name)} onBack={back} />}>
        <div className="stagger flex flex-col gap-4 p-4 pb-8">
          <LockNotice>{t('Evaluation saved. Saved evaluations can’t be edited.')}</LockNotice>
          {stage === 'S1' && (
            <EventNotice tone={refl === 'done' || refl === 'done-late' ? 'success' : 'info'} title={t(refl === 'done' || refl === 'done-late' ? 'Stage 1 self-reflection submitted' : 'Stage 1 self-reflection is open for {name}', { name: firstName(name) })}>
              {refl === 'late' ? t('The reflection is past its due date.') : null}
            </EventNotice>
          )}
          {ABILITIES.map((ab) => (
            <Card key={ab.id}>
              <TickList ability={ab.id} statements={statements[ab.id]} value={saved.ticks?.[ab.id] ?? []} readOnly />
            </Card>
          ))}
          <Card className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><SectionLabel>{t('Feedback')}</SectionLabel><ProvenanceChip kind="teacher" /></div>
            <Field label={t('Feedback for the student')} value={saved.comments} readOnly />
            <Field label={t('Pedagogical intervention')} hint={t('For your record and the HPC — not shown to students.')} value={saved.intervention} readOnly />
          </Card>
        </div>
      </Screen>
    )
  }

  /* ---------- Gates (waiting states are real screens) */
  if (stage === 'S1' && !group.planning?.submittedAt) {
    return <StateScreen title={title} subtitle={groupLabel(t, group.name)} heading={t('Waiting for {group}', { group: groupLabel(t, group.name) })}
      body={t('You can assess {name} once the group submits its Stage 1 planning.', { name: firstName(name) })} action={t('Back to progress')} onAction={back} />
  }
  if (stage === 'S2' && (!stageOpen(a, 'S2') || !group.draft?.recordedAt)) {
    return <StateScreen title={title} subtitle={groupLabel(t, group.name)}
      heading={!stageOpen(a, 'S2') ? t('Stage 2 is not open yet') : t('Record the group’s draft first')}
      body={t('Stage 2 is assessed from the draft you record for the group.')}
      action={!stageOpen(a, 'S2') ? t('Back to progress') : t('Record draft')}
      onAction={() => (stageOpen(a, 'S2') ? navigate(`${base}/s2/record/${group.id}`) : back())} />
  }

  /* ---------- Form */
  const step = form.step
  const total = ABILITIES.length
  const ab = ABILITIES[step - 1]
  const dirty = hasDraft
  const go = (s) => { setDir(s > step ? 'right' : 'left'); setForm((f) => ({ ...f, step: s })) }
  const onBack = () => (dirty ? setLeave(true) : back())
  const label = step === 0 ? t('Submission') : step <= total ? t('Question {n} of {total}', { n: step, total }) : t('Feedback')
  const pct = ((step + 1) / (total + 2)) * 100

  const save = () => {
    if (!form.comments.trim()) { setError((n) => n + 1); return }
    saveWithGuard({
      setLoading, showToast, t,
      run: () => {
        emit(a.id, `B.${stage}.teacher_evaluated`, (x) => {
          x.learners[learnerId][key] = { ticks: form.ticks, comments: form.comments.trim(), intervention: form.intervention.trim(), savedAt: new Date().toISOString() }
        }, { target: learnerId })
        clearDraft()
        showToast(t('Evaluation saved for {name}', { name }))
        setJustSaved(true)
      },
    })
  }

  const submission = stage === 'S1' ? (
    <>
      <PlanningBlock a={a} group={group} />
      <UnpackingBlock a={a} learnerId={learnerId} />
    </>
  ) : (
    <>
      <OutputBlock output={group.draft} label={t('Stage 2 · Draft')} />
      <EventNotice tone="info" title={t('Teacher-only stage')}>{t('No self or peer evaluation at this stage.')}</EventNotice>
    </>
  )

  return (
    <Screen
      bg="plain"
      header={
        <>
          <AppBar title={title} onBack={onBack} />
          <StepProgress label={label} pct={pct} action={step > 0 && <ViewSubmission onClick={() => setSheet(true)} />} />
        </>
      }
      footer={
        step <= total ? (
          <EvalFooter prevDisabled={step === 0} onPrev={() => go(step - 1)} onNext={() => go(step + 1)} nextLabel={step === 0 ? t('Start evaluation') : t('Next')} />
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
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.96px] text-brand-600">{stageLabel} · {t(stage === 'S1' ? 'Planning' : 'Draft')}</p>
              <h2 className="pt-1 text-[1.25rem] font-semibold leading-7 text-ink">{name}</h2>
            </div>
            <GroupCard a={a} group={group} />
            {submission}
          </>
        )}
        {ab && (
          <>
            <GroupCard a={a} group={group} />
            <TickList ability={ab.id} statements={statements[ab.id]} value={form.ticks[ab.id]}
              prompt={t('Tick every statement that is true of {name}’s work for {ability}.', { name: firstName(name), ability: t(ab.label) })}
              onChange={(v) => setForm((f) => ({ ...f, ticks: { ...f.ticks, [ab.id]: v } }))} />
          </>
        )}
        {step > total && (
          <>
            <Field id="fb" label={t('Feedback for the student')} hint={t('They will see this once it is released.')} rows={4}
              value={form.comments} onChange={(v) => setForm((f) => ({ ...f, comments: v }))} placeholder={t('e.g. Good, clear plan and you have chosen a real problem.')}
              error={error && !form.comments.trim() ? t('Write a short comment for the student.') : null} key={`fb${error}`} />
            <Field id="pi" label={t('Pedagogical intervention')} hint={t('Optional. For your record and the HPC — not shown to students.')} rows={3}
              value={form.intervention} onChange={(v) => setForm((f) => ({ ...f, intervention: v }))} placeholder={t('e.g. will sit with this group to model note-taking')} />
            <div className="flex gap-2 rounded-xl border border-[#f1b77f] bg-brand-50 p-3 text-[0.8125rem] leading-[1.1875rem] text-brand-700">
              <Icons.info width="18" height="18" aria-hidden className="mt-0.5 shrink-0" />
              <p><span className="font-bold">{t('Once saved, this evaluation can’t be edited.')}</span> {t('Check your ticks and feedback before you save.')}</p>
            </div>
          </>
        )}
      </div>

      <Sheet open={sheet} onClose={() => setSheet(false)}>
        <div className="flex flex-col gap-3 px-4 pb-6 pt-3">
          <h2 className="text-[1.125rem] font-semibold text-ink">{t('Submission')} · {name}</h2>
          {submission}
          <PrimaryButton onClick={() => setSheet(false)}>{t('Back to evaluation')}</PrimaryButton>
        </div>
      </Sheet>

      <LeaveSheet open={leave} title={t('Leave this evaluation?')} body={t('Your ticks and comments will be lost.')}
        onStay={() => setLeave(false)} onLeave={() => { clearDraft(); setLeave(false); back() }} />
    </Screen>
  )
}
