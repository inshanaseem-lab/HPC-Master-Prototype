import { useSyncExternalStore } from 'react'
import { PBI, ABILITIES } from '../../hpc/config.js'
import { useMultiStage, learner, ROSTER } from '../../hpc/store.js'
import { DEMO_TODAY } from '../../hpc/components.jsx'

/**
 * Teacher side of Part C · Problem Based Enquiry.
 *
 * All activity data lives in the shared multi-stage store (src/hpc/store.js) and is changed only via
 * emit() with named events. This file holds (1) the in-progress SETUP draft (per class, kept in
 * sessionStorage until the teacher makes it live) and (2) read helpers that turn a C record into
 * per-learner, per-stage statuses for the teacher screens.
 */

/* ============================================================ Setup draft */

const KEY = 'hpc-teacher:pbi-setup:v2'
export const STAGES = PBI.stages // [{ id: 'S1', label, name, … }]
export const STAGE_IDS = ['S1', 'S2', 'S3']

export const DEFAULT_TOPICS = [
  'Clean energy for my school',
  'Getting more people to use public transport',
  'Attracting visitors to a local heritage site',
  'Protecting our local stream',
]

const emptyParams = () => ({ S1: {}, S2: {}, S3: {} })

export function blankDraft() {
  return {
    title: 'Clean energy for my school',
    setup: { subjects: [], goals: [], competencies: [], pedagogies: [], prompt: '', output: '', hypothesis: '' },
    topics: [...DEFAULT_TOPICS],
    topicMode: 'assigned', // 'assigned' | 'choose' | 'self'
    assignMode: 'random', // when assigned: 'bulk' | 'random' | 'manual'
    bulkTopic: DEFAULT_TOPICS[0],
    assignments: {}, // learnerId -> topic (manual)
    hypothesisFor: [], // learnerIds who get the teacher's hypothesis (struggling learners)
    params: emptyParams(), // { S1: { awareness: [text, text] } }
    stageDates: { S1: '', S2: '', S3: '' },
    dirty: false,
  }
}

/** Pre-fill a draft from an existing live record (9A 'pbi-energy'), so re-running setup updates it. */
export function draftFromActivity(a) {
  const d = blankDraft()
  if (!a) return d
  return {
    ...d,
    title: a.title ?? d.title,
    setup: { ...d.setup, ...(a.setup ?? {}) },
    topics: a.setup?.topics?.length ? a.setup.topics : d.topics,
    topicMode: a.setup?.topicMode ?? d.topicMode,
    params: { ...emptyParams(), ...(a.params ?? {}) },
    stageDates: { ...d.stageDates, ...(a.stageDates ?? {}) },
    hypothesisFor: Object.entries(a.learners ?? {}).filter(([, l]) => l.hypothesis).map(([id]) => id),
  }
}

let drafts = (() => {
  try { return JSON.parse(sessionStorage.getItem(KEY)) ?? {} } catch { return {} }
})()
const listeners = new Set()
function commit(next) {
  drafts = next
  try { sessionStorage.setItem(KEY, JSON.stringify(drafts)) } catch { /* storage unavailable */ }
  listeners.forEach((l) => l())
}
const blankCache = new Map()
function getDraft(classId) {
  if (drafts[classId]) return drafts[classId]
  if (!blankCache.has(classId)) blankCache.set(classId, blankDraft())
  return blankCache.get(classId)
}
export function useDraft(classId) {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l) }, () => getDraft(classId))
}
export function updateDraft(classId, fn, { markDirty = true } = {}) {
  const cur = getDraft(classId)
  commit({ ...drafts, [classId]: { ...cur, ...fn(cur), ...(markDirty ? { dirty: true } : {}) } })
}
export function startDraft(classId, activity) {
  commit({ ...drafts, [classId]: draftFromActivity(activity) })
}
export function hasDraft(classId) { return !!drafts[classId] }
export function clearDraft(classId) {
  const { [classId]: _drop, ...rest } = drafts // eslint-disable-line no-unused-vars
  blankCache.delete(classId)
  commit(rest)
}

/* ============================================================ Validation */

export const MAX_OWN_PARAM = 120

/** Every stage × ability has exactly 2 extra params, each non-empty and ≤ 120 chars. */
export function paramsComplete(params, stage) {
  return ABILITIES.every((a) => {
    const p = params?.[stage]?.[a.id] ?? []
    return p.length === PBI.extraParamsPerAbility && p.every((x) => x && x.trim() && x.length <= MAX_OWN_PARAM)
  })
}
export const allParamsComplete = (params) => STAGE_IDS.every((s) => paramsComplete(params, s))

/** '' when ok, else an English error key. */
export function datesError(d) {
  if (!d.S1 || !d.S2 || !d.S3) return 'Pick a date for every stage.'
  if (!(d.S1 < d.S2)) return 'Stage 2 must end after Stage 1.'
  if (!(d.S2 < d.S3)) return 'Stage 3 must end after Stage 2.'
  return ''
}

/* ============================================================ Activity helpers */

/** Live C activity for a class (newest last), reactive. */
export function useActivity(classId) {
  const s = useMultiStage()
  const list = Object.values(s.activities).filter((a) => a.type === 'C' && a.classId === classId)
  return list.filter((a) => a.status !== 'draft').at(-1) ?? null
}

/** Learner ids in the activity, in roster order. */
export function learnerIds(a) {
  const ids = Object.keys(a?.learners ?? {})
  const order = new Map(ROSTER.map((r, i) => [r.id, i]))
  return ids.sort((x, y) => (order.get(x) ?? 999) - (order.get(y) ?? 999))
}
export const nameOf = (id) => learner(id)?.name ?? id
export const initialsOf = (id) => learner(id)?.initials ?? id.slice(-2)

/** Teacher tick statements for a stage/ability: fixed ones first, then the 2 chosen params. */
export function statementsFor(a, stage, ability) {
  const fixed = PBI.fixed[stage][ability]
  const extra = a?.params?.[stage]?.[ability] ?? []
  return { list: [...fixed, ...extra], extraStart: fixed.length }
}

const REC = {
  S1: { sub: 'plan', subAt: 'submittedAt', refl: 's1Self', teacher: 's1Teacher' },
  S2: { sub: 'summary', subAt: 'submittedAt', refl: 's2Self', teacher: 's2Teacher' },
  S3: { sub: 'revision', subAt: 'resubmittedAt', refl: 'peerGiven', teacher: 's3Teacher' },
}
/** Status of one learner in one stage: { submitted, reflected, assessed, peerReviewed }. */
export function stageStatus(a, id, stage) {
  const l = a?.learners?.[id] ?? {}
  if (stage === 'overview') {
    return { submitted: !!l.s3Teacher?.savedAt, reflected: !!l.post?.savedAt, assessed: !!l.overview?.savedAt }
  }
  const r = REC[stage]
  const peerReviewer = reviewerOf(a, id)
  return {
    submitted: !!l[r.sub]?.[r.subAt],
    reflected: !!l[r.refl]?.savedAt,
    assessed: !!l[r.teacher]?.savedAt,
    peerReviewed: stage === 'S3' ? !!(peerReviewer && a.learners[peerReviewer]?.peerGiven?.savedAt) : undefined,
  }
}
export function stageCounts(a, stage) {
  const ids = learnerIds(a)
  const st = ids.map((id) => stageStatus(a, id, stage))
  return {
    total: ids.length,
    submitted: st.filter((s) => s.submitted).length,
    waiting: st.filter((s) => s.submitted && !s.assessed).length,
    assessed: st.filter((s) => s.assessed).length,
    reflected: st.filter((s) => s.reflected).length,
    notSubmitted: st.filter((s) => !s.submitted).length,
  }
}

const ORDER = ['S1', 'S2', 'S3', 'overview', 'closed']
export const stageIndex = (s) => ORDER.indexOf(s)
export const isOpen = (a, stage) => stageIndex(a?.currentStage ?? 'S1') >= stageIndex(stage)

/** Stepper model for the hub. */
export function stepperStages(a, t, d) {
  const cur = a?.currentStage ?? 'S1'
  const rows = STAGES.map((s) => {
    const c = stageCounts(a, s.id)
    let state = 'locked'
    if (isOpen(a, s.id)) {
      if (c.submitted > 0 && c.assessed === c.submitted && c.notSubmitted === 0) state = 'evaluated'
      else if (s.id === cur) state = a.stageDates?.[s.id] && a.stageDates[s.id] < DEMO_TODAY && c.notSubmitted > 0 ? 'late' : 'open'
      else state = 'submitted'
    }
    const note = state === 'locked'
      ? t('Ends {date}', { date: d(a.stageDates?.[s.id] ?? '') })
      : t('{s} of {n} submitted · {m} assessed · ends {date}', { s: c.submitted, n: c.total, m: c.assessed, date: d(a.stageDates?.[s.id] ?? '') })
    return { id: s.id, label: s.label, name: s.name, state, note }
  })
  const ov = stageCounts(a, 'overview')
  rows.push({
    id: 'overview', label: 'Overview', name: 'Final levels',
    state: isOpen(a, 'S3') ? (ov.assessed && ov.assessed === ov.total ? 'evaluated' : 'open') : 'locked',
    note: isOpen(a, 'S3') ? t('{m} of {n} final levels saved', { m: ov.assessed, n: ov.total }) : t('Opens with Stage 3'),
  })
  return rows
}

/* ============================================================ Peer pairs */

/** pairs[X] = the learner whose revised draft X reviews. The reviewer of Y is X with pairs[X] === Y. */
export function reviewerOf(a, id) {
  return Object.entries(a?.pairs ?? {}).find(([, target]) => target === id)?.[0]
}

/** Groups (pairs, one trio if odd) → pairs map (cyclic inside a trio). */
export function groupsToPairs(groups) {
  const pairs = {}
  groups.forEach((g) => g.forEach((id, i) => { pairs[id] = g[(i + 1) % g.length] }))
  return pairs
}
/** pairs map → groups (for editing). */
export function pairsToGroups(pairs) {
  const seen = new Set()
  const groups = []
  Object.keys(pairs ?? {}).forEach((start) => {
    if (seen.has(start)) return
    const g = []
    let cur = start
    while (cur && !seen.has(cur)) { seen.add(cur); g.push(cur); cur = pairs[cur] }
    groups.push(g)
  })
  return groups
}
/** Chunk into pairs; an odd count makes the last group a trio. */
export function chunkPairs(ids) {
  const groups = []
  for (let i = 0; i < ids.length; i += 2) groups.push(ids.slice(i, i + 2))
  if (groups.length > 1 && groups.at(-1).length === 1) groups.at(-2).push(groups.pop()[0])
  return groups
}
/** Auto-pair preferring different topics: interleave learners by topic, then pair neighbours. */
export function autoPair(a, ids) {
  const byTopic = {}
  ids.forEach((id) => { const tp = a.learners[id]?.topic || '—'; (byTopic[tp] ??= []).push(id) })
  const buckets = Object.values(byTopic).sort((x, y) => y.length - x.length)
  const out = []
  // Take from the largest remaining bucket that differs from the last pick
  while (out.length < ids.length) {
    buckets.sort((x, y) => y.length - x.length)
    const lastTopic = out.length ? a.learners[out.at(-1)]?.topic : null
    const pick = (out.length % 2 === 1 ? buckets.find((b) => b.length && a.learners[b[0]]?.topic !== lastTopic) : null) ?? buckets.find((b) => b.length)
    out.push(pick.shift())
  }
  return chunkPairs(out)
}
export const sameTopic = (a, g) => g.length > 1 && g.every((id) => (a.learners[id]?.topic || '') === (a.learners[g[0]]?.topic || ''))

/* ============================================================ Scores (Overview) */

const tick = (r, ab) => r?.ticks?.[ab]?.length ?? 0
export function scoresFor(a, id) {
  const l = a.learners[id] ?? {}
  const reviewer = reviewerOf(a, id)
  const peer = reviewer ? a.learners[reviewer]?.peerGiven : null
  const out = { teacher: {}, learner: {}, peer: {} }
  const max = { teacher: {}, learner: {}, peer: {} }
  ABILITIES.forEach(({ id: ab }) => {
    out.teacher[ab] = tick(l.s1Teacher, ab) + tick(l.s2Teacher, ab) + tick(l.s3Teacher, ab)
    max.teacher[ab] = STAGE_IDS.reduce((n, s) => n + PBI.fixed[s][ab].length + PBI.extraParamsPerAbility, 0)
    out.learner[ab] = l.s1Self || l.s2Self ? tick(l.s1Self, ab) + tick(l.s2Self, ab) : null
    max.learner[ab] = PBI.self.S1[ab].length + PBI.self.S2[ab].length
    out.peer[ab] = peer ? tick(peer, ab) : null
    max.peer[ab] = PBI.peer[ab].length
  })
  return { scores: out, max }
}

/* ============================================================ Nudges (3-day rule) */

export const NUDGE_GAP_DAYS = 3
const DAY = 86400000
/** When the learner can next be nudged for this stage (null = now). */
export function nextNudge(a, id, stage) {
  const at = a?.nudges?.[stage]?.[id]
  if (!at) return null
  const next = new Date(new Date(at).getTime() + NUDGE_GAP_DAYS * DAY)
  return next > new Date() ? next : null
}

/** "Class 9 A" / "Class 12 A - Science" label parts for registry strings. */
export const classWords = (classId) => classId.replace(/^(\d+)(.*)$/, '$1 $2')
