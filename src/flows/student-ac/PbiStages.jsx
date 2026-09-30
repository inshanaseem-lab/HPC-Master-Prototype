import { useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { OutlineButton, PrimaryButton, Screen, Sheet, cx } from '../../components/ui.jsx'
import { useDate, useT } from '../../i18n/index.js'
import { ABILITIES, PBI } from '../../hpc/config.js'
import { ROSTER, TEACHER, resetMultiStage, useMultiStage } from '../../hpc/store.js'
import { EventNotice, LockNotice, ProvenanceChip, StageStepper, formatShort } from '../../hpc/components.jsx'
import { useStudentState } from '../../student/store.js'
import HandbookRow from '../../student/HandbookRow.jsx'
import { PbiActivity } from './Pbi.jsx'
import {
  ME, TASK_PATH, TASK_TITLE, WAIT_TEXT, clearAllDrafts, deadlineLabel, demo, dueFor, getDraft, isMultiPbi, isPast,
  nameOf, progressOf, unlockEvent,
} from './pbiModel.js'
import { AnswerList, Block } from './pbiParts.jsx'
import {
  ActivityHead, Alert, AppBar, Badge, DeadlineCard, FileIcon, Footer, InfoCard, SectionLabel, SmallButton, StepRow, SuccessBody,
} from './parts.jsx'

/* ================================================= /s/pbi/:id — entry */

/** Multi-stage PBI when the shared record exists (demo 'pbi-energy'), otherwise the old single-stage screens. */
export function PbiEntry() {
  const { id } = useParams()
  const a = useMultiStage(id)
  if (isMultiPbi(a)) return <PbiStagesActivity a={a} />
  return <PbiActivity />
}

/** Shared guard for the stage screens: the multi-stage record or back to the activity page. */
export function useMultiPbi() {
  const { id } = useParams()
  const a = useMultiStage(id)
  return { id, a: isMultiPbi(a) ? a : null, l: isMultiPbi(a) ? a.learners[ME] : null }
}

export const subtitle = (t) => t('Individual · Teacher: {name}', { name: TEACHER })

/* ------------------------------------------------------------ Activity page */

function PbiStagesActivity({ a }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { activities } = useStudentState()
  const q = new URLSearchParams(search)
  const p = progressOf(a)
  const l = a.learners[ME]
  const base = `/s/pbi/${a.id}`
  const legacy = activities.find((x) => x.id === a.id)

  const focusDue = dueFor(a, p.focus)
  const missed = q.get('missed') === '1' || legacy?.state === 'missed' || (p.primary && isPast(focusDue))
  if (missed) return <PbiStagesMissed a={a} p={p} />

  const go = (task) => navigate(`${base}/${TASK_PATH[task]}${search}`)
  const notice = p.primary && unlockEvent(a, p.primary)
  const hypothesis = a.setup?.hypothesis || l.hypothesis

  const stageNote = (id, state) => {
    const date = d(formatShort(a.stageDates?.[id]))
    const n = {
      S1: {
        open: t('Due {date} · draft plan, then self-reflection', { date }),
        submitted: t('Submitted · waiting for your teacher'),
        evaluated: p.s1Self ? t('Assessed · self-reflection done') : t('Assessed · your self-reflection is open'),
      },
      S2: {
        locked: t('Opens when your teacher starts Stage 2 · due {date}', { date }),
        open: t('Due {date} · instrument, 10+ responses, draft summary', { date }),
        submitted: t('Submitted · waiting for your teacher'),
        evaluated: p.s2Self ? t('Assessed · self-reflection done') : t('Assessed · your self-reflection is open'),
      },
      S3: {
        locked: t('Opens when your teacher pairs you with a classmate · due {date}', { date }),
        open: t('Review {name}’s draft, then revise yours · due {date}', { name: p.partner ? nameOf(p.partner) : '', date }),
        submitted: t('Resubmitted · waiting for your teacher'),
        evaluated: t('Assessed by your teacher'),
      },
    }
    return n[id][state]
  }
  const stages = PBI.stages.map((s) => ({ id: s.id, label: s.label, name: s.name, state: p.stageState[s.id], note: stageNote(s.id, p.stageState[s.id]) }))

  const primaryLabel = p.primary ? (getDraft(a.id, p.primary) ? t('Continue') : t('Start')) : null

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={t('Problem Based Enquiry')} />}
      footer={
        p.primary ? (
          <Footer><PrimaryButton onClick={() => go(p.primary)}>{primaryLabel} · {t(TASK_TITLE[p.primary])}</PrimaryButton></Footer>
        ) : p.postDone ? (
          <Footer><PrimaryButton onClick={() => navigate(`${base}/completed`)}>{t('View My Responses')}</PrimaryButton></Footer>
        ) : null
      }
    >
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <ActivityHead letter="C" title={t(a.title)} subtitle={subtitle(t)} />

        {notice && <UnlockNotice a={a} task={p.primary} p={p} />}
        {p.postDone && (
          <EventNotice title={t('All steps done')}>{t('Your enquiry, reviews and reflections are submitted.')}</EventNotice>
        )}

        <Block label={t('Your topic')} right={<ProvenanceChip kind="teacher">{t('Set by teacher')}</ProvenanceChip>}>
          <p className="text-[1.125rem] font-semibold leading-[1.625rem] text-ink">{t(l.topic ?? a.title)}</p>
          <div className="flex flex-col gap-1 border-t border-[#f1efec] pt-2.5">
            <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Research prompt')}</span>
            <span className="text-[0.875rem] leading-5 text-ink">{t(a.setup?.prompt ?? '')}</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-[#f1efec] pt-2.5">
            <span className="flex flex-wrap items-center justify-between gap-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
              {t('Hypothesis')}
              {hypothesis && <ProvenanceChip kind={a.setup?.hypothesis ? 'teacher' : 'student'} />}
            </span>
            <span className="text-[0.875rem] leading-5 text-ink">
              {hypothesis ? t(hypothesis) : t('Your teacher hasn’t given a hypothesis. You’ll propose your own in your draft plan.')}
            </span>
          </div>
        </Block>

        {!p.postDone && focusDue && <DeadlineCard deadline={deadlineLabel(focusDue)} />}

        <div className="flex flex-col gap-3">
          <SectionLabel>{t('Stages')}</SectionLabel>
          <div className="rounded-2xl border border-[#e5e6e1] bg-white p-4">
            <StageStepper stages={stages} current={['S1', 'S2', 'S3'].includes(p.focus) ? p.focus : undefined} />
          </div>
        </div>

        {p.waiting && <WaitingCard a={a} p={p} />}

        <FocusSteps a={a} p={p} go={go} />

        {p.postDone && (
          <InfoCard label={t('What happens next')}>
            {t('Your teacher uses your plan, data, summary, reviews and reflections to fill Part C of your Holistic Progress Card.')}
          </InfoCard>
        )}

        <HandbookRow />

        {q.get('demo') === '1' && <DemoPanel a={a} p={p} />}
      </div>
    </Screen>
  )
}

/** Visible message for the named event that opened the current step. */
function UnlockNotice({ a, task, p }) {
  const t = useT()
  const e = unlockEvent(a, task)
  const when = e?.at ? new Date(e.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''
  const d = useDate()
  const text = {
    s1self: [t('Your teacher has assessed your Stage 1 plan'), t('Your Stage 1 self-reflection is now open.')],
    s2: [t('Stage 2 is open'), t('Build your questionnaire or interview, collect at least 10 responses and write your draft summary.')],
    s2self: [t('Your teacher has assessed Stage 2'), t('Your Stage 2 self-reflection is now open.')],
    peer: [t('You’ve been paired for peer review'), t('Review {name}’s draft. Your review helps them improve.', { name: nameOf(p.partner) })],
    revise: [t('{name} has reviewed your draft', { name: nameOf(p.reviewer) }), t('Read their note and revise your summary.')],
  }[task]
  if (!text) return null
  return (
    <EventNotice title={text[0]}>
      {text[1]}
      {when && <span className="block pt-0.5 text-[0.75rem] text-ink-muted">{d(when)}</span>}
    </EventNotice>
  )
}

/** "Waiting for your teacher" — a real state, not a silent lock. */
function WaitingCard({ a, p }) {
  const t = useT()
  const who = p.waiting === 'peer' ? nameOf(p.partner) : TEACHER
  return (
    <div role="status" className="flex items-start gap-3 rounded-2xl border border-[#f1d3a8] bg-[#fff6e8] p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-brand-600">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9" /></svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{p.waiting === 'peer' ? t('Waiting for your partner') : t('Waiting for your teacher')}</p>
        <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-2">
          {p.waiting === 'peer' ? t('Waiting for {name} to review your draft', { name: who }) : t(WAIT_TEXT[p.waiting])}
        </p>
        <p className="pt-1 text-[0.75rem] leading-[1.125rem] text-ink-muted">{t('You’ll see a message here as soon as it moves.')}</p>
      </div>
    </div>
  )
}

/** "Your steps" for the stage in focus (kit S04-01). */
function FocusSteps({ a, p, go }) {
  const t = useT()
  const status = (done, task) => (done ? 'done' : p.tasks.includes(task) ? 'current' : 'locked')
  const btn = (task) => p.tasks.includes(task) && (
    <SmallButton onClick={() => go(task)}>{getDraft(a.id, task) ? t('Continue') : t('Start')}</SmallButton>
  )
  const lock = <Badge>{t('Locked')}</Badge>
  const rows = {
    S1: [
      ['Draft plan', p.s1Submitted, 'plan', p.s1Submitted ? t('Submitted') : t('What you know, what to find out, and how')],
      ['Self-reflection', p.s1Self, 's1self', p.s1Self ? t('Done') : t('Opens after your teacher assesses your plan')],
    ],
    S2: [
      ['Data and draft summary', p.s2Submitted, 's2', p.s2Submitted ? t('Submitted') : t('Instrument → 10+ responses → summary')],
      ['Self-reflection', p.s2Self, 's2self', p.s2Self ? t('Done') : t('Opens after your teacher assesses Stage 2')],
    ],
    S3: [
      ['Peer review', p.peerDone, 'peer', p.peerDone ? t('Done') : p.paired ? t('Review {name}’s draft', { name: nameOf(p.partner) }) : t('Opens when your teacher pairs you')],
      ['Revise and resubmit', p.resubmitted, 'revise', p.resubmitted ? t('Resubmitted') : t('Opens after your partner reviews your draft')],
      ['Post-enquiry reflection', p.postDone, 'post', p.postDone ? t('Done') : t('Opens after you resubmit')],
    ],
    post: [['Post-enquiry reflection', p.postDone, 'post', t('{n} questions', { n: PBI.postReflection.length })]],
  }[p.focus]
  if (!rows) return null
  return (
    <div className="flex flex-col gap-2">
      <SectionLabel>{t('Your steps')}</SectionLabel>
      {rows.map(([title, done, task, desc], i) => {
        const s = status(done, task)
        return <StepRow key={title} n={i + 1} status={s} title={t(title)} desc={desc} action={s === 'current' ? btn(task) : s === 'locked' ? lock : null} />
      })}
    </div>
  )
}

/* ------------------------------------------------------------ Missed (kit S04-08) */

function PbiStagesMissed({ a, p }) {
  const t = useT()
  const navigate = useNavigate()
  const due = dueFor(a, p.focus)
  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={t('Problem Based Enquiry')} />}
      footer={<Footer><PrimaryButton onClick={() => navigate('/s/activities?tab=completed')}>{t('Back to My Activities')}</PrimaryButton></Footer>}
    >
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <ActivityHead letter="C" title={t(a.title)} subtitle={subtitle(t)} />
        {due && <DeadlineCard deadline={deadlineLabel(due)} missed />}
        <Alert>{t('You missed the deadline for this stage. Submission is closed. Talk to your teacher if you need more time.')}</Alert>
        <div className="flex flex-col gap-2">
          <SectionLabel>{t('Your steps')}</SectionLabel>
          {p.tasks.map((task, i) => (
            <StepRow key={task} n={i + 1} status="closed" title={t(TASK_TITLE[task])} desc={t('Not submitted')} action={<Badge tone="error">{t('Closed')}</Badge>} />
          ))}
        </div>
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------ Demo panel (?demo=1) */

function DemoPanel({ a, p }) {
  const t = useT()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const partnerCandidates = ROSTER.length
  const items = [
    { label: 'Teacher assesses my Stage 1', ok: p.s1Submitted && !p.s1Eval, need: 'Submit your plan first', run: () => demo.s1Eval(a.id) },
    { label: 'Teacher opens Stage 2', ok: !p.s2Open, need: 'Already open', run: () => demo.openS2(a.id) },
    { label: 'Teacher assesses my Stage 2', ok: p.s2Submitted && !p.s2Eval, need: 'Submit Stage 2 first', run: () => demo.s2Eval(a.id) },
    { label: 'Teacher pairs me for Stage 3', ok: !p.paired && partnerCandidates > 1, need: 'Already paired', run: () => demo.pair(a.id, a) },
    { label: 'My partner reviews me', ok: p.paired && !p.reviewed, need: 'Pair first', run: () => demo.partnerReview(a.id, a) },
  ]
  return (
    <details className="rounded-2xl border border-dashed border-[#cdcac5] bg-white/70 p-3 text-[0.8125rem]">
      <summary className="flex min-h-11 cursor-pointer select-none items-center font-semibold text-ink-2">{t('Demo · emulate teacher and partner')}</summary>
      <div className="flex flex-col gap-2 pt-3">
        {items.map((it) => (
          <button key={it.label} type="button" disabled={!it.ok} onClick={it.run}
            className="tap flex min-h-11 flex-wrap items-center justify-between gap-x-2 gap-y-0.5 rounded-xl border border-line bg-white px-3 py-2 text-left font-medium text-ink hover:bg-cream disabled:opacity-50">
            <span>{t(it.label)}</span>
            {!it.ok && <span className="text-[0.75rem] text-ink-muted">{t(it.need)}</span>}
          </button>
        ))}
        <div className="flex flex-wrap gap-2 pt-1">
          <button type="button" onClick={() => navigate(`${pathname}?missed=1`)} className="tap min-h-11 rounded-full border border-line bg-white px-3 text-[0.75rem] font-medium text-ink-2">{t('Show missed state')}</button>
          {p.primary && (
            <button type="button" onClick={() => navigate(`${pathname}/${TASK_PATH[p.primary]}?deadline=passed`)} className="tap min-h-11 rounded-full border border-line bg-white px-3 text-[0.75rem] font-medium text-ink-2">{t('Deadline passes on submit')}</button>
          )}
          {p.primary && (
            <button type="button" onClick={() => navigate(`${pathname}/${TASK_PATH[p.primary]}?fail=submit,upload&demo=1`)} className="tap min-h-11 rounded-full border border-line bg-white px-3 text-[0.75rem] font-medium text-ink-2">{t('Submit and upload fail once')}</button>
          )}
          <button type="button" onClick={() => { resetMultiStage(); clearAllDrafts() }} className="tap min-h-11 rounded-full border border-danger bg-white px-3 text-[0.75rem] font-medium text-danger">{t('Reset demo')}</button>
        </div>
      </div>
    </details>
  )
}

/* ------------------------------------------------------------ Sent / waiting screens */

const SENT = {
  s1: { title: 'Draft plan submitted', body: '{teacher} will assess your plan. Your Stage 1 self-reflection opens after that.', wait: true },
  s1self: { title: 'Self-reflection submitted', body: 'Stage 2 opens when {teacher} starts it. You’ll see a message on this activity.' },
  s2: { title: 'Stage 2 submitted', body: '{teacher} will assess your data and draft summary. Your Stage 2 self-reflection opens after that.', wait: true },
  s2self: { title: 'Self-reflection submitted', body: 'Next, {teacher} will pair you with a classmate for peer review.' },
  peer: { title: 'Review sent', body: 'Thank you for helping {partner}. You can revise your own draft once your partner has reviewed it.' },
  revise: { title: 'Revised draft resubmitted', body: '{teacher} will assess your revised draft. Your post-enquiry reflection is open now.', wait: true },
}

export function PbiSent() {
  const t = useT()
  const navigate = useNavigate()
  const { kind } = useParams()
  const { id, a } = useMultiPbi()
  if (!a) return <Navigate to={`/s/pbi/${id}`} replace />
  const base = `/s/pbi/${id}`
  if (kind === 'post') {
    return (
      <Screen bg="plain" statusBar="light" footer={
        <Footer>
          <PrimaryButton onClick={() => navigate(`${base}/completed`, { replace: true })}>{t('View My Responses')}</PrimaryButton>
          <OutlineButton onClick={() => navigate('/s/activities?tab=completed', { replace: true })} className="text-[0.9375rem]">{t('Back to My Activities')}</OutlineButton>
        </Footer>
      }>
        <SuccessBody title={t('All steps done')} body={t('Your enquiry and reflections are submitted. {title} moves to Completed.', { title: t(a.title) })} />
      </Screen>
    )
  }
  const s = SENT[kind] ?? SENT.s1
  const p = progressOf(a)
  const vars = { teacher: TEACHER, partner: nameOf(p.partner) }
  return (
    <Screen bg="plain" statusBar="light" footer={
      <Footer>
        {p.primary ? (
          <>
            <PrimaryButton onClick={() => navigate(`${base}/${TASK_PATH[p.primary]}`, { replace: true })}>{t('Continue')}</PrimaryButton>
            <OutlineButton onClick={() => navigate('/s/home', { replace: true })} className="text-[0.9375rem]">{t('I Will Do This Later')}</OutlineButton>
          </>
        ) : (
          <>
            <PrimaryButton onClick={() => navigate(base, { replace: true })}>{t('Back to activity')}</PrimaryButton>
            <OutlineButton onClick={() => navigate('/s/home', { replace: true })} className="text-[0.9375rem]">{t('Go Home')}</OutlineButton>
          </>
        )}
      </Footer>
    }>
      <SuccessBody title={t(s.title)} body={t(s.body, vars)}>
        <div className="mt-2 flex w-full animate-fade-up flex-col gap-1 rounded-[18px] border border-brand-600 bg-[#fffaf5] p-4 text-left">
          <SectionLabel>{t('Next step')}</SectionLabel>
          {p.primary ? (
            <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(TASK_TITLE[p.primary])}</span>
          ) : (
            <>
              <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{p.waiting === 'peer' ? t('Waiting for your partner') : t('Waiting for your teacher')}</span>
              <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
                {p.waiting === 'peer' ? t('Waiting for {name} to review your draft', { name: nameOf(p.partner) }) : t(WAIT_TEXT[p.waiting] ?? '')}
              </span>
            </>
          )}
        </div>
      </SuccessBody>
    </Screen>
  )
}

/* ------------------------------------------------------------ Completed view (kit S04-09) */

const tickSummary = (t, ticks, statements) =>
  ABILITIES.map((ab) => `${t(ab.label)} ${ticks?.[ab.id]?.length ?? 0}/${statements[ab.id].length}`).join(' · ')

export function PbiStagesCompleted() {
  const t = useT()
  const d = useDate()
  const { id, a, l } = useMultiPbi()
  const [open, setOpen] = useState(null)
  if (!a) return <Navigate to={`/s/pbi/${id}`} replace />
  const p = progressOf(a)
  const day = (iso) => (iso ? d(new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })) : '')
  const reviewNote = p.reviewer ? a.learners[p.reviewer]?.peerGiven?.appreciation : null
  const ins = l.instrument

  const cards = [
    l.plan && {
      key: 'plan', title: t('My draft plan'), kind: 'student', sub: t('Stage 1 · submitted {at}', { at: day(l.plan.submittedAt) }),
      body: <AnswerList rows={[...(!a.setup?.hypothesis ? [['My hypothesis', l.hypothesis]] : []), ...PBI.draftPlan.map((f) => [f, l.plan.answers?.[f]])]} />,
    },
    l.s1Self && {
      key: 's1self', title: t('Stage 1 self-reflection'), kind: 'student', sub: tickSummary(t, l.s1Self.ticks, PBI.self.S1),
      body: <SelfView rec={l.s1Self} statements={PBI.self.S1} extra={[[PBI.s1SelfExtra[0], l.s1Self.problems], [PBI.s1SelfExtra[1], l.s1Self.help]]} />,
    },
    ins && {
      key: 'ins', title: ins.kind === 'interview' ? t('My interview') : t('My questionnaire'), kind: 'student',
      sub: ins.kind === 'interview' ? t('{n} min per person · {g}', { n: ins.minutes ?? 5, g: ins.targetGroup }) : t('{n} questions · {g}', { n: ins.items?.length ?? 0, g: ins.targetGroup }),
      body: <InstrumentView ins={ins} />,
    },
    l.roster && {
      key: 'roster', title: t('Responses collected'), kind: 'student', sub: t('{n} participants documented', { n: l.roster.length }),
      body: <RosterView roster={l.roster} />,
    },
    l.summary && {
      key: 'summary', title: t('My draft summary'), kind: 'student', sub: t('Stage 2 · submitted {at}', { at: day(l.summary.submittedAt) }),
      body: <><AnswerList rows={PBI.summary.map((f) => [f, l.summary.answers?.[f]])} /><FilesView files={l.summary.files} /></>,
    },
    l.s2Self && {
      key: 's2self', title: t('Stage 2 self-reflection'), kind: 'student', sub: tickSummary(t, l.s2Self.ticks, PBI.self.S2),
      body: <SelfView rec={l.s2Self} statements={PBI.self.S2} extra={[[PBI.s2SelfExtra[0], l.s2Self.appreciation]]} />,
    },
    l.peerGiven && {
      key: 'peer', title: t('Peer review I gave'), kind: 'peer', chip: t('Filled by you as peer'),
      sub: t('For {name} · {s}', { name: nameOf(p.partner), s: tickSummary(t, l.peerGiven.ticks, PBI.peer) }),
      body: <SelfView rec={l.peerGiven} statements={PBI.peer} extra={[[PBI.peerExtra[0], l.peerGiven.appreciation]]} />,
    },
    reviewNote && {
      key: 'note', title: t('Note from my partner'), kind: 'peer', sub: nameOf(p.reviewer),
      body: <p className="whitespace-pre-wrap text-[0.9375rem] leading-[1.375rem] text-ink">{reviewNote}</p>,
    },
    l.revision && {
      key: 'rev', title: t('My revised summary'), kind: 'student', sub: t('Stage 3 · resubmitted {at}', { at: day(l.revision.resubmittedAt) }),
      body: <><AnswerList rows={[['What I changed', l.revision.note], ...PBI.summary.map((f) => [f, l.revision.answers?.[f]])]} /><FilesView files={l.revision.files} /></>,
    },
    l.post && {
      key: 'post', title: t('Post-enquiry reflection'), kind: 'student', sub: t('{n} answers · submitted {at}', { n: PBI.postReflection.length, at: day(l.post.savedAt) }),
      body: <AnswerList rows={PBI.postReflection.map((q) => [q, l.post.answers?.[q]])} />,
    },
  ].filter(Boolean)
  const assessed = ['s1Teacher', 's2Teacher', 's3Teacher'].filter((k) => l[k]?.savedAt).length
  const current = cards.find((c) => c.key === open)

  return (
    <Screen bg="plain" statusBar="light" header={<AppBar title={t(a.title)} />}>
      <div className="stagger flex flex-col gap-4 px-4 pb-8 pt-4">
        <ActivityHead letter="C" title={t(a.title)} subtitle={p.postDone ? t('Completed on {at}', { at: day(l.post.savedAt) }) : subtitle(t)} />
        <p className="-mt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Riya Thakur (You) · Class 9 A · Topic: {topic}', { topic: t(l.topic ?? '') })}</p>
        {cards.map((c) => (
          <Block key={c.key} label={c.title} right={<ProvenanceChip kind={c.kind}>{c.chip}</ProvenanceChip>}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="min-w-[min(10rem,100%)] flex-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{c.sub}</p>
              <button type="button" onClick={() => setOpen(c.key)} className="tap -mr-2 min-h-11 min-w-11 shrink-0 rounded-lg px-2 text-[0.875rem] font-medium text-brand-700 hover:bg-brand-50 hover:underline">{t('View')}</button>
            </div>
          </Block>
        ))}
        {cards.length === 0 && <p className="py-8 text-center text-[0.8125rem] text-ink-muted">{t('Nothing submitted yet.')}</p>}
        <Block label={t('Teacher assessment')} right={<ProvenanceChip kind="teacher" />}>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-2">
            {assessed ? t('{n} of 3 stages assessed by {teacher}. Levels appear on your Holistic Progress Card.', { n: assessed, teacher: TEACHER }) : t('Not assessed yet.')}
          </p>
        </Block>
      </div>
      <Sheet open={!!current} onClose={() => setOpen(null)}>
        {current && (
          <div className="flex flex-col gap-3 px-4 pb-6 pt-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="min-w-0 text-[1.125rem] font-semibold leading-6 text-ink">{current.title}</p>
              <ProvenanceChip kind={current.kind}>{current.chip}</ProvenanceChip>
            </div>
            {current.body}
            <LockNotice>{t('Submitted work can’t be edited.')}</LockNotice>
            <OutlineButton onClick={() => setOpen(null)} className="text-[0.9375rem]">{t('Close')}</OutlineButton>
          </div>
        )}
      </Sheet>
    </Screen>
  )
}

export function SelfView({ rec, statements, extra = [] }) {
  const t = useT()
  return (
    <div className="flex flex-col gap-3">
      {ABILITIES.map((ab) => (
        <div key={ab.id} className="flex flex-col gap-1">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.96px] text-brand-600">{t(ab.label)} · {t('{n} of {total} ticked', { n: rec.ticks?.[ab.id]?.length ?? 0, total: statements[ab.id].length })}</p>
          {statements[ab.id].map((s, i) => {
            const on = rec.ticks?.[ab.id]?.includes(i)
            return (
              <p key={i} className={cx('flex items-start gap-2 text-[0.875rem] leading-5', on ? 'text-ink' : 'text-ink-muted')}>
                <span aria-hidden className={cx('mt-0.5 grid size-4 shrink-0 place-items-center rounded border text-[0.75rem] leading-none', on ? 'border-brand bg-brand text-white' : 'border-[#9d9aa2]')}>{on ? '✓' : ''}</span>
                <span><span className="sr-only">{on ? t('Ticked') : t('Not ticked')}: </span>{t(s)}</span>
              </p>
            )
          })}
        </div>
      ))}
      {extra.length > 0 && <AnswerList rows={extra} />}
    </div>
  )
}

export function InstrumentView({ ins }) {
  const t = useT()
  if (!ins) return <p className="text-[0.8125rem] text-ink-muted">{t('Not submitted yet.')}</p>
  return (
    <div className="flex flex-col gap-2">
      <AnswerList rows={[
        ['Type', ins.kind === 'interview' ? t('Interview') : t('Questionnaire')],
        ['Target group', ins.targetGroup],
        ['Why this group', ins.justification],
        ...(ins.kind === 'interview' ? [['Interview script', ins.script ?? ''], ['Minutes per interviewee', String(ins.minutes ?? '')]] : []),
      ]} />
      {ins.kind !== 'interview' && (
        <ol className="flex list-decimal flex-col gap-1 pl-5 text-[0.875rem] leading-5 text-ink">
          {(ins.items ?? []).map((q, i) => <li key={i}>{q}</li>)}
        </ol>
      )}
    </div>
  )
}

export function RosterView({ roster }) {
  const t = useT()
  const d = useDate()
  return (
    <ol className="flex flex-col divide-y divide-[#f1efec]">
      {(roster ?? []).map((r, i) => (
        <li key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 py-2 text-[0.875rem] leading-5">
          <span className="w-6 shrink-0 text-ink-muted">{i + 1}.</span>
          <span className="min-w-[min(8rem,100%)] flex-1 break-words"><span className="font-medium text-ink">{r.name}</span> <span className="text-ink-muted">· {r.role}</span></span>
          <span className="shrink-0 text-[0.75rem] text-ink-muted">{d(formatShort(r.date))} · {t(r.mode)}</span>
        </li>
      ))}
    </ol>
  )
}

export function FilesView({ files }) {
  const t = useT()
  if (!files?.length) return null
  return (
    <div className="flex flex-col gap-2 pt-2">
      {files.map((f) => (
        <div key={f.id ?? f.name} className="flex flex-wrap items-center gap-2.5 rounded-[10px] border border-line px-3 py-2.5">
          <span className="shrink-0 text-brand-600"><FileIcon /></span>
          <span className="min-w-[min(8rem,100%)] flex-1 break-words text-[0.8125rem] font-medium text-ink">{f.name}</span>
          <span className="text-[0.75rem] text-ink-muted">{t('Attached')}</span>
        </div>
      ))}
    </div>
  )
}

