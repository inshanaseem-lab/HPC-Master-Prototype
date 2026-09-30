import { useCallback, useState } from 'react'
import { useMultiStage, learner, groupOf, tickCount, ROSTER, emit } from '../../hpc/store.js'
import { ABILITIES, GROUP_PROJECT, LEVELS } from '../../hpc/config.js'
import { DEMO_TODAY } from '../../hpc/components.jsx'
import { DEFAULT_CLASSES } from '../../store/AppStore.jsx'

/**
 * Teacher-side helpers for Part B · Group Project (shared by group-setup and group-live).
 * All activity data lives in the shared multi-stage store (src/hpc/store.js); this file only
 * derives statuses from it. "Today" is the fixed demo date (DEMO_TODAY).
 */

export const STAGES = ['S1', 'S2', 'S3']
const ORDER = ['S1', 'S2', 'S3', 'overview', 'closed']
export const stageIdx = (s) => ORDER.indexOf(s)
export const stageOpen = (a, s) => a && stageIdx(a.currentStage) >= stageIdx(s)

/* ----------------------------------------------------------------- Class */

export function parseClass(classId) {
  const m = /^(\d+)([A-Z])$/i.exec(classId || '')
  return { grade: m?.[1] ?? classId, section: m?.[2]?.toUpperCase() ?? '' }
}
/** "9 A" (Today's Focus copy) */
export const classSpaced = (classId) => { const c = parseClass(classId); return `${c.grade} ${c.section}`.trim() }

const MORE_NAMES = [
  'Aditya Thakur', 'Bhavna Rana', 'Chetan Negi', 'Diksha Sharma', 'Eshan Chauhan', 'Garima Katoch', 'Himanshu Verma',
  'Jyoti Guleria', 'Karan Dogra', 'Lata Kumari', 'Manav Pathania', 'Naina Jamwal', 'Om Prakash', 'Priya Chandel',
  'Rakesh Sood', 'Sakshi Kaundal', 'Tarun Bhardwaj', 'Usha Minhas', 'Vikas Parmar', 'Anchal Thakur', 'Bharat Rana',
  'Charu Negi', 'Dev Sharma', 'Ekta Chauhan', 'Gopal Katoch', 'Heena Verma', 'Ishant Guleria', 'Juhi Dogra',
  'Kamal Kumar', 'Lalit Pathania', 'Monika Jamwal', 'Nikhil Sen', 'Pankaj Chandel', 'Rashmi Sood', 'Sanjay Kaundal',
  'Tanuja Bhardwaj', 'Umesh Minhas', 'Vandana Parmar', 'Ajay Rawat', 'Babita Kapoor', 'Chirag Jaswal', 'Deepika Bhatia',
  'Gaurav Sen', 'Hemlata Rawat', 'Inder Kapoor', 'Jatin Jaswal', 'Kiran Bhatia', 'Lakshmi Negi', 'Mukesh Rana',
  'Nandini Thakur', 'Prem Chauhan', 'Rekha Katoch', 'Sunil Verma', 'Tripti Guleria', 'Vinod Dogra', 'Yamini Sharma',
  'Anuj Pathania', 'Bindu Jamwal', 'Chandan Sen', 'Dimple Chandel',
]

/** Class record from the teacher's classes (grade, section, stream for 11/12) + size (40–60; 9A = demo roster). */
export function classInfo(classes, classId) {
  const c = classes?.find((x) => x.id === classId) ?? DEFAULT_CLASSES.find((x) => x.id === classId)
  const p = parseClass(classId)
  const size = classId === '9A' ? ROSTER.length : Math.max(40, Math.min(60, c?.students ?? 40))
  return { id: classId, grade: c?.grade ?? p.grade, section: c?.section ?? p.section, stream: c?.stream, size }
}
export const classSize = (classes, classId) => classInfo(classes, classId).size

/** Learners of a class: { id, name, studentId }. */
export function rosterFor(classId, size) {
  if (classId === '9A') return ROSTER.map((r) => ({ id: r.id, name: r.name, studentId: r.studentId }))
  return MORE_NAMES.slice(0, size).map((name, i) => ({ id: `s-${classId}-${i + 1}`, name, studentId: String(121166000 + i + 1) }))
}

/* -------------------------------------------------------------- Activity */

/** The Group Project for a class (the live one if there is one, else the newest). */
export function findB(state, classId) {
  const list = Object.values(state?.activities ?? {}).filter((a) => a.type === 'B' && a.classId === classId)
  return list.find((a) => a.status === 'live') ?? list[list.length - 1]
}
export function useBActivity(classId) {
  const s = useMultiStage()
  return findB(s, classId)
}

export const nameOf = (a, id) => learner(id)?.name ?? a?.roster?.find((r) => r.id === id)?.name ?? id
export const firstName = (name) => (name ?? '').split(' ')[0]
export const groupsOf = (a) => Object.values(a?.groups ?? {})
export const allLearners = (a) => groupsOf(a).flatMap((g) => g.members)
export { groupOf }

/* -------------------------------------------------------------- Statuses */

/** Learner's post-project reflection has been submitted (answers present). */
export const postSubmitted = (post) => !!(post?.submittedAt || (post?.savedAt && post?.answers && Object.keys(post.answers).length))

const day = (ts) => (ts ? String(ts).slice(0, 10) : '')
export const pastDue = (a, stage) => !!a?.stageDates?.[stage] && DEMO_TODAY > a.stageDates[stage]
const late = (ts, due) => !!due && day(ts) > due

/** Stage 1 submission (learner's unpacking), kept separate from the reflection. */
export function s1Submission(a, id) {
  const u = a.learners[id]?.unpacking
  if (u?.submittedAt) return late(u.submittedAt, a.stageDates?.S1) ? 'late' : 'submitted'
  return pastDue(a, 'S1') ? 'missing' : 'pending'
}
/** Group planning status (shared Stage 1 fields). */
export function planningStatus(a, g) {
  if (g.planning?.submittedAt) return late(g.planning.submittedAt, a.stageDates?.S1) ? 'late' : 'submitted'
  return pastDue(a, 'S1') ? 'missing' : 'pending'
}
/**
 * Self-reflection status. S1 opens after the teacher's S1 assessment and is due by the S2 date;
 * S3 opens once the final output is recorded (no reflection date is set in the handbook).
 */
export function reflectionStatus(a, id, stage) {
  const l = a.learners[id] ?? {}
  if (stage === 'S1') {
    if (l.s1Self?.savedAt) return late(l.s1Self.savedAt, a.stageDates?.S2) ? 'done-late' : 'done'
    if (!l.s1Teacher?.savedAt) return 'locked'
    return pastDue(a, 'S2') ? 'late' : 'pending'
  }
  if (l.s3Self?.savedAt) return 'done'
  return groupOf(a, id)?.final?.recordedAt ? 'pending' : 'locked'
}
/** Peer reviews this learner has written (S3). */
export function peerStatus(a, id) {
  const g = groupOf(a, id)
  const peers = (g?.members ?? []).filter((m) => m !== id)
  const given = peers.filter((p) => a.learners[id]?.peerGiven?.[p]?.savedAt).length
  if (!g?.final?.recordedAt) return { state: 'locked', given, total: peers.length }
  return { state: given >= peers.length ? 'done' : 'pending', given, total: peers.length }
}

/** Group status per stage for the hub filters. */
export function groupStage(a, g, stage) {
  const assessed = g.members.every((m) => a.learners[m]?.[`${stage.toLowerCase()}Teacher`]?.savedAt)
  if (stage === 'S1') {
    if (!g.planning?.submittedAt) return 'waiting'
    return assessed ? 'assessed' : 'to-assess'
  }
  const out = stage === 'S2' ? g.draft : g.final
  if (!out?.recordedAt) return 'to-record'
  return assessed ? 'assessed' : 'to-assess'
}

/* ---------------------------------------------------------------- Scores */

const valueOf = (lvl) => LEVELS.find((l) => l.id === lvl)?.value ?? 0

export const MAX = {
  teacher: Object.fromEntries(ABILITIES.map((ab) => [ab.id, GROUP_PROJECT.s1Teacher[ab.id].length + GROUP_PROJECT.s2Teacher[ab.id].length + Math.max(...LEVELS.map((l) => l.value))])),
  learner: Object.fromEntries(ABILITIES.map((ab) => [ab.id, GROUP_PROJECT.s1Self[ab.id].length + GROUP_PROJECT.s3Self[ab.id].length])),
  peer: Object.fromEntries(ABILITIES.map((ab) => [ab.id, GROUP_PROJECT.s3Peer[ab.id].length])),
}

/** Peer reviews RECEIVED by a learner from group members. */
export function reviewsReceived(a, id) {
  const g = groupOf(a, id)
  return (g?.members ?? []).filter((m) => m !== id).map((m) => a.learners[m]?.peerGiven?.[id]).filter((r) => r?.savedAt)
}

/**
 * Overview scores: teacher = S1 ticks + S2 ticks + S3 level value; learner = S1 self + S3 self;
 * peer = rounded mean of the peer reviews received (OQ-PEER).
 */
export function overviewScores(a, id) {
  const l = a.learners[id] ?? {}
  const reviews = reviewsReceived(a, id)
  const hasSelf = l.s1Self?.savedAt || l.s3Self?.savedAt
  const scores = { teacher: {}, learner: {}, peer: {} }
  for (const { id: ab } of ABILITIES) {
    scores.teacher[ab] = tickCount([l.s1Teacher, l.s2Teacher], ab) + valueOf(l.s3Teacher?.levels?.[ab])
    scores.learner[ab] = hasSelf ? tickCount([l.s1Self, l.s3Self], ab) : null
    scores.peer[ab] = reviews.length ? Math.round(reviews.reduce((n, r) => n + (r.ticks?.[ab]?.length ?? 0), 0) / reviews.length) : null
  }
  return { scores, reviews: reviews.length }
}

/* ------------------------------------------------------------- Teacher to-do */

/** Today's Focus items for the teacher home (English keys + vars; caller translates). */
export function teacherActions(a) {
  if (!a || a.status !== 'live') return []
  const cls = classSpaced(a.classId)
  const base = `/group-project/${a.classId}/progress`
  const L = a.learners
  const items = []
  const groups = groupsOf(a)
  const ready = (stage, gate) => groups.filter(gate).flatMap((g) => g.members).filter((m) => !L[m]?.[`${stage}Teacher`]?.savedAt).length
  const s1 = ready('s1', (g) => g.planning?.submittedAt)
  if (s1) items.push({ title: 'Assess Stage 1 for {cls}', sub: s1 === 1 ? '1 learner ready' : '{n} learners ready', vars: { cls, n: s1 }, path: `${base}?stage=S1`, count: s1 })
  if (stageOpen(a, 'S2')) {
    const rec = groups.filter((g) => !g.draft?.recordedAt).length
    if (rec) items.push({ title: 'Record Stage 2 drafts for {cls}', sub: rec === 1 ? '1 group to record' : '{n} groups to record', vars: { cls, n: rec }, path: `${base}?stage=S2`, count: rec })
    const s2 = ready('s2', (g) => g.draft?.recordedAt)
    if (s2) items.push({ title: 'Assess Stage 2 for {cls}', sub: s2 === 1 ? '1 learner ready' : '{n} learners ready', vars: { cls, n: s2 }, path: `${base}?stage=S2`, count: s2 })
  }
  if (!a.rubricSavedAt && stageOpen(a, 'S2')) items.push({ title: 'Write the Stage 3 rubric', sub: '{title} · share it before Stage 3', vars: { cls, title: a.title }, path: `${base}/s3/rubric`, count: 1 })
  if (stageOpen(a, 'S3')) {
    const rec = groups.filter((g) => !g.final?.recordedAt).length
    if (rec) items.push({ title: 'Record Stage 3 final outputs for {cls}', sub: rec === 1 ? '1 group to record' : '{n} groups to record', vars: { cls, n: rec }, path: `${base}?stage=S3`, count: rec })
    const s3 = a.rubricSavedAt ? ready('s3', (g) => g.final?.recordedAt) : 0
    if (s3) items.push({ title: 'Assess Stage 3 for {cls}', sub: s3 === 1 ? '1 learner ready' : '{n} learners ready', vars: { cls, n: s3 }, path: `${base}?stage=S3`, count: s3 })
  }
  const ov = allLearners(a).filter((m) => L[m]?.s3Teacher?.savedAt && !L[m]?.overview?.savedAt).length
  if (ov) items.push({ title: 'Complete the Overview for {cls}', sub: ov === 1 ? '1 learner ready' : '{n} learners ready', vars: { cls, n: ov }, path: `${base}?stage=overview`, count: ov })
  return items
}

/* ------------------------------------------------------------- Drafts */

const DKEY = 'hpc-teacher:gp-drafts'
function readDrafts() { try { return JSON.parse(sessionStorage.getItem(DKEY)) || {} } catch { return {} } }

/** Unsaved form state that survives "View submission" and reloads (sessionStorage). */
export function useDraft(key, initial) {
  const [value, setValue] = useState(() => readDrafts()[key] ?? initial)
  const set = useCallback((next) => {
    setValue((prev) => {
      const v = typeof next === 'function' ? next(prev) : next
      try { sessionStorage.setItem(DKEY, JSON.stringify({ ...readDrafts(), [key]: v })) } catch { /* storage unavailable */ }
      return v
    })
  }, [key])
  const clear = useCallback(() => {
    const d = readDrafts(); delete d[key]
    try { sessionStorage.setItem(DKEY, JSON.stringify(d)) } catch { /* storage unavailable */ }
  }, [key])
  const dirty = readDrafts()[key] != null
  return [value, set, clear, dirty]
}

/* ------------------------------------------------------------- Nudges */

const NKEY = 'hpc-teacher:gp-nudges'
export const NUDGE_DAYS = 3
function readNudges() { try { return JSON.parse(localStorage.getItem(NKEY)) || {} } catch { return {} } }
/** Days until the group can be nudged again (0 = now). One nudge per 3 days. */
export function nudgeWait(key) {
  const at = readNudges()[key]
  if (!at) return 0
  const days = (Date.now() - new Date(at).getTime()) / 86400000
  return days >= NUDGE_DAYS ? 0 : Math.ceil(NUDGE_DAYS - days)
}
export function recordNudge(key) {
  try { localStorage.setItem(NKEY, JSON.stringify({ ...readNudges(), [key]: new Date().toISOString() })) } catch { /* storage unavailable */ }
}

/** Save guard: spinner ~600 ms, fails with a toast (draft kept) when offline. */
export function saveWithGuard({ setLoading, showToast, t, run }) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    showToast(t('You are offline. Your draft is kept — try again when you are back online.'), 'error')
    return
  }
  setLoading(true)
  setTimeout(() => { run(); setLoading(false) }, 600)
}

export { emit }
