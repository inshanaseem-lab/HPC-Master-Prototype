/**
 * Part B · Group Project — the handbook's 3-stage flow for the student app.
 * Pure helpers: learner progress, reflection windows, demo "today", local drafts.
 * All shared data lives in the cross-role store (src/hpc/store.js); this file never writes to it.
 */
import { useSyncExternalStore } from 'react'
import { GROUP_PROJECT } from '../../hpc/config.js'
import { groupOf, learner } from '../../hpc/store.js'
import { DEMO_TODAY, formatShort } from '../../hpc/components.jsx'

export const ABILITY_IDS = ['awareness', 'sensitivity', 'creativity']
export const msBase = (id) => `/s/project/${id}`

/* ------------------------------------------------------------ Demo today */

const TODAY_KEY = 'hpc-bd:demoToday'
let today = (() => { try { return localStorage.getItem(TODAY_KEY) || DEMO_TODAY } catch { return DEMO_TODAY } })()
const todayListeners = new Set()
export const getToday = () => today
export function setDemoToday(iso) {
  today = iso || DEMO_TODAY
  try { iso ? localStorage.setItem(TODAY_KEY, iso) : localStorage.removeItem(TODAY_KEY) } catch { /* storage unavailable */ }
  todayListeners.forEach((l) => l())
}
export const useToday = () => useSyncExternalStore((l) => { todayListeners.add(l); return () => todayListeners.delete(l) }, () => today)

export function addDays(iso, n) {
  const d = new Date(iso + 'T00:00')
  d.setDate(d.getDate() + n)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
/** "10 Sep" from an ISO timestamp or date. */
export const shortOf = (isoish) => (isoish ? formatShort(String(isoish).slice(0, 10)) : '')

/* ---------------------------------------------------------- Local drafts */
// Individual drafts (unpacking, post-project reflection) stay on this device until submitted.
// The group plan is shared, so its draft goes through emit() instead (planningDraft on the group).

const draftKey = (id, me, kind) => `hpc-bd:draft:${id}:${me}:${kind}`
export function readDraft(id, me, kind) {
  try { return JSON.parse(localStorage.getItem(draftKey(id, me, kind))) } catch { return null }
}
export function writeDraft(id, me, kind, value) {
  try { localStorage.setItem(draftKey(id, me, kind), JSON.stringify(value)) } catch { /* storage unavailable */ }
}
export function clearDrafts() {
  try { Object.keys(localStorage).filter((k) => k.startsWith('hpc-bd:draft:')).forEach((k) => localStorage.removeItem(k)) } catch { /* storage unavailable */ }
}

/* ------------------------------------------------------------- Windows */

/**
 * Reflection windows. Stage 1 self-reflection is due by the Stage 2 date; Stage 3 self-reflection,
 * peer review and the post-project reflection are due by the Stage 3 date. Each has a 1-week late window.
 */
export function windowOf(a, stage, now = today) {
  const due = stage === 'S1' ? a.stageDates?.S2 : a.stageDates?.S3
  if (!due) return { state: 'open', due: null, lateUntil: null }
  const lateUntil = addDays(due, 7)
  return { due, lateUntil, state: now <= due ? 'open' : now <= lateUntil ? 'late' : 'closed' }
}

/* ------------------------------------------------------------ Progress */

export const unpackFilled = (u) => Boolean(u && ['questions', 'know', 'need'].every((k) => u[k]?.trim()))

/** Everything the student screens need to know about one learner in one Group Project. */
export function progressOf(a, me, now = today) {
  const g = groupOf(a, me)
  const L = a.learners?.[me] ?? {}
  const peers = (g?.members ?? []).filter((m) => m !== me)
  const given = peers.filter((p) => L.peerGiven?.[p]?.savedAt)
  const w1 = windowOf(a, 'S1', now)
  const w3 = windowOf(a, 'S3', now)
  const localUnpack = readDraft(a.id, me, 'unpacking')
  const p = {
    g, L, peers, given, w1, w3,
    s1Submitted: Boolean(g?.planning?.submittedAt),
    unpackDone: Boolean(L.unpacking?.submittedAt),
    unpackReady: unpackFilled(L.unpacking) || unpackFilled(localUnpack),
    s1Assessed: Boolean(L.s1Teacher?.savedAt),
    s1SelfDone: Boolean(L.s1Self?.savedAt),
    draft: g?.draft?.recordedAt ? g.draft : null,
    final: g?.final?.recordedAt ? g.final : null,
    s3SelfDone: Boolean(L.s3Self?.savedAt),
    peerDone: peers.length > 0 && given.length === peers.length,
    postDone: Boolean(L.post?.savedAt),
    s1Late: a.stageDates?.S1 && now > a.stageDates.S1,
  }
  p.s1SelfOpen = p.s1Assessed && !p.s1SelfDone && w1.state !== 'closed'
  p.s3Open = Boolean(p.final) && w3.state !== 'closed'
  p.s3Closed = Boolean(p.final) && w3.state === 'closed'

  if (!p.s1Submitted) p.step = p.unpackReady ? 'plan' : 'unpack'
  else if (!p.unpackDone) p.step = 'unpack'
  else if (p.s1SelfOpen) p.step = 's1-self'
  else if (p.final && !p.postDone && p.s3Open) p.step = !p.s3SelfDone ? 's3-self' : !p.peerDone ? 'peers' : 'post'
  else if (p.postDone || p.s3Closed) p.step = 'done'
  else p.step = !p.s1Assessed ? 'waiting-s1' : 'waiting-s3'
  return p
}

export const STEP_PATH = {
  unpack: '/unpack', plan: '/plan', 's1-self': '/s1-reflect', 's3-self': '/s3-reflect', peers: '/peers', post: '/post',
}
export const pathFor = (a, p) => msBase(a.id) + (STEP_PATH[p.step] ?? '')

/** Stepper rows (English keys; notes are built in the screen so they can be translated with vars). */
export function stageStates(a, p) {
  const s1 = p.s1Assessed ? 'evaluated' : p.s1Submitted ? 'submitted' : p.s1Late ? 'late' : 'open'
  const s2 = p.L.s2Teacher?.savedAt ? 'evaluated' : p.draft ? 'submitted' : p.s1Submitted ? 'open' : 'locked'
  let s3 = 'locked'
  if (p.L.s3Teacher?.savedAt) s3 = 'evaluated'
  else if (p.final) s3 = p.postDone ? 'submitted' : p.w3.state === 'closed' ? 'closed' : p.w3.state === 'late' ? 'late' : 'open'
  else if (p.draft) s3 = 'open'
  return GROUP_PROJECT.stages.map((s, i) => ({ ...s, state: [s1, s2, s3][i] }))
}

export const nameOf = (id) => learner(id)?.name ?? id
export const firstNameOf = (id) => nameOf(id).split(' ')[0]

/** Sample Stage 1 teacher assessment used by the demo panel (never shown to the student). */
export const DEMO_S1_TEACHER = {
  ticks: { awareness: [0, 1, 2], sensitivity: [0, 1, 3, 4], creativity: [1, 2] },
  comments: 'Thoughtful guiding questions.',
  intervention: 'Ask Riya to lead one field visit.',
}

/** Timestamp on the demo calendar (demo "today" + the current clock time), so dates line up with stage dates. */
export function stamp() {
  const n = new Date()
  return `${today}T${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`
}
