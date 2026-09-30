import { useState } from 'react'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { PBI, ABILITIES } from '../../hpc/config.js'
import { emit, resetMultiStage, STUDENT_ID, TEACHER } from '../../hpc/store.js'
import { cx } from '../../components/ui.jsx'
import { learnerIds, nameOf, isOpen, statementsFor, stageStatus, reviewerOf } from './store.js'
import { fileName } from './data.js'

/**
 * Hidden QA panel on the progress hub (?demo=1). Every button fast-forwards the class through the
 * SAME named events the student app emits, so the teacher screens react exactly as they would live.
 */

const at = () => new Date().toISOString()
const someTicks = (n, seed) => Array.from({ length: n }, (_, i) => i).filter((i) => (i + seed) % 3 !== 0)

export const sample = {
  plan: (topic) => ({
    answers: {
      'What do I know?': `Some basics about “${topic}” from class and from my family.`,
      'What do I need to find out?': 'What people around me think, and what it would cost to change things.',
      'What do I need to do?': 'Write a short questionnaire and ask at least 10 people.',
      'Research task schedule': 'Day 1–2 questionnaire · Day 3–6 responses · Day 7 analysis',
      'Evidence collection to support/negate the hypothesis': 'Questionnaire with 10+ respondents and two short interviews',
      'Analysis and synthesis': 'Tally answers, look for patterns, compare groups',
      Discussions: 'Share early findings with my class and my teacher',
      'Conclusion (tentative solution)': 'A small, low-cost change the school or ward can try first',
    },
    submittedAt: at(),
  }),
  self: (stage, seed) => ({
    ticks: Object.fromEntries(ABILITIES.map((a, i) => [a.id, someTicks(PBI.self[stage][a.id].length, seed + i)])),
    ...(stage === 'S1' ? { problems: 'Some people did not want to answer.', help: 'I asked my teacher how to word questions politely.' } : { appreciation: 'I kept going even when it was hard.' }),
    savedAt: at(),
  }),
  s2: (id, responses) => ({
    instrument: {
      kind: responses % 2 ? 'interview' : 'questionnaire',
      items: ['Do you know what solar energy is?', 'How often does the power go off?', 'Would you pay a little more for clean energy?', 'Who should pay for panels at school?', 'What worries you about changing?', 'Have you seen this work elsewhere?'],
      targetGroup: 'Parents, teachers and shopkeepers near the school',
      justification: 'They pay the bills and decide what the school and ward spend on.',
    },
    roster: Array.from({ length: responses }, (_, i) => ({
      name: ['Sunita Devi', 'Ramesh Thakur', 'Kamla Negi', 'Vijay Sood', 'Meena Rana', 'Balbir Singh', 'Rekha Sharma', 'Suresh Kumar', 'Anita Chauhan', 'Mohan Lal', 'Geeta Verma', 'Prem Chand'][i % 12],
      role: ['Parent', 'Teacher', 'Shopkeeper', 'Panchayat member'][i % 4],
      date: `2026-09-${String(11 + (i % 8)).padStart(2, '0')}`,
      mode: i % 3 ? 'In person' : 'Phone',
    })),
    summary: {
      answers: {
        'Key findings': 'Most people want fewer power cuts; 7 of 10 would support rooftop solar if the cost is shared.',
        'Proposed solution': 'Start with solar lights for the corridor and one classroom, funded by the SMC and a CSR grant.',
        Justification: 'It is low cost, visible to everyone and shows results within a month.',
        'Possible drawbacks': 'Panels need cleaning; monkeys may damage them; the grant may take time.',
      },
      files: [fileName(nameOf(id), 'summary')],
      submittedAt: at(),
    },
  }),
  peer: (seed) => ({
    ticks: Object.fromEntries(ABILITIES.map((a, i) => [a.id, someTicks(PBI.peer[a.id].length, seed + i + 1)])),
    appreciation: 'Your questions are clear and polite. Good work!',
    savedAt: at(),
  }),
  revision: (id) => ({ note: 'I reworded two questions after my partner’s review and added three more respondents.', files: [fileName(nameOf(id), 'revised-draft')], resubmittedAt: at() }),
  post: () => ({
    answers: Object.fromEntries(PBI.postReflection.map((p, i) => [p, ['How to ask people questions respectfully.', 'Talking to shopkeepers.', 'Writing the summary.', 'Listening, planning, asking follow-ups.', 'Time, handwriting, confidence.', 'Would the panchayat really fund it?', 'Let us present to the SMC.'][i]])),
    savedAt: at(),
  }),
}

function Btn({ onClick, disabled, children }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick}
      className={cx('tap min-h-11 rounded-xl border px-3 py-2 text-left text-[0.8125rem] font-medium leading-[1.125rem]', disabled ? 'border-line bg-surface text-ink-muted' : 'border-line bg-white text-ink hover:bg-cream')}>
      {children}
    </button>
  )
}

export function DemoPanel({ a }) {
  const t = useT()
  const { showToast } = useAppStore()
  const [open, setOpen] = useState(true)
  const ids = learnerIds(a)
  const others = ids.filter((id) => id !== STUDENT_ID)
  const done = (msg) => showToast(t(msg))

  const submitS1 = (list) => list.forEach((id, i) => {
    emit(a.id, 'C.S1.submitted', (x) => { x.learners[id].plan = sample.plan(x.learners[id].topic || 'my topic') }, { by: id, target: id })
    if (i % 3 !== 2) emit(a.id, 'C.S1.self_evaluated', (x) => { x.learners[id].s1Self = sample.self('S1', i) }, { by: id, target: id })
  })
  const submitS2 = (list, short) => list.forEach((id, i) => {
    const d = sample.s2(id, short && i === 0 ? 8 : 10 + (i % 4))
    emit(a.id, 'C.S2.submitted', (x) => { Object.assign(x.learners[id], { instrument: d.instrument, roster: d.roster, summary: d.summary }) }, { by: id, target: id })
    if (i % 4 !== 3) emit(a.id, 'C.S2.self_evaluated', (x) => { x.learners[id].s2Self = sample.self('S2', i) }, { by: id, target: id })
  })
  const assessAll = (stage) => {
    const key = { S1: 's1Teacher', S2: 's2Teacher', S3: 's3Teacher' }[stage]
    const list = ids.filter((id) => { const s = stageStatus(a, id, stage); return s.submitted && !s.assessed })
    list.forEach((id, i) => emit(a.id, `C.${stage}.teacher_evaluated`, (x) => {
      x.learners[id][key] = {
        ticks: Object.fromEntries(ABILITIES.map((ab, j) => [ab.id, someTicks(statementsFor(x, stage, ab.id).list.length, i + j)])),
        comments: 'Good progress — keep your evidence organised.', intervention: '', savedAt: at(),
      }
    }, { by: TEACHER, target: id }))
    return list.length
  }

  const actions = [
    { label: '10 more learners submit Stage 1', ok: true, run: () => { const l = others.filter((id) => !a.learners[id].plan?.submittedAt).slice(0, 10); submitS1(l); done(l.length ? '10 learners submitted Stage 1' : 'Everyone has submitted.') } },
    { label: 'Riya submits Stage 1', ok: !a.learners[STUDENT_ID]?.plan?.submittedAt, run: () => { submitS1([STUDENT_ID]); done('Riya submitted Stage 1') } },
    { label: 'Assess every waiting Stage 1 plan (demo ticks)', ok: true, run: () => { assessAll('S1'); done('Stage 1 plans assessed') } },
    { label: 'Riya submits Stage 2', ok: isOpen(a, 'S2') && !a.learners[STUDENT_ID]?.summary?.submittedAt, run: () => { submitS2([STUDENT_ID]); done('Riya submitted Stage 2') } },
    { label: '15 learners submit Stage 2 (one has only 8 responses)', ok: isOpen(a, 'S2'), run: () => { submitS2(others.filter((id) => !a.learners[id].summary?.submittedAt).slice(0, 15), true); done('15 learners submitted Stage 2') } },
    { label: 'Assess every waiting Stage 2 summary (demo ticks)', ok: isOpen(a, 'S2'), run: () => { assessAll('S2'); done('Stage 2 summaries assessed') } },
    {
      label: 'All pairs finish peer review', ok: isOpen(a, 'S3') && Object.keys(a.pairs ?? {}).length > 0,
      run: () => { Object.keys(a.pairs).filter((id) => !a.learners[id].peerGiven?.savedAt).forEach((id, i) => emit(a.id, 'C.S3.peer_reviewed', (x) => { x.learners[id].peerGiven = sample.peer(i) }, { by: id, target: a.pairs[id] })); done('All pairs finished peer review') },
    },
    {
      label: 'Reviewed learners resubmit revised drafts', ok: isOpen(a, 'S3'),
      run: () => { ids.filter((id) => { const r = reviewerOf(a, id); return r && a.learners[r].peerGiven?.savedAt && !a.learners[id].revision?.resubmittedAt }).forEach((id) => emit(a.id, 'C.S3.resubmitted', (x) => { x.learners[id].revision = sample.revision(id) }, { by: id, target: id })); done('Revised drafts resubmitted') },
    },
    { label: 'Assess every waiting Stage 3 draft (demo ticks)', ok: isOpen(a, 'S3'), run: () => { assessAll('S3'); done('Stage 3 drafts assessed') } },
    { label: 'Learners submit the post-inquiry reflection', ok: isOpen(a, 'S3'), run: () => { ids.filter((id) => a.learners[id].s3Teacher && !a.learners[id].post?.savedAt).forEach((id) => emit(a.id, 'C.post_submitted', (x) => { x.learners[id].post = { ...(x.learners[id].post ?? {}), ...sample.post() } }, { by: id, target: id })); done('Post-inquiry reflections submitted') } },
    {
      label: 'Pretend 3 days have passed (nudge again)', ok: !!a.nudges,
      run: () => { emit(a.id, 'C.demo.time_passed', (x) => { Object.values(x.nudges ?? {}).forEach((m) => Object.keys(m).forEach((k) => { m[k] = new Date(Date.now() - 4 * 86400000).toISOString() })) }); done('Nudges can be sent again') },
    },
    { label: 'Reset demo data', ok: true, run: () => { resetMultiStage(); done('Demo data reset') } },
  ]

  return (
    <section className="rounded-[18px] border border-dashed border-[#cfcac4] bg-[#faf8f6] p-3" aria-label={t('Demo controls')}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="tap flex min-h-11 w-full items-center justify-between text-[0.75rem] font-bold uppercase tracking-[0.96px] text-ink-muted">
        {t('Demo controls')} <span aria-hidden>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="grid grid-cols-1 gap-2 pt-2">{actions.map((x) => <Btn key={x.label} disabled={!x.ok} onClick={x.run}>{t(x.label)}</Btn>)}</div>}
    </section>
  )
}
