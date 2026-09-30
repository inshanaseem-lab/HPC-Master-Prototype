import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Screen, Sheet, BottomActions, PrimaryButton, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ABILITIES, OPEN_QUESTIONS } from '../../hpc/config.js'
import { emit, learner, TEACHER } from '../../hpc/store.js'
import { TickList, EvalFooter, LeaveSheet, LockNotice, EventNotice, OpenQuestion, ProvenanceChip, Icons } from '../../hpc/components.jsx'
import { useActivity, nameOf, stageStatus, statementsFor, paramsComplete, learnerIds, STAGES } from './store.js'
import { useClassInfo, useShortDate, PbiAppBar, SectionLabel, Card, Field, SuccessState, useOnlineGuard } from './parts.jsx'
import { SubmissionContent } from './Submission.jsx'

const KEY = { S1: 's1Teacher', S2: 's2Teacher', S3: 's3Teacher' }

function ViewSubmissionLink({ onClick }) {
  const t = useT()
  return (
    <button type="button" onClick={onClick} className="tap flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.9375rem] font-semibold text-brand-700 hover:bg-brand-50">
      {t('View submission')}
    </button>
  )
}

function StudentCard({ id, stage }) {
  const t = useT()
  const s = STAGES.find((x) => x.id === stage)
  return (
    <Card>
      <SectionLabel>{t('Student Details')}</SectionLabel>
      <p className="break-words pt-2 text-[1rem] font-semibold leading-[1.375rem] text-ink">{nameOf(id)}</p>
      <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student ID {id}', { id: learner(id)?.studentId })} · {t(s.label)} · {t(s.name)}</p>
    </Card>
  )
}

function SubmissionSheet({ open, onClose, a, id, stage }) {
  const t = useT()
  return (
    <Sheet open={open} onClose={onClose} className="bg-surface">
      <div className="flex max-h-[80vh] flex-col">
        <div className="flex items-center justify-between gap-2 px-4 pb-2 pt-2">
          <p className="min-w-0 break-words text-[1.125rem] font-semibold text-ink">{t('{name} submission', { name: nameOf(id) })}</p>
          <button type="button" aria-label={t('Close')} onClick={onClose} className="tap grid size-11 shrink-0 place-items-center rounded-full hover:bg-white">✕</button>
        </div>
        <div className="no-scrollbar overflow-y-auto px-4 pb-6"><SubmissionContent a={a} id={id} stage={stage} /></div>
      </div>
    </Sheet>
  )
}

/* ================================================= Assess one learner for one stage (kit T09-06…T09-12) */

export function PbiAssess() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const guard = useOnlineGuard()
  const { stage = 'S1', studentId } = useParams()
  const { classId } = useClassInfo()
  const a = useActivity(classId)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [ticks, setTicks] = useState({ awareness: [], sensitivity: [], creativity: [] })
  const [comments, setComments] = useState('')
  const [intervention, setIntervention] = useState('')
  const [tried, setTried] = useState(false)
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState(false)
  const [peek, setPeek] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!a || !a.learners[studentId]) return <Navigate to={`/pbi/${classId}/progress`} replace />
  const st = stageStatus(a, studentId, stage)
  const stageMeta = STAGES.find((s) => s.id === stage)
  const dirty = Object.values(ticks).some((x) => x.length) || comments.trim() || intervention.trim()
  const back = () => (dirty && !saved ? setLeave(true) : navigate(-1))
  const header = (extra) => (
    <>
      <PbiAppBar title={t('Student Evaluation')} onBack={back} />
      {extra}
    </>
  )

  if (saved) {
    const nextId = learnerIds(a).find((id) => { const s = stageStatus(a, id, stage); return s.submitted && !s.assessed })
    return (
      <Screen bg="plain" statusBar="light" header={<PbiAppBar title={t('Student Evaluation')} onBack={() => navigate(`/pbi/${classId}/progress?stage=${stage}`, { replace: true })} />}
        footer={
          <BottomActions className="flex flex-col gap-3">
            {nextId && <PrimaryButton onClick={() => navigate(`/pbi/${classId}/assess/${stage}/${nextId}`, { replace: true })}>{t('Evaluate next: {name}', { name: nameOf(nextId) })}</PrimaryButton>}
            <button type="button" onClick={() => navigate(`/pbi/${classId}/progress?stage=${stage}`, { replace: true })} className={cx('tap min-h-12 w-full rounded-full text-[0.9375rem] font-semibold', nextId ? 'border border-line bg-white text-ink' : 'bg-brand text-white hover:bg-brand-hover')}>{t('Back to Responses')}</button>
          </BottomActions>
        }>
        <SuccessState title={t('Evaluation Submitted')} body={t('{name}’s {stage} evaluation has been submitted. Saved evaluations can’t be edited.', { name: nameOf(studentId), stage: t(stageMeta.label) })} />
      </Screen>
    )
  }
  if (st.assessed) return <Navigate to={`/pbi/${classId}/evaluated/${stage}/${studentId}`} replace />

  if (!st.submitted) {
    return (
      <Screen bg="plain" statusBar="light" header={header()}>
        <div className="flex flex-col gap-3 p-4">
          <StudentCard id={studentId} stage={stage} />
          <EventNotice tone="info" title={stage === 'S3' ? t('Waiting for the revised draft') : t('Nothing to assess yet')}>
            {stage === 'S3' ? t('{name} revises after peer review and resubmits. You can assess once it arrives.', { name: nameOf(studentId) }) : t('{name} hasn’t submitted {stage} yet.', { name: nameOf(studentId), stage: t(stageMeta.label) })}
          </EventNotice>
        </div>
      </Screen>
    )
  }
  if (!paramsComplete(a.params, stage)) {
    return (
      <Screen bg="plain" statusBar="light" header={header()}>
        <div className="flex flex-col gap-3 p-4">
          <StudentCard id={studentId} stage={stage} />
          <ViewSubmissionLink onClick={() => setPeek(true)} />
          <EventNotice tone="warning" title={t('Choose 2 extra parameters per ability for {stage}', { stage: t(stageMeta.label) })}>
            {t('You tick the fixed statements and your extra parameters together, so choose them first.')}
          </EventNotice>
          <PrimaryButton onClick={() => navigate(`/pbi/${classId}/params/${stage}`)}>{t('Choose parameters')}</PrimaryButton>
        </div>
      </Screen>
    )
  }

  const ability = ABILITIES[step]
  const isFeedback = step === ABILITIES.length
  const { list, extraStart } = ability ? statementsFor(a, stage, ability.id) : { list: [] }
  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n) }

  const save = () => {
    if (!comments.trim()) { setTried(true); return }
    if (!guard()) return
    setLoading(true)
    setTimeout(() => {
      emit(a.id, `C.${stage}.teacher_evaluated`, (x) => {
        x.learners[studentId][KEY[stage]] = { ticks, comments: comments.trim(), intervention: intervention.trim(), savedAt: new Date().toISOString() }
      }, { by: TEACHER, target: studentId })
      showToast(t('Evaluation saved for {name}', { name: nameOf(studentId) }))
      setLoading(false)
      setSaved(true)
    }, 600)
  }

  const progress = (
    <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
      <p className="shrink-0 text-[0.875rem] leading-5 text-ink">{isFeedback ? t('Feedback') : t('Question {n} of {total}', { n: step + 1, total: ABILITIES.length })}</p>
      <div className="h-2 min-w-[min(6rem,100%)] flex-1 overflow-hidden rounded-full bg-[#ffd5b0]">
        <div className="h-full rounded-full bg-brand-bright transition-[width] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ width: `${(Math.min(step + 1, ABILITIES.length) / ABILITIES.length) * 100}%` }} />
      </div>
    </div>
  )

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={header(progress)}
      footer={
        isFeedback ? (
          <div className="flex shrink-0 flex-wrap gap-3 px-4 pb-6 pt-3">
            <button type="button" onClick={() => go(step - 1)} className="tap min-h-12 min-w-[min(8rem,100%)] flex-1 px-4 rounded-full border border-line bg-white text-[1rem] font-semibold text-ink hover:bg-surface">{t('Previous')}</button>
            <PrimaryButton className="min-w-[min(8rem,100%)] flex-1 text-[1rem] font-semibold" loading={loading} onClick={save}>{t('Save evaluation')}</PrimaryButton>
          </div>
        ) : (
          <EvalFooter prevDisabled={step === 0} onPrev={() => go(step - 1)} onNext={() => go(step + 1)} nextLabel={step === ABILITIES.length - 1 ? t('Add feedback') : t('Next')} />
        )
      }
    >
      <div className="flex flex-col gap-4 px-4 pb-6 pt-1">
        {step === 0 && <StudentCard id={studentId} stage={stage} />}
        <ViewSubmissionLink onClick={() => setPeek(true)} />
        <div key={step} className={cx('flex flex-col gap-4', dir > 0 ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
          {!isFeedback ? (
            <>
              <TickList
                ability={ability.id}
                statements={list}
                extraStart={extraStart}
                value={ticks[ability.id]}
                onChange={(v) => setTicks({ ...ticks, [ability.id]: v })}
                prompt={t('Tick every statement that is true of this student’s work for {criterion}.', { criterion: t(ability.label) })}
              />
              {stage === 'S3' && ability.id === 'awareness' && (
                <div className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-ink-muted">
                  <OpenQuestion code="OQ-SEC-11" text={OPEN_QUESTIONS['OQ-SEC-11']} /> {t('{n} fixed + 2 extra = {total} statements', { n: extraStart, total: list.length })}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <p className="text-[1.25rem] font-semibold leading-7 text-ink">{t('Feedback for the student')}</p>
                <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('They will see this once it is released.')}</p>
              </div>
              <Field value={comments} onChange={(v) => { setComments(v); setTried(false) }} max={600} rows={4} placeholder={t('e.g. Good, clear plan and you have chosen a real problem.')} invalid={tried && !comments.trim()} error={t('Add a short note for {name}.', { name: nameOf(studentId).split(' ')[0] })} />
              <div className="flex flex-col gap-1">
                <p className="text-[1.25rem] font-semibold leading-7 text-ink">{t('Pedagogical intervention')}</p>
                <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Optional. For your record and the HPC — not shown to students.')}</p>
              </div>
              <Field value={intervention} onChange={setIntervention} max={400} rows={3} placeholder={t('e.g. will sit with this learner to model how to word questions')} />
              <div className="flex items-start gap-3 rounded-2xl border border-[#f1b98a] bg-brand-50 px-4 py-3 text-[0.875rem] leading-5 text-brand-700">
                <Icons.info className="mt-0.5 shrink-0" />
                <p><span className="font-semibold">{t('Once saved, this evaluation can’t be edited.')}</span> {t('Check your ticks and feedback before you save.')}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <SubmissionSheet open={peek} onClose={() => setPeek(false)} a={a} id={studentId} stage={stage} />
      <LeaveSheet open={leave} title={t('Leave this evaluation?')} body={t('Your ticks and feedback for {name} will be lost.', { name: nameOf(studentId) })} onStay={() => setLeave(false)} onLeave={() => { setLeave(false); navigate(-1) }} />
    </Screen>
  )
}

/* ================================================= Evaluated · read-only (kit T09-13) */

export function PbiEvaluated() {
  const navigate = useNavigate()
  const t = useT()
  const short = useShortDate()
  const { stage = 'S1', studentId } = useParams()
  const { classId } = useClassInfo()
  const a = useActivity(classId)
  const [peek, setPeek] = useState(false)
  if (!a || !a.learners[studentId]) return <Navigate to={`/pbi/${classId}/progress`} replace />
  const ev = a.learners[studentId][KEY[stage]]
  if (!ev) return <Navigate to={`/pbi/${classId}/assess/${stage}/${studentId}`} replace />
  return (
    <Screen bg="plain" statusBar="light" header={<PbiAppBar title={t('Student Evaluation')} />}
      footer={<BottomActions><PrimaryButton onClick={() => navigate(`/pbi/${classId}/progress?stage=${stage}`)}>{t('Back to Responses')}</PrimaryButton></BottomActions>}>
      <div className="stagger flex flex-col gap-4 p-4">
        <StudentCard id={studentId} stage={stage} />
        <ViewSubmissionLink onClick={() => setPeek(true)} />
        <LockNotice>{t('Evaluated on {date}. Saved evaluations can’t be edited.', { date: short(ev.savedAt) })}</LockNotice>
        {ABILITIES.map((ab) => {
          const { list, extraStart } = statementsFor(a, stage, ab.id)
          return <TickList key={ab.id} readOnly ability={ab.id} statements={list} extraStart={extraStart} value={ev.ticks?.[ab.id] ?? []} />
        })}
        <Card className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2"><SectionLabel>{t('Feedback for the student')}</SectionLabel><ProvenanceChip kind="teacher" /></div>
          <p className="text-[0.9375rem] leading-[1.375rem] text-ink">{ev.comments || '—'}</p>
          <SectionLabel className="pt-2">{t('Pedagogical intervention')}</SectionLabel>
          <p className="text-[0.9375rem] leading-[1.375rem] text-ink">{ev.intervention || t('None recorded')}</p>
        </Card>
      </div>
      <SubmissionSheet open={peek} onClose={() => setPeek(false)} a={a} id={studentId} stage={stage} />
    </Screen>
  )
}
