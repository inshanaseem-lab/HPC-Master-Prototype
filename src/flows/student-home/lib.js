import { GROUPS, INITIAL_ACTIVITIES, activityPath } from '../../student/data.js'
import { STUDENT_ID } from '../../hpc/store.js'
import { getStudentStep } from '../../hpc/registry.js'
import { formatShort } from '../../hpc/components.jsx'

/**
 * Derived views over the student activity list (home, My Activities, Today's Focus).
 * Everything here is pure — screens call these with `useStudentState().activities`.
 */

// Prototype "today" (the board: 15 Sep deadline = "5 days left")
export const TODAY = new Date(2026, 8, 10)

const MONTH = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Sept: 8, Oct: 9, Nov: 10, Dec: 11 }

/** "15 Sep" / "15 Sep 2026, 11:59 PM" → Date (year defaults to 2026). */
export function parseDay(s) {
  const m = /(\d{1,2})\s+([A-Za-z]{3,4})(?:\s+(\d{4}))?/.exec(s || '')
  if (!m || MONTH[m[2]] == null) return null
  return new Date(Number(m[3] || 2026), MONTH[m[2]], Number(m[1]))
}

export function daysLeft(s) {
  const d = parseDay(s)
  return d ? Math.round((d - TODAY) / 86400000) : null
}

/** Due soon (≤ 5 days) or past → red due label, like the board. */
export const isUrgent = (a) => a.late || (daysLeft(a.due) ?? 99) <= 5

/**
 * Finished from the student's side. Note: data.js `isCompleted` treats every 'submitted' as done,
 * but for Section C 'submitted' means self-reflection is still next — so it stays live here.
 */
export function isDone(a) {
  if (a.state === 'done' || a.state === 'missed') return true
  if (a.section === 'A' && a.state === 'submitted') return true
  return !!a.closed
}

/**
 * Attach the handbook step (Part B 'gp-water', Part C 'pbi-energy') to each activity that has a
 * multi-stage record: `a.step = getStudentStep(record, STUDENT_ID)` → { next, due, path, focus } | null.
 * Pass the multi-stage state from useMultiStage() so screens re-render on named events.
 * When the flow returns null the existing logic below is used unchanged.
 */
export function withSteps(list, ms) {
  return list.map((a) => {
    const record = ms?.activities?.[a.id]
    if (!record) return a
    const step = getStudentStep(record, STUDENT_ID)
    if (!step) return a
    const due = /^\d{4}-\d{2}-\d{2}/.test(step.due ?? '') ? formatShort(step.due.slice(0, 10)) : step.due
    return { ...a, step, due: due || a.due }
  })
}

/** Where a card opens. Completed → 3.3/3.4 (or 9.1 for missed); closed reflection → the activity's 9.5 screen. */
export function pathFor(a) {
  if (a.step?.path) return a.step.path
  if (a.closed && a.state !== 'done' && a.state !== 'missed') {
    return { B: `/s/project/${a.id}`, C: `/s/pbi/${a.id}`, D: `/s/class/${a.id}` }[a.section] ?? activityPath(a)
  }
  if (a.section === 'C' && a.state === 'submitted') return `/s/pbi/${a.id}`
  return activityPath(a)
}

const byDue = (x, y) => (parseDay(x.due)?.getTime() ?? Infinity) - (parseDay(y.due)?.getTime() ?? Infinity)

export const liveActivities = (list) => list.filter((a) => !isDone(a)).sort(byDue)

/** Fixed order: A1–A8, then Group Project, Problem Based Enquiry, Classroom Interaction. */
export function completedActivities(list) {
  const rank = { A: 0, B: 1, C: 2, D: 3 }
  return list
    .map((a, i) => ({ a, i }))
    .filter(({ a }) => isDone(a))
    .sort((x, y) =>
      rank[x.a.section] - rank[y.a.section] ||
      (x.a.section === 'A' ? (x.a.code || '').localeCompare(y.a.code || '', undefined, { numeric: true }) : 0) ||
      x.i - y.i)
    .map(({ a }) => a)
}

const INITIALLY_LIVE = new Set(INITIAL_ACTIVITIES.filter((a) => !['done', 'missed'].includes(a.state) && !(a.section === 'A' && a.state === 'submitted')).map((a) => a.id))
/** 12.3: the student has finished activities that were live (vs. 8.3: teacher hasn't made any live). */
export const finishedLiveOnes = (list) => list.some((a) => isDone(a) && INITIALLY_LIVE.has(a.id) && a.state !== 'missed')

/**
 * Today's Focus — the only four triggers (1.3). A card clears once its step is done.
 * Returns plain descriptors; the screen translates them.
 */
export function focusCards(list) {
  const cards = []
  for (const a of liveActivities(list)) {
    if (a.closed) continue
    const title = a.title
    if (a.step) {
      // Multi-stage: a card only when a named event just unlocked something (registry `focus`)
      const f = a.step.focus
      if (f) cards.push({ a, key: 'step', title: [f.title, { title, ...(f.vars ?? {}) }], sub: [f.sub ?? a.step.next ?? '', { title, ...(f.vars ?? {}) }], cta: f.cta ?? 'Start' })
      continue
    }
    if (a.section === 'B' && a.state === 'recorded') {
      cards.push({ a, key: 'recorded', title: ['Your group project is submitted'], sub: ['{title} · next step is self-reflection.', { title }], cta: 'Start' })
    } else if (a.section === 'C' && a.state === 'submitted') {
      cards.push({ a, key: 'reflect', title: ['Reflect on {title}', { title }], sub: ['Your work is submitted. Next step is self-reflection.'], cta: 'Start' })
    } else if (a.section === 'D' && a.state === 'marked-complete') {
      cards.push({ a, key: 'complete', title: ['{title} is complete', { title }], sub: [a.groupId ? 'Next step is self-reflection, then peer review.' : 'Next step is self-reflection.'], cta: 'Start' })
    } else if (
      (a.section === 'A' && a.state === 'live') ||
      (a.section === 'B' && a.state === 'in-progress') ||
      (a.section === 'C' && (a.state === 'live' || a.state === 'draft')) ||
      (a.section === 'D' && a.state === 'before-class')
    ) {
      const sub = {
        A: 'Section A · Know Myself survey', B: 'Section B · Group Project',
        C: 'Section C · Problem Based Enquiry', D: 'Section D · Classroom Interaction',
      }[a.section]
      cards.push({ a, key: 'live', code: a.code, title: ['{title} is live', { title }], sub: [sub], cta: a.state === 'draft' ? 'Continue' : 'Start' })
    }
  }
  return cards
}

/** "Next: …" label and status line for a Live tab card. */
export function nextStep(a) {
  if (a.step?.next) return a.step.next
  switch (a.section) {
    case 'A': return 'Next: Start survey'
    case 'B': return {
      'in-progress': 'Next: Work on your project', 'waiting-teacher': 'Waiting for your teacher',
      recorded: 'Next: Self-reflection', reflected: 'Next: Peer review',
    }[a.state] ?? 'Next: Self-reflection'
    case 'C': return a.state === 'submitted' ? 'Next: Self-reflection' : 'Next: Submit your work'
    case 'D': return {
      'before-class': 'Next: Prepare for class', 'waiting-teacher': 'Waiting for your teacher',
      'marked-complete': 'Next: Self-reflection', reflected: 'Next: Peer review',
    }[a.state] ?? 'Next: Self-reflection'
    default: return ''
  }
}

/** Group cards for My Groups (one per live grouped activity). */
export function groupCards(list) {
  const seen = new Set()
  return liveActivities(list)
    .filter((a) => a.groupId && GROUPS[a.groupId] && !seen.has(a.groupId) && seen.add(a.groupId))
    .map((a) => ({ group: GROUPS[a.groupId], activity: a }))
}
