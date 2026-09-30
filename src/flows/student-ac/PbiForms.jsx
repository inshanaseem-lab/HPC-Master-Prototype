import { useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { OutlineButton, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { useAppStore } from '../../store/AppStore.jsx'
import { ABILITIES, OPEN_QUESTIONS, PBI } from '../../hpc/config.js'
import { emit } from '../../hpc/store.js'
import { CalendarSheet, EventNotice, LeaveSheet, LockNotice, OpenQuestion, ProvenanceChip, TickList, formatShort } from '../../hpc/components.jsx'
import { ME, clearDraft, getDraft, nameOf, progressOf, setDraft } from './pbiModel.js'
import { AnswerList, Block, ConfirmBox, Field, FilePicker, StepProgress, SubmitSheets, useSubmitter } from './pbiParts.jsx'
import { FilesView, InstrumentView, RosterView, useMultiPbi } from './PbiStages.jsx'
import { Alert, AppBar, Footer, OptionCard, PrevNext, SectionLabel, TrashIcon, useGoBack } from './parts.jsx'

const nowIso = () => new Date().toISOString()
const filled = (s) => typeof s === 'string' && s.trim() !== ''
const MIN = PBI.instrument.minResponses
const MAXQ = PBI.instrument.maxQuestions
const MAXMIN = PBI.instrument.interviewMinutes
const MODES = ['In person', 'Phone', 'Online', 'Written']

/** Guard: the task must be open for this learner when the screen is first opened. */
function useTaskGuard(task) {
  const ctx = useMultiPbi()
  const [allowed] = useState(() => !!ctx.a && progressOf(ctx.a).tasks.includes(task))
  return { ...ctx, allowed }
}

/** Leave handling (kit S02-04): only asks when something changed since the last save. */
function useLeave(id, dirty) {
  const goBack = useGoBack()
  const [open, setOpen] = useState(false)
  const leave = () => (dirty ? setOpen(true) : goBack(`/s/pbi/${id}`))
  return { open, setOpen, leave, go: () => { setOpen(false); goBack(`/s/pbi/${id}`) } }
}

function Leave({ l, title }) {
  const t = useT()
  return (
    <LeaveSheet open={l.open} title={title} body={t('Changes since your last saved draft will be lost.')} onStay={() => l.setOpen(false)} onLeave={l.go} />
  )
}

function Heading({ title, sub }) {
  return (
    <div className="animate-fade-up">
      <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{title}</h1>
      {sub && <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{sub}</p>}
    </div>
  )
}

/* ================================================= S1 · Draft plan (Page 2) */

export function PbiPlan() {
  const t = useT()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { showToast } = useAppStore()
  const { id, a, l, allowed } = useTaskGuard('plan')
  const saved = getDraft(id, 'plan')
  const [form, setForm] = useState(() => saved ?? { hypothesis: '', answers: {} })
  const [snap, setSnap] = useState(() => JSON.stringify(saved ?? { hypothesis: '', answers: {} }))
  const [tried, setTried] = useState(false)
  const [shake, setShake] = useState(0)
  const leave = useLeave(id, JSON.stringify(form) !== snap)
  if (!a || !allowed) return <Navigate to={`/s/pbi/${id}`} replace />

  const ownHyp = !filled(a.setup?.hypothesis)
  const errs = {}
  if (ownHyp && !filled(form.hypothesis)) errs.hypothesis = t('Write your hypothesis. Research does not start from a blank slate.')
  PBI.draftPlan.forEach((f) => { if (!filled(form.answers[f])) errs[f] = t('This part of the plan is required.') })
  const nErr = Object.keys(errs).length
  const set = (f, v) => setForm((x) => ({ ...x, answers: { ...x.answers, [f]: v } }))
  const save = () => { setDraft(id, 'plan', form); setSnap(JSON.stringify(form)) }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<><AppBar title={t('Stage 1 · Draft plan')} right={t('{n} of {total}', { n: 1, total: 2 })} onBack={leave.leave} /><StepProgress value={0.5} /></>}
      footer={
        <Footer>
          {tried && nErr > 0 && <p key={shake} className="animate-shake text-center text-[0.75rem] leading-4 text-danger">{t('{n} parts still need an answer.', { n: nErr })}</p>}
          <>
            <PrimaryButton onClick={() => {
              setTried(true)
              if (nErr) { setShake((s) => s + 1); return }
              save()
              navigate(`/s/pbi/${id}/plan/check${search}`)
            }}>{t('Continue')}</PrimaryButton>
            <OutlineButton onClick={() => { save(); showToast(t('Draft saved')) }} className="text-[0.9375rem]">{t('Save Draft')}</OutlineButton>
          </>
        </Footer>
      }
    >
      <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
        <Heading title={t('Your draft plan')} sub={t('Research does not start from a blank slate. Write what you already know, what you need to find out, and how you will do it.')} />
        <Block label={t('Your topic')} right={<ProvenanceChip kind="teacher">{t('Set by teacher')}</ProvenanceChip>}>
          <p className="text-[1rem] font-semibold leading-6 text-ink">{t(l.topic ?? a.title)}</p>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-2">{t(a.setup?.prompt ?? '')}</p>
        </Block>
        {ownHyp ? (
          <Field
            label={t('My hypothesis')}
            hint={t('Your teacher hasn’t given one. Propose your own — a statement your research will support or negate.')}
            placeholder={t('For example: More people would take the bus if the timetable was shown at every stop.')}
            value={form.hypothesis}
            onChange={(v) => setForm((x) => ({ ...x, hypothesis: v }))}
            error={tried && errs.hypothesis}
            shake={shake}
          />
        ) : (
          <Block label={t('Hypothesis')} right={<ProvenanceChip kind="teacher" />}>
            <p className="text-[0.9375rem] leading-[1.375rem] text-ink">{t(a.setup.hypothesis)}</p>
          </Block>
        )}
        {PBI.draftPlan.map((f, i) => (
          <Field key={f} label={`${i + 1}. ${t(f)}`} value={form.answers[f] ?? ''} onChange={(v) => set(f, v)} error={tried && errs[f]} shake={shake} />
        ))}
      </div>
      <Leave l={leave} title={t('Leave your draft plan?')} />
    </Screen>
  )
}

export function PbiPlanCheck() {
  const t = useT()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { id, a, allowed } = useTaskGuard('plan')
  const s = useSubmitter()
  const [agree, setAgree] = useState(false)
  const [tried, setTried] = useState(false)
  const form = getDraft(id, 'plan')
  if (!a || !allowed) return <Navigate to={`/s/pbi/${id}`} replace />
  if (!form) return <Navigate to={`/s/pbi/${id}/plan${search}`} replace />
  const ownHyp = !filled(a.setup?.hypothesis)

  const submit = () => {
    setTried(true)
    if (!agree) return
    s.run(`pbi-s1:${id}`, () => {
      emit(id, 'C.S1.submitted', (x) => {
        const me = x.learners[ME]
        me.plan = { answers: form.answers, submittedAt: nowIso() }
        if (ownHyp) me.hypothesis = form.hypothesis.trim()
      }, { by: ME, target: ME })
      clearDraft(id, 'plan')
    }, () => navigate(`/s/pbi/${id}/sent/s1`, { replace: true }))
  }

  return (
    <Screen bg="plain" statusBar="light"
      header={<><AppBar title={t('Stage 1 · Draft plan')} right={t('{n} of {total}', { n: 2, total: 2 })} /><StepProgress value={1} /></>}
      footer={<Footer><PrimaryButton onClick={submit} loading={s.loading}>{t('Confirm and Submit')}</PrimaryButton></Footer>}
    >
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <Heading title={t('Check before submitting')} sub={t('You can’t edit your plan after you submit. Your teacher will assess it.')} />
        <Block label={t('Draft plan')} right={<ProvenanceChip kind="student" />}>
          <AnswerList rows={[...(ownHyp ? [['My hypothesis', form.hypothesis]] : []), ...PBI.draftPlan.map((f) => [f, form.answers[f]])]} />
        </Block>
        <ConfirmBox checked={agree} onChange={setAgree} error={tried && !agree}>{t('I confirm this is my own work.')}</ConfirmBox>
      </div>
      <SubmitSheets s={s} what={t('Stage 1 · Draft plan')} onDeadline={() => navigate('/s/activities', { replace: true })} />
    </Screen>
  )
}

/* ================================================= Self-reflection S1 (Page 4) / S2 */

export function PbiSelfReflect() {
  const t = useT()
  const navigate = useNavigate()
  const { stage } = useParams()
  const task = stage === 'S2' ? 's2self' : 's1self'
  const { id, a, allowed } = useTaskGuard(task)
  const s = useSubmitter()
  const statements = PBI.self[stage === 'S2' ? 'S2' : 'S1']
  const extras = stage === 'S2' ? PBI.s2SelfExtra : PBI.s1SelfExtra
  const init = getDraft(id, task) ?? { ticks: { awareness: [], sensitivity: [], creativity: [] }, text: {} }
  const [form, setForm] = useState(init)
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState('right')
  const [tried, setTried] = useState(false)
  const [shake, setShake] = useState(0)
  const [touched, setTouched] = useState(false)
  const leave = useLeave(id, touched)
  if (!a || !allowed || !['S1', 'S2'].includes(stage)) return <Navigate to={`/s/pbi/${id}`} replace />

  const total = ABILITIES.length + 1
  const last = idx === total - 1
  const ab = ABILITIES[idx]
  const upd = (fn) => { setTouched(true); setForm(fn) }
  const missing = extras.filter((q) => !filled(form.text[q]))
  const go = (to) => { setDir(to > idx ? 'right' : 'left'); setIdx(to) }
  const title = stage === 'S2' ? t('Stage 2 · Self-reflection') : t('Stage 1 · Self-reflection')

  const submit = () => {
    setTried(true)
    if (missing.length) { setShake((x) => x + 1); return }
    s.run(`pbi-${task}:${id}`, () => {
      const event = stage === 'S2' ? 'C.S2.self_done' : 'C.S1.self_done'
      emit(id, event, (x) => {
        const me = x.learners[ME]
        if (stage === 'S2') me.s2Self = { ticks: form.ticks, appreciation: form.text[extras[0]].trim(), savedAt: nowIso() }
        else me.s1Self = { ticks: form.ticks, problems: form.text[extras[0]].trim(), help: form.text[extras[1]].trim(), savedAt: nowIso() }
      }, { by: ME, target: ME })
      clearDraft(id, task)
    }, () => navigate(`/s/pbi/${id}/sent/${task}`, { replace: true }), () => setDraft(id, task, form))
  }

  return (
    <Screen bg="plain" statusBar="light"
      header={<><AppBar close title={title} right={t('Part {n} of {total}', { n: idx + 1, total })} onBack={leave.leave} /><StepProgress value={(idx + 1) / total} /></>}
      footer={<PrevNext onPrev={() => go(idx - 1)} prevDisabled={idx === 0} onNext={last ? submit : () => go(idx + 1)} nextLabel={last ? t('Submit') : t('Next')} loading={s.loading} />}
    >
      <div key={idx} className={cx('flex flex-col gap-5 px-4 pb-8 pt-4', dir === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
        {idx === 0 && (
          <>
            <EventNotice title={stage === 'S2' ? t('Your teacher has assessed Stage 2') : t('Your teacher has assessed your Stage 1 plan')}>
              {t('Now look back at your own work. Tick every statement that is true for you — there are no wrong answers.')}
            </EventNotice>
            {stage === 'S2' && (
              <div className="flex items-center gap-2 text-[0.75rem] leading-[1.125rem] text-ink-muted">
                <OpenQuestion code="OQ-SEC-3" text={OPEN_QUESTIONS['OQ-SEC-3']} />
                <span>{t('Self-reflection stages follow the handbook exemplar.')}</span>
              </div>
            )}
          </>
        )}
        {ab ? (
          <TickList
            ability={ab.id}
            statements={statements[ab.id]}
            value={form.ticks[ab.id]}
            onChange={(v) => upd((f) => ({ ...f, ticks: { ...f.ticks, [ab.id]: v } }))}
          />
        ) : (
          <>
            <Heading title={stage === 'S2' ? t('A few words for yourself') : t('Problems and help')} />
            {extras.map((q) => (
              <Field key={q} label={t(q)} value={form.text[q] ?? ''} rows={4}
                onChange={(v) => upd((f) => ({ ...f, text: { ...f.text, [q]: v } }))}
                error={tried && !filled(form.text[q]) && t('Write a few words to continue.')} shake={shake} />
            ))}
            <LockNotice>{t('You can’t change your reflection after you submit.')}</LockNotice>
          </>
        )}
      </div>
      <Leave l={leave} title={t('Leave this self-reflection?')} />
      <SubmitSheets s={s} what={title} onDeadline={() => navigate('/s/activities', { replace: true })} />
    </Screen>
  )
}

/* ================================================= S2 · Instrument, responses, summary */

const S2_STEPS = 4
const emptyS2 = () => ({
  kind: '', items: [''], script: '', minutes: '5', targetGroup: '', justification: '',
  roster: [{ name: '', role: '', date: '', mode: '' }], documented: false, summary: {}, files: [],
})
const rowDone = (r) => filled(r.name) && filled(r.role) && !!r.date && !!r.mode
const rowEmpty = (r) => !filled(r.name) && !filled(r.role) && !r.date && !r.mode

function s2Errors(t, f, step) {
  const e = {}
  if (step === 1) {
    if (!f.kind) e.kind = t('Choose a questionnaire or an interview.')
    const qs = f.items.filter(filled)
    if (f.kind === 'questionnaire' && qs.length === 0) e.items = t('Add at least one question.')
    if (f.kind === 'questionnaire' && f.items.length > MAXQ) e.items = t('A questionnaire can have at most {n} questions.', { n: MAXQ })
    if (f.kind === 'interview') {
      if (!filled(f.script)) e.script = t('Write your interview script.')
      const m = Number(f.minutes)
      if (!m || m < 1) e.minutes = t('Enter the minutes for each interview.')
      else if (m > MAXMIN) e.minutes = t('Keep each interview to {n} minutes or less.', { n: MAXMIN })
    }
    if (!filled(f.targetGroup)) e.targetGroup = t('Say who you will ask.')
    if (!filled(f.justification)) e.justification = t('Explain why this group fits your problem.')
  }
  if (step === 2) {
    const done = f.roster.filter(rowDone).length
    if (f.roster.some((r) => !rowDone(r) && !rowEmpty(r))) e.rows = t('Complete or remove the unfinished rows.')
    if (done < MIN) e.count = t('You need at least {min} documented responses. You have {n}.', { min: MIN, n: done })
    if (!f.documented) e.documented = t('Confirm that every participant is documented.')
  }
  if (step === 3) PBI.summary.forEach((k) => { if (!filled(f.summary[k])) e[k] = t('This part of the summary is required.') })
  return e
}

export function PbiS2() {
  const t = useT()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { showToast } = useAppStore()
  const step = Math.min(3, Math.max(1, Number(useParams().step) || 1))
  const { id, a, allowed } = useTaskGuard('s2')
  const saved = getDraft(id, 's2')
  const [f, setF] = useState(() => ({ ...emptyS2(), ...(saved ?? {}) }))
  const [snap, setSnap] = useState(() => JSON.stringify({ ...emptyS2(), ...(saved ?? {}) }))
  const [tried, setTried] = useState(false)
  const [shake, setShake] = useState(0)
  const [busy, setBusy] = useState(false)
  const [qErr, setQErr] = useState(null)
  const [cal, setCal] = useState(null)
  const leave = useLeave(id, JSON.stringify(f) !== snap)
  if (!a || !allowed) return <Navigate to={`/s/pbi/${id}`} replace />

  const errs = s2Errors(t, f, step)
  const bad = Object.keys(errs).length > 0
  const save = () => { setDraft(id, 's2', f); setSnap(JSON.stringify(f)) }
  const up = (patch) => setF((x) => ({ ...x, ...patch }))
  const to = (n) => navigate(n > 3 ? `/s/pbi/${id}/s2/check${search}` : `/s/pbi/${id}/s2/${n}${search}`, { replace: true })
  const next = () => {
    setTried(true)
    if (bad || busy) { setShake((s) => s + 1); return }
    save()
    to(step + 1)
  }
  const back = () => (step === 1 ? leave.leave() : (save(), to(step - 1)))
  const titles = { 1: t('Your research instrument'), 2: t('Who did you ask?'), 3: t('Your draft summary') }
  const doneRows = f.roster.filter(rowDone).length

  const setItem = (i, v) => up({ items: f.items.map((x, j) => (j === i ? v : x)) })
  const move = (i, d) => {
    const j = i + d
    if (j < 0 || j >= f.items.length) return
    const items = [...f.items]
    ;[items[i], items[j]] = [items[j], items[i]]
    up({ items })
  }
  const addQ = () => {
    if (f.items.length >= MAXQ) { setQErr(t('A questionnaire can have at most {n} questions.', { n: MAXQ })); setShake((s) => s + 1); return }
    setQErr(null)
    up({ items: [...f.items, ''] })
  }
  const setRow = (i, patch) => up({ roster: f.roster.map((r, j) => (j === i ? { ...r, ...patch } : r)) })
  const demoFill = () => {
    const names = ['Kamla Devi', 'Ramesh Thakur', 'Sunita Negi', 'Vikram Rana', 'Asha Sharma', 'Mohan Lal', 'Geeta Kumari', 'Rajesh Chauhan', 'Suman Verma', 'Anil Kanwar']
    up({ roster: names.map((n, i) => ({ name: n, role: ['Parent', 'Shopkeeper', 'Teacher', 'Commuter', 'Driver'][i % 5], date: `2026-09-${String(10 + (i % 5)).padStart(2, '0')}`, mode: MODES[i % 3] })) })
  }

  return (
    <Screen bg="plain" statusBar="light"
      header={<><AppBar title={t('Stage 2 · Data and draft summary')} right={t('{n} of {total}', { n: step, total: S2_STEPS })} onBack={back} /><StepProgress value={step / S2_STEPS} /></>}
      footer={
        <Footer>
          {tried && bad && <p key={shake} className="animate-shake text-center text-[0.75rem] leading-4 text-danger">{t('Fix the highlighted parts to continue.')}</p>}
          <>
            <PrimaryButton onClick={next}>{t('Continue')}</PrimaryButton>
            <OutlineButton onClick={() => { save(); showToast(t('Draft saved')) }} className={cx('text-[0.9375rem]', busy && 'pointer-events-none opacity-50')}>{t('Save Draft')}</OutlineButton>
          </>
        </Footer>
      }
    >
      <div key={step} className="flex flex-col gap-5 px-4 pb-8 pt-4 animate-slide-in-right">
        <Heading title={titles[step]} sub={{
          1: t('Choose how you will collect evidence to support or negate your hypothesis.'),
          2: t('Document every person you collected a response from. You need at least {n}.', { n: MIN }),
          3: t('Use your data to write what you found and what you propose.'),
        }[step]} />

        {step === 1 && (
          <>
            <div role="radiogroup" aria-label={t('Instrument type')} className="flex flex-col gap-3">
              <OptionCard title={t('Questionnaire')} desc={t('Up to {n} questions that people answer.', { n: MAXQ })} selected={f.kind === 'questionnaire'} onClick={() => up({ kind: 'questionnaire' })} />
              <OptionCard title={t('Interview')} desc={t('A script you follow · {n} minutes or less per interviewee.', { n: MAXMIN })} selected={f.kind === 'interview'} onClick={() => up({ kind: 'interview' })} />
              {tried && errs.kind && <p role="alert" className="text-[0.75rem] leading-4 text-danger">{errs.kind}</p>}
            </div>

            {f.kind === 'questionnaire' && (
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <SectionLabel>{t('Questions')}</SectionLabel>
                  <span aria-live="polite" className={cx('rounded-full px-2.5 text-[0.75rem] font-semibold leading-6', f.items.length >= MAXQ ? 'bg-[#fff1dc] text-[#8a5200]' : 'bg-white text-ink-2 shadow-[inset_0_0_0_1px_#e4e1dd]')}>
                    {t('{n} of {max} questions', { n: f.items.length, max: MAXQ })}
                  </span>
                </div>
                {f.items.map((q, i) => (
                  <div key={i} className="animate-fade-up flex flex-wrap items-center gap-x-1 gap-y-0.5 rounded-xl border border-line bg-white py-1 pl-3 pr-1">
                    <span className="w-5 shrink-0 text-[0.8125rem] font-semibold text-ink-muted">{i + 1}</span>
                    <input value={q} onChange={(e) => setItem(i, e.target.value.slice(0, 200))} placeholder={t('Type a question')} aria-label={t('Question {n}', { n: i + 1 })}
                      className="min-h-11 min-w-[min(8rem,100%)] flex-1 bg-transparent text-[0.875rem] text-ink outline-none placeholder:text-[#8a8790]" />
                    <IconBtn label={t('Move up')} disabled={i === 0} onClick={() => move(i, -1)}>↑</IconBtn>
                    <IconBtn label={t('Move down')} disabled={i === f.items.length - 1} onClick={() => move(i, 1)}>↓</IconBtn>
                    <IconBtn label={t('Remove question {n}', { n: i + 1 })} disabled={f.items.length === 1} onClick={() => { setQErr(null); up({ items: f.items.filter((_, j) => j !== i) }) }}><TrashIcon size={16} /></IconBtn>
                  </div>
                ))}
                <button type="button" onClick={addQ} className="tap min-h-11 rounded-full border border-dashed border-brand-700 text-[0.875rem] font-medium text-brand-700 hover:bg-brand-50">+ {t('Add question')}</button>
                {(qErr || (tried && errs.items)) && <p key={shake} role="alert" className="animate-shake text-[0.75rem] leading-4 text-danger">{qErr ?? errs.items}</p>}
              </div>
            )}

            {f.kind === 'interview' && (
              <>
                <Field label={t('Interview script')} hint={t('How you will introduce yourself, the questions you will ask, and how you will close.')} rows={6}
                  value={f.script} onChange={(v) => up({ script: v })} error={tried && errs.script} shake={shake} max={3000} />
                <Field label={t('Minutes per interviewee')} hint={t('The guide is {n} minutes or less per person.', { n: MAXMIN })} error={(tried || Number(f.minutes) > MAXMIN) && errs.minutes} shake={shake}>
                  <input type="number" inputMode="numeric" min={1} max={MAXMIN} value={f.minutes} onChange={(e) => up({ minutes: e.target.value.slice(0, 2) })}
                    className={cx('min-h-[50px] w-[7rem] max-w-full rounded-lg border bg-white px-[15px] text-[0.875rem] text-ink outline-none focus:border-brand', errs.minutes && (tried || Number(f.minutes) > MAXMIN) ? 'border-danger' : 'border-line')} />
                </Field>
              </>
            )}

            <Field input label={t('Target group')} placeholder={t('For example: parents of students in my school')} value={f.targetGroup} onChange={(v) => up({ targetGroup: v })} error={tried && errs.targetGroup} shake={shake} max={200} />
            <Field label={t('Why this group?')} value={f.justification} onChange={(v) => up({ justification: v })} error={tried && errs.justification} shake={shake} />
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-3 shadow-[inset_0_0_0_1px_#e4e1dd]">
              <span className="text-[0.875rem] font-medium text-ink">{t('Documented responses')}</span>
              <span aria-live="polite" className={cx('rounded-full px-2.5 text-[0.8125rem] font-bold leading-6 transition-colors', doneRows >= MIN ? 'bg-[#e6f2ea] text-[#1b6b34]' : 'bg-danger-50 text-danger')}>
                {t('{n} of {min} minimum', { n: doneRows, min: MIN })}
              </span>
            </div>
            {f.roster.map((r, i) => (
              <div key={i} className={cx('animate-fade-up flex flex-col gap-2.5 rounded-2xl border bg-white p-3.5', tried && !rowDone(r) && !rowEmpty(r) ? 'border-danger' : 'border-line')}>
                <div className="-my-1 flex items-center justify-between gap-2">
                  <span className="text-[0.75rem] font-bold uppercase tracking-[0.96px] text-ink-muted">{t('Participant {n}', { n: i + 1 })}</span>
                  <IconBtn label={t('Remove participant {n}', { n: i + 1 })} disabled={f.roster.length === 1} onClick={() => up({ roster: f.roster.filter((_, j) => j !== i) })}><TrashIcon size={16} /></IconBtn>
                </div>
                <input value={r.name} onChange={(e) => setRow(i, { name: e.target.value.slice(0, 80) })} placeholder={t('Name')} aria-label={t('Name')} className="min-h-11 rounded-lg border border-line px-3 text-[0.875rem] outline-none focus:border-brand" />
                <input value={r.role} onChange={(e) => setRow(i, { role: e.target.value.slice(0, 80) })} placeholder={t('Role (e.g. parent, shopkeeper)')} aria-label={t('Role')} className="min-h-11 rounded-lg border border-line px-3 text-[0.875rem] outline-none focus:border-brand" />
                <button type="button" onClick={() => setCal(i)} className="tap-soft flex min-h-11 items-center justify-between gap-2 rounded-lg border border-line px-3 py-2 text-left text-[0.875rem]">
                  <span className={r.date ? 'text-ink' : 'text-[#8a8790]'}>{r.date ? formatShort(r.date) : t('Date of response')}</span>
                  <span aria-hidden className="text-ink-muted">📅</span>
                </button>
                <div role="radiogroup" aria-label={t('Mode')} className="flex flex-wrap gap-2">
                  {MODES.map((m) => (
                    <button key={m} type="button" role="radio" aria-checked={r.mode === m} onClick={() => setRow(i, { mode: m })}
                      className={cx('tap min-h-11 rounded-full border px-3 text-[0.8125rem] font-medium transition-colors', r.mode === m ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-2 hover:bg-cream')}>
                      {t(m)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button type="button" onClick={() => up({ roster: [...f.roster, { name: '', role: '', date: '', mode: '' }] })} className="tap min-h-11 rounded-full border border-dashed border-brand-700 text-[0.875rem] font-medium text-brand-700 hover:bg-brand-50">+ {t('Add participant')}</button>
            {new URLSearchParams(search).get('demo') === '1' && <button type="button" onClick={demoFill} className="self-start text-[0.75rem] text-ink-muted underline">{t('Demo · fill 10 sample rows')}</button>}
            {tried && (errs.count || errs.rows) && <Alert key={shake} className="animate-shake">{errs.rows ?? errs.count}</Alert>}
            <ConfirmBox checked={f.documented} onChange={(v) => up({ documented: v })} error={tried && !!errs.documented}>
              {t('I have documented every participant listed here, and I will keep their answers private.')}
            </ConfirmBox>
            <CalendarSheet open={cal != null} title={t('Date of response')} value={cal != null ? f.roster[cal]?.date : ''} min="2026-08-01"
              onClose={() => setCal(null)} onSet={(v) => { setRow(cal, { date: v }); setCal(null) }} />
          </>
        )}

        {step === 3 && (
          <>
            {PBI.summary.map((k) => (
              <Field key={k} label={t(k)} value={f.summary[k] ?? ''} rows={4} onChange={(v) => up({ summary: { ...f.summary, [k]: v } })} error={tried && errs[k]} shake={shake} />
            ))}
            <div className="flex flex-col gap-1.5">
              <span className="text-[0.8125rem] font-medium leading-[1.1875rem] text-ink">{t('Files')} <span className="font-normal text-ink-muted">· {t('optional')}</span></span>
              <span className="-mt-1 text-[0.75rem] leading-[1.125rem] text-ink-muted">{t('Photos, PDF, DOC or PPT. Up to 5 files, 10 MB each.')}</span>
              <FilePicker value={f.files} failKey={`pbi-s2:${id}`} onBusy={setBusy} onChange={(files) => setF((x) => (JSON.stringify(x.files) === JSON.stringify(files) ? x : { ...x, files }))} />
            </div>
          </>
        )}
      </div>
      <Leave l={leave} title={t('Leave Stage 2?')} />
    </Screen>
  )
}

function IconBtn({ label, disabled, onClick, children }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick}
      className="tap grid size-11 shrink-0 place-items-center rounded-lg text-[0.9375rem] text-ink-muted hover:bg-black/5 hover:text-ink disabled:opacity-30">
      {children}
    </button>
  )
}

export function PbiS2Check() {
  const t = useT()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { id, a, allowed } = useTaskGuard('s2')
  const s = useSubmitter()
  const [agree, setAgree] = useState(false)
  const [tried, setTried] = useState(false)
  const f = getDraft(id, 's2')
  if (!a || !allowed) return <Navigate to={`/s/pbi/${id}`} replace />
  const complete = f && [1, 2, 3].every((n) => Object.keys(s2Errors(t, { ...emptyS2(), ...f }, n)).length === 0)
  if (!complete) return <Navigate to={`/s/pbi/${id}/s2/1${search}`} replace />

  const ins = f.kind === 'interview'
    ? { kind: 'interview', items: f.script.split('\n').map((x) => x.trim()).filter(Boolean), script: f.script.trim(), minutes: Number(f.minutes), targetGroup: f.targetGroup.trim(), justification: f.justification.trim() }
    : { kind: 'questionnaire', items: f.items.map((x) => x.trim()).filter(Boolean), targetGroup: f.targetGroup.trim(), justification: f.justification.trim() }
  const roster = f.roster.filter(rowDone).map((r) => ({ name: r.name.trim(), role: r.role.trim(), date: r.date, mode: r.mode }))

  const submit = () => {
    setTried(true)
    if (!agree) return
    s.run(`pbi-s2:${id}`, () => {
      emit(id, 'C.S2.submitted', (x) => {
        const me = x.learners[ME]
        me.instrument = ins
        me.roster = roster
        me.summary = { answers: f.summary, files: f.files ?? [], submittedAt: nowIso() }
      }, { by: ME, target: ME })
      clearDraft(id, 's2')
    }, () => navigate(`/s/pbi/${id}/sent/s2`, { replace: true }))
  }

  return (
    <Screen bg="plain" statusBar="light"
      header={<><AppBar title={t('Stage 2 · Data and draft summary')} right={t('{n} of {total}', { n: 4, total: S2_STEPS })} onBack={() => navigate(`/s/pbi/${id}/s2/3${search}`, { replace: true })} /><StepProgress value={1} /></>}
      footer={<Footer><PrimaryButton onClick={submit} loading={s.loading}>{t('Confirm and Submit')}</PrimaryButton></Footer>}
    >
      <div className="stagger flex flex-col gap-4 px-4 pb-8 pt-4">
        <Heading title={t('Check before submitting')} sub={t('You can’t edit Stage 2 after you submit. Your teacher will assess it.')} />
        <Block label={ins.kind === 'interview' ? t('Interview') : t('Questionnaire')} right={<ProvenanceChip kind="student" />}><InstrumentView ins={ins} /></Block>
        <Block label={t('{n} participants documented', { n: roster.length })} right={<ProvenanceChip kind="student" />}><RosterView roster={roster} /></Block>
        <Block label={t('Draft summary')} right={<ProvenanceChip kind="student" />}>
          <AnswerList rows={PBI.summary.map((k) => [k, f.summary[k]])} />
          <FilesView files={f.files} />
        </Block>
        <ConfirmBox checked={agree} onChange={setAgree} error={tried && !agree}>{t('I confirm this is my own work.')}</ConfirmBox>
      </div>
      <SubmitSheets s={s} what={t('Stage 2 · Data and draft summary')} onDeadline={() => navigate('/s/activities', { replace: true })} />
    </Screen>
  )
}

/* ================================================= S3 · Peer review */

export function PbiPeer() {
  const t = useT()
  const navigate = useNavigate()
  const { id, a, allowed } = useTaskGuard('peer')
  const s = useSubmitter()
  const init = getDraft(id, 'peer') ?? { ticks: { awareness: [], sensitivity: [], creativity: [] }, appreciation: '' }
  const [form, setForm] = useState(init)
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState('right')
  const [tried, setTried] = useState(false)
  const [shake, setShake] = useState(0)
  const [touched, setTouched] = useState(false)
  const leave = useLeave(id, touched)
  if (!a || !allowed) return <Navigate to={`/s/pbi/${id}`} replace />

  const partner = progressOf(a).partner
  const pl = a.learners[partner] ?? {}
  const total = ABILITIES.length + 2
  const last = idx === total - 1
  const ab = idx >= 1 && idx <= ABILITIES.length ? ABILITIES[idx - 1] : null
  const go = (to) => { setDir(to > idx ? 'right' : 'left'); setIdx(to) }
  const upd = (fn) => { setTouched(true); setForm(fn) }
  const name = nameOf(partner)

  const submit = () => {
    setTried(true)
    if (!filled(form.appreciation)) { setShake((x) => x + 1); return }
    s.run(`pbi-peer:${id}`, () => {
      emit(id, 'C.S3.peer_done', (x) => {
        x.learners[ME].peerGiven = { ticks: form.ticks, appreciation: form.appreciation.trim(), peerId: partner, savedAt: nowIso() }
      }, { by: ME, target: partner })
      clearDraft(id, 'peer')
    }, () => navigate(`/s/pbi/${id}/sent/peer`, { replace: true }), () => setDraft(id, 'peer', form))
  }

  return (
    <Screen bg="plain" statusBar="light"
      header={<><AppBar close title={t('Stage 3 · Peer review')} right={t('Part {n} of {total}', { n: idx + 1, total })} onBack={leave.leave} /><StepProgress value={(idx + 1) / total} /></>}
      footer={<PrevNext onPrev={() => go(idx - 1)} prevDisabled={idx === 0} onNext={last ? submit : () => go(idx + 1)} nextLabel={last ? t('Submit') : idx === 0 ? t('Start review') : t('Next')} loading={s.loading} />}
    >
      <div key={idx} className={cx('flex flex-col gap-4 px-4 pb-8 pt-4', dir === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
        {idx === 0 && (
          <>
            <Heading title={t('{name}’s draft', { name })} sub={t('Topic: {topic}', { topic: t(pl.topic ?? '') })} />
            <EventNotice tone="info" title={t('Read their draft first')}>{t('You see only their own work. Your teacher’s feedback on it stays private.')}</EventNotice>
            <Block label={t('Draft plan')} right={<ProvenanceChip kind="student">{t('By {name}', { name })}</ProvenanceChip>}>
              {pl.plan ? <AnswerList rows={[...(pl.hypothesis ? [['Hypothesis', pl.hypothesis]] : []), ...PBI.draftPlan.map((k) => [k, pl.plan.answers?.[k]])]} /> : <p className="text-[0.8125rem] text-ink-muted">{t('Not submitted yet.')}</p>}
            </Block>
            <Block label={pl.instrument?.kind === 'interview' ? t('Interview') : t('Questionnaire')} right={<ProvenanceChip kind="student">{t('By {name}', { name })}</ProvenanceChip>}>
              <InstrumentView ins={pl.instrument} />
              {pl.roster && <p className="text-[0.8125rem] text-ink-muted">{t('{n} participants documented', { n: pl.roster.length })}</p>}
            </Block>
            <Block label={t('Draft summary')} right={<ProvenanceChip kind="student">{t('By {name}', { name })}</ProvenanceChip>}>
              {pl.summary ? <AnswerList rows={PBI.summary.map((k) => [k, pl.summary.answers?.[k]])} /> : <p className="text-[0.8125rem] text-ink-muted">{t('Not submitted yet.')}</p>}
            </Block>
          </>
        )}
        {ab && (
          <TickList ability={ab.id} statements={PBI.peer[ab.id]} value={form.ticks[ab.id]}
            prompt={t('Tick what is true about {name}’s draft.', { name })}
            onChange={(v) => upd((f) => ({ ...f, ticks: { ...f.ticks, [ab.id]: v } }))} />
        )}
        {last && (
          <>
            <Heading title={t(PBI.peerExtra[0])} sub={t('Write something kind and useful for {name}. They will read this note.', { name })} />
            <Field label={t(PBI.peerExtra[0])} value={form.appreciation} rows={5} onChange={(v) => upd((f) => ({ ...f, appreciation: v }))}
              error={tried && !filled(form.appreciation) && t('Write a few words to continue.')} shake={shake} />
            <LockNotice>{t('You can’t change your review after you submit.')}</LockNotice>
          </>
        )}
      </div>
      <Leave l={leave} title={t('Leave this peer review?')} />
      <SubmitSheets s={s} what={t('Stage 3 · Peer review')} onDeadline={() => navigate('/s/activities', { replace: true })} />
    </Screen>
  )
}

/* ================================================= S3 · Revise and resubmit */

export function PbiRevise() {
  const t = useT()
  const navigate = useNavigate()
  const { showToast } = useAppStore()
  const { id, a, l, allowed } = useTaskGuard('revise')
  const s = useSubmitter()
  const saved = getDraft(id, 'revise')
  const start = saved ?? { answers: { ...(l?.summary?.answers ?? {}) }, note: '', files: l?.summary?.files ?? [] }
  const [f, setF] = useState(start)
  const [snap, setSnap] = useState(() => JSON.stringify(start))
  const [tried, setTried] = useState(false)
  const [shake, setShake] = useState(0)
  const [busy, setBusy] = useState(false)
  const [agree, setAgree] = useState(false)
  const leave = useLeave(id, JSON.stringify(f) !== snap)
  if (!a || !allowed) return <Navigate to={`/s/pbi/${id}`} replace />

  const p = progressOf(a)
  const note = a.learners[p.reviewer]?.peerGiven?.appreciation
  const errs = {}
  PBI.summary.forEach((k) => { if (!filled(f.answers[k])) errs[k] = t('This part of the summary is required.') })
  if (!filled(f.note)) errs.note = t('Say what you changed, even if it was small.')
  if (!agree) errs.agree = true
  const bad = Object.keys(errs).length > 0
  const save = () => { setDraft(id, 'revise', f); setSnap(JSON.stringify(f)) }

  const submit = () => {
    setTried(true)
    if (bad || busy) { setShake((x) => x + 1); return }
    s.run(`pbi-revise:${id}`, () => {
      emit(id, 'C.S3.resubmitted', (x) => {
        x.learners[ME].revision = { note: f.note.trim(), answers: f.answers, files: f.files ?? [], resubmittedAt: nowIso() }
      }, { by: ME, target: ME })
      clearDraft(id, 'revise')
    }, () => navigate(`/s/pbi/${id}/sent/revise`, { replace: true }), save)
  }

  return (
    <Screen bg="plain" statusBar="light"
      header={<AppBar title={t('Stage 3 · Revise and resubmit')} onBack={leave.leave} />}
      footer={
        <Footer>
          {tried && bad && <p key={shake} className="animate-shake text-center text-[0.75rem] leading-4 text-danger">{t('Fix the highlighted parts to continue.')}</p>}
          <>
            <PrimaryButton onClick={submit} loading={s.loading}>{t('Resubmit')}</PrimaryButton>
            <OutlineButton onClick={() => { save(); showToast(t('Draft saved')) }} className={cx('text-[0.9375rem]', busy && 'pointer-events-none opacity-50')}>{t('Save Draft')}</OutlineButton>
          </>
        </Footer>
      }
    >
      <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
        <Heading title={t('Revise your summary')} sub={t('Use your partner’s note to improve your draft, then resubmit it to your teacher.')} />
        <Block label={t('Note from {name}', { name: nameOf(p.reviewer) })} right={<ProvenanceChip kind="peer" />}>
          <p className="whitespace-pre-wrap text-[0.9375rem] leading-[1.375rem] text-ink">{note || '—'}</p>
        </Block>
        {PBI.summary.map((k) => (
          <Field key={k} label={t(k)} value={f.answers[k] ?? ''} rows={4} onChange={(v) => setF((x) => ({ ...x, answers: { ...x.answers, [k]: v } }))} error={tried && errs[k]} shake={shake} />
        ))}
        <Field label={t('What did you change, and why?')} value={f.note} rows={3} onChange={(v) => setF((x) => ({ ...x, note: v }))} error={tried && errs.note} shake={shake} />
        <div className="flex flex-col gap-1.5">
          <span className="text-[0.8125rem] font-medium leading-[1.1875rem] text-ink">{t('Files')} <span className="font-normal text-ink-muted">· {t('optional')}</span></span>
          <FilePicker value={f.files} failKey={`pbi-rev:${id}`} onBusy={setBusy} onChange={(files) => setF((x) => (JSON.stringify(x.files) === JSON.stringify(files) ? x : { ...x, files }))} />
        </div>
        <ConfirmBox checked={agree} onChange={setAgree} error={tried && !agree}>{t('I confirm this is my own work.')}</ConfirmBox>
      </div>
      <Leave l={leave} title={t('Leave your revision?')} />
      <SubmitSheets s={s} what={t('Stage 3 · Revise and resubmit')} onDeadline={() => navigate('/s/activities', { replace: true })} />
    </Screen>
  )
}

/* ================================================= Post-enquiry reflection (Page 10) */

export function PbiPost() {
  const t = useT()
  const navigate = useNavigate()
  const { id, a, allowed } = useTaskGuard('post')
  const s = useSubmitter()
  const [answers, setAnswers] = useState(() => getDraft(id, 'post') ?? {})
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState('right')
  const [touched, setTouched] = useState(false)
  const leave = useLeave(id, touched)
  if (!a || !allowed) return <Navigate to={`/s/pbi/${id}`} replace />

  const qs = PBI.postReflection
  const q = qs[idx]
  const last = idx === qs.length - 1
  const go = (to) => { setDir(to > idx ? 'right' : 'left'); setIdx(to) }
  const submit = () => s.run(`pbi-post:${id}`, () => {
    emit(id, 'C.post_submitted', (x) => {
      x.learners[ME].post = { answers: Object.fromEntries(qs.map((k) => [k, (answers[k] ?? '').trim()])), savedAt: nowIso() }
    }, { by: ME, target: ME })
    clearDraft(id, 'post')
  }, () => navigate(`/s/pbi/${id}/sent/post`, { replace: true }), () => setDraft(id, 'post', answers))

  return (
    <Screen bg="plain" statusBar="light"
      header={<><AppBar close title={t('Post-enquiry reflection')} right={t('Question {n} of {total}', { n: idx + 1, total: qs.length })} onBack={leave.leave} /><StepProgress value={(idx + 1) / qs.length} /></>}
      footer={<PrevNext onPrev={() => go(idx - 1)} prevDisabled={idx === 0} onNext={last ? submit : () => go(idx + 1)} nextDisabled={!filled(answers[q])} nextLabel={last ? t('Submit') : t('Next')} loading={s.loading} />}
    >
      <div key={idx} className={cx('flex flex-col gap-5 px-4 pb-8 pt-4', dir === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
        <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t(q)}</h1>
        <textarea value={answers[q] ?? ''} rows={6} aria-label={t(q)} placeholder={t('Write in your own words')}
          onChange={(e) => { setTouched(true); setAnswers((x) => ({ ...x, [q]: e.target.value.slice(0, 1000) })) }}
          className="min-h-[160px] w-full resize-none rounded-lg border border-line bg-white px-[15px] py-3.5 text-[0.9375rem] leading-[1.375rem] text-ink outline-none placeholder:text-[#8a8790] focus:border-brand" />
        {q === qs[qs.length - 1] && <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Your teacher reads this to make the next enquiry better.')}</p>}
        {last && <LockNotice>{t('You can’t change your reflection after you submit.')}</LockNotice>}
      </div>
      <Leave l={leave} title={t('Leave this reflection?')} />
      <SubmitSheets s={s} what={t('Post-enquiry reflection')} onDeadline={() => navigate('/s/activities', { replace: true })} />
    </Screen>
  )
}

