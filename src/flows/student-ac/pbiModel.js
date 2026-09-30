import { PBI } from '../../hpc/config.js'
import { STUDENT_ID, TEACHER, emit, learner } from '../../hpc/store.js'
import { DEMO_TODAY } from '../../hpc/components.jsx'

/**
 * Student side of Part C · Problem Based Enquiry as the handbook's 3-stage flow.
 * Pure helpers over the shared multi-stage record (src/hpc/store.js) — the record is never
 * written here except through emit() with a named event.
 */

export const ME = STUDENT_ID

/** Is this a handbook multi-stage PBI record that includes this learner? */
export const isMultiPbi = (a, me = ME) => a?.type === 'C' && !!a.learners?.[me]

const findEvent = (a, name, target) =>
  [...(a?.events ?? [])].reverse().find((e) => e.name === name && (target === undefined || e.target === target))

/** Learner whose Stage 3 review is ABOUT me (pairs[x] === me). */
export const reviewerOf = (a, me = ME) => Object.keys(a?.pairs ?? {}).find((k) => k !== me && a.pairs[k] === me)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** ISO '2026-09-16' → '16 Sep 2026, 11:59 PM' (the DeadlineCard format). */
export function deadlineLabel(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}, 11:59 PM`
}
export const dueShort = (iso) => {
  if (!iso) return ''
  const [, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]}`
}

/**
 * Where this learner is in the enquiry.
 *  tasks: what the learner can do now, in handbook order ('plan' | 's1self' | 's2' | 's2self' | 'peer' | 'revise' | 'post')
 *  waiting: why nothing is open ('s1eval' | 'open2' | 's2eval' | 'pair' | 'peer' | null)
 *  focus: the stage the activity page highlights
 */
export function progressOf(a, me = ME) {
  const l = a?.learners?.[me] ?? {}
  const f = {
    s1Submitted: !!l.plan?.submittedAt,
    s1Eval: !!l.s1Teacher?.savedAt,
    s1Self: !!l.s1Self?.savedAt,
    s2Open: !!findEvent(a, 'C.S2.opened') || ['S2', 'S3', 'overview', 'closed'].includes(a?.currentStage),
    s2Submitted: !!l.summary?.submittedAt,
    s2Eval: !!l.s2Teacher?.savedAt,
    s2Self: !!l.s2Self?.savedAt,
    partner: a?.pairs?.[me] ?? null,
    peerDone: !!l.peerGiven?.savedAt,
    reviewer: reviewerOf(a, me) ?? null,
    resubmitted: !!l.revision?.resubmittedAt,
    s3Eval: !!l.s3Teacher?.savedAt,
    postDone: !!l.post?.savedAt,
  }
  f.paired = !!f.partner
  f.reviewed = !!(f.reviewer && a.learners[f.reviewer]?.peerGiven?.savedAt)

  const tasks = []
  if (!f.s1Submitted) tasks.push('plan')
  if (f.s1Eval && !f.s1Self) tasks.push('s1self')
  if (f.s2Open && f.s1Submitted && !f.s2Submitted) tasks.push('s2')
  if (f.s2Eval && !f.s2Self) tasks.push('s2self')
  if (f.paired && f.s2Submitted && !f.peerDone) tasks.push('peer')
  if (f.reviewed && f.s2Submitted && !f.resubmitted) tasks.push('revise')
  if (f.resubmitted && !f.postDone) tasks.push('post')

  let waiting = null
  if (!tasks.length && !f.postDone) {
    if (f.peerDone && !f.reviewed) waiting = 'peer'
    else if (f.s2Submitted && !f.s2Eval) waiting = 's2eval'
    else if (f.s2Self && !f.paired) waiting = 'pair'
    else if (f.s1Submitted && !f.s1Eval) waiting = 's1eval'
    else if (f.s1Self && !f.s2Open) waiting = 'open2'
    else waiting = 's1eval'
  }

  const STAGE_OF = { plan: 'S1', s1self: 'S1', s2: 'S2', s2self: 'S2', peer: 'S3', revise: 'S3', post: 'post' }
  const WAIT_STAGE = { s1eval: 'S1', open2: 'S2', s2eval: 'S2', pair: 'S3', peer: 'S3' }
  const primary = tasks[0] ?? null
  const focus = f.postDone ? 'done' : primary ? STAGE_OF[primary] : WAIT_STAGE[waiting] ?? 'S1'

  // Stepper states
  const S1 = f.s1Eval ? 'evaluated' : f.s1Submitted ? 'submitted' : 'open'
  const S2 = !f.s2Open ? 'locked' : f.s2Eval ? 'evaluated' : f.s2Submitted ? 'submitted' : 'open'
  const S3 = !f.paired ? 'locked' : f.s3Eval ? 'evaluated' : f.resubmitted ? 'submitted' : 'open'

  return { ...f, tasks, primary, waiting, focus, stageState: { S1, S2, S3 } }
}

/** The named event that opened a task (to show a visible EventNotice). */
export function unlockEvent(a, task, me = ME) {
  switch (task) {
    case 's1self': return findEvent(a, 'C.S1.teacher_evaluated', me)
    case 's2': return findEvent(a, 'C.S2.opened')
    case 's2self': return findEvent(a, 'C.S2.teacher_evaluated', me)
    case 'peer': return findEvent(a, 'C.S3.paired')
    case 'revise': return findEvent(a, 'C.S3.peer_done', me)
    default: return null
  }
}

export const TASK_PATH = {
  plan: 'plan', s1self: 'reflect/S1', s2: 's2/1', s2self: 'reflect/S2', peer: 'peer', revise: 'revise', post: 'post',
}
export const TASK_TITLE = {
  plan: 'Stage 1 · Draft plan',
  s1self: 'Stage 1 · Self-reflection',
  s2: 'Stage 2 · Data and draft summary',
  s2self: 'Stage 2 · Self-reflection',
  peer: 'Stage 3 · Peer review',
  revise: 'Stage 3 · Revise and resubmit',
  post: 'Post-enquiry reflection',
}
export const WAIT_TEXT = {
  s1eval: 'Waiting for your teacher to assess your Stage 1 plan',
  open2: 'Waiting for your teacher to open Stage 2',
  s2eval: 'Waiting for your teacher to assess Stage 2',
  pair: 'Waiting for your teacher to pair you for peer review',
  peer: 'Waiting for your partner to review your draft',
}

export const dueFor = (a, stage) => a?.stageDates?.[stage === 'post' || stage === 'done' ? 'S3' : stage]
export const isPast = (iso) => !!iso && iso < DEMO_TODAY
export const deadlinePassedParam = (search) => new URLSearchParams(search).get('deadline') === 'passed'

/* ------------------------------------------------------------ Local drafts */
// Drafts stay on this phone until submitted; the shared record only gets submitted work.
const DK = 'hpc-pbi-student-drafts:v1'
const readAll = () => { try { return JSON.parse(localStorage.getItem(DK)) ?? {} } catch { return {} } }
export function getDraft(id, form) { return readAll()[`${id}:${form}`] ?? null }
export function setDraft(id, form, value) {
  const all = readAll()
  all[`${id}:${form}`] = value
  try { localStorage.setItem(DK, JSON.stringify(all)) } catch { /* storage unavailable */ }
}
export function clearDraft(id, form) {
  const all = readAll()
  delete all[`${id}:${form}`]
  try { localStorage.setItem(DK, JSON.stringify(all)) } catch { /* storage unavailable */ }
}
export function clearAllDrafts() { try { localStorage.removeItem(DK) } catch { /* storage unavailable */ } }

/* ------------------------------------------------------------ Demo (teacher / partner emulation) */

const at = () => new Date().toISOString()
const DEMO_PLAN = {
  'What do I know?': 'Many people in my town drive to work even when buses run on the same route.',
  'What do I need to find out?': 'Why people avoid buses and what would make them switch.',
  'What do I need to do?': 'Ask commuters, shopkeepers and the bus depot staff.',
  'Research task schedule': 'Week 1 questionnaire · Week 2 responses · Week 3 analysis',
  'Evidence collection to support/negate the hypothesis': 'Questionnaire with at least 10 commuters',
  'Analysis and synthesis': 'Count answers and group the reasons',
  Discussions: 'Share findings with my family and class',
  'Conclusion (tentative solution)': 'A printed bus timetable at every stop',
}
const DEMO_SUMMARY = {
  'Key findings': '7 of 12 people said buses are not on time; 5 did not know the timetable.',
  'Proposed solution': 'Put a printed timetable and a helpline number at every bus stop.',
  Justification: 'Most people said they would try the bus if they knew when it comes.',
  'Possible drawbacks': 'Timetables need updating when routes change.',
}
const allTicks = (n = 2) => ({ awareness: [...Array(n).keys()], sensitivity: [...Array(n).keys()], creativity: [...Array(n).keys()] })

/** Pick a Stage 3 partner with a different topic (handbook: "preferably different topics"). */
export function pickPartner(a, me = ME) {
  const mine = a.learners[me]?.topic
  const taken = new Set([...Object.keys(a.pairs ?? {}), ...Object.values(a.pairs ?? {})])
  const ids = Object.keys(a.learners).filter((k) => k !== me && !taken.has(k))
  return ids.find((k) => a.learners[k].topic !== mine && a.learners[k].plan?.submittedAt)
    ?? ids.find((k) => a.learners[k].topic !== mine) ?? ids[0]
}

export const demo = {
  s1Eval(id, me = ME) {
    emit(id, 'C.S1.teacher_evaluated', (a) => {
      a.learners[me].s1Teacher = { ticks: { awareness: [0, 1, 2], sensitivity: [0, 2], creativity: [1] }, comments: 'Clear plan. Think about who else you could ask.', intervention: '', savedAt: at() }
    }, { by: TEACHER, target: me })
  },
  openS2(id) {
    emit(id, 'C.S2.opened', (a) => { a.currentStage = 'S2' }, { by: TEACHER })
  },
  s2Eval(id, me = ME) {
    emit(id, 'C.S2.teacher_evaluated', (a) => {
      a.learners[me].s2Teacher = { ticks: { awareness: [0, 1], sensitivity: [0, 1, 2], creativity: [0] }, comments: 'Good data. Present it in a chart.', intervention: '', savedAt: at() }
    }, { by: TEACHER, target: me })
  },
  pair(id, a, me = ME) {
    const partner = pickPartner(a, me)
    if (!partner) return null
    const p = a.learners[partner]
    // The partner needs a draft to review; submit one in their name first (a real, named event).
    if (!p.plan?.submittedAt) {
      emit(id, 'C.S1.submitted', (x) => { x.learners[partner].plan = { answers: DEMO_PLAN, submittedAt: at() } }, { by: partner, target: partner })
    }
    if (!p.summary?.submittedAt) {
      emit(id, 'C.S2.submitted', (x) => {
        const l = x.learners[partner]
        l.instrument = {
          kind: 'questionnaire', targetGroup: 'Adults who travel to work in town',
          justification: 'They choose between the bus and other transport every day.',
          items: ['How do you usually travel to work?', 'How often do you take the bus?', 'What stops you from taking the bus?', 'Would a printed timetable help you?'],
        }
        l.roster = Array.from({ length: 12 }, (_, i) => ({ name: `Respondent ${i + 1}`, role: i % 2 ? 'Shopkeeper' : 'Commuter', date: '2026-09-12', mode: i % 3 ? 'In person' : 'Phone' }))
        l.summary = { answers: DEMO_SUMMARY, files: [], submittedAt: at() }
      }, { by: partner, target: partner })
    }
    emit(id, 'C.S3.paired', (x) => {
      x.currentStage = 'S3'
      x.pairs = { ...(x.pairs ?? {}), [me]: partner, [partner]: me }
    }, { by: TEACHER, target: me })
    return partner
  },
  partnerReview(id, a, me = ME) {
    const reviewer = reviewerOf(a, me) ?? a.pairs?.[me]
    if (!reviewer) return
    emit(id, 'C.S3.peer_done', (x) => {
      x.pairs = { ...(x.pairs ?? {}), [reviewer]: me }
      x.learners[reviewer].peerGiven = {
        ticks: allTicks(2), peerId: me, savedAt: at(),
        appreciation: 'Your questions are easy to understand and you asked many different people. Maybe add one question about cost.',
      }
    }, { by: reviewer, target: me })
  },
}

export const nameOf = (id) => learner(id)?.name ?? id
export { PBI }
