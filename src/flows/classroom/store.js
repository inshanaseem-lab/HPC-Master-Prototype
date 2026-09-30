import { useSyncExternalStore } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore, DEFAULT_CLASSES } from '../../store/AppStore.jsx'
import { TOPICS } from './data.js'

/**
 * Tiny module store for the Classroom Interaction flow.
 * State per class: { typeId, topicId, grouped, groups, deadline, activityDate, live }
 * plus evaluations[classId][studentId] and nudged[classId][studentId].
 */
const KEY = 'hpc-teacher:classroom'
const DEFAULT_CLASS_STATE = {
  typeId: null,
  topicId: TOPICS[0].id,
  grouped: null,
  groups: [],
  deadline: '2026-09-15',
  activityDate: '2026-09-21',
  live: false,
}

let state = (() => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
})()
state = { classes: {}, evaluations: {}, nudged: {}, ...state }

const listeners = new Set()
function set(updater) {
  state = updater(state)
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  listeners.forEach((l) => l())
}
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l) }
const snapshot = () => state

export function useClassroomStore() {
  return useSyncExternalStore(subscribe, snapshot)
}

export const getClassState = (s, classId) => ({ ...DEFAULT_CLASS_STATE, ...(s.classes[classId] || {}) })

export function updateClass(classId, patch) {
  set((s) => ({ ...s, classes: { ...s.classes, [classId]: { ...getClassState(s, classId), ...patch } } }))
}

export function saveEvaluation(classId, studentId, evaluation) {
  set((s) => ({
    ...s,
    evaluations: { ...s.evaluations, [classId]: { ...(s.evaluations[classId] || {}), [studentId]: evaluation } },
  }))
}

export function markNudged(classId, studentId) {
  set((s) => ({ ...s, nudged: { ...s.nudged, [classId]: { ...(s.nudged[classId] || {}), [studentId]: true } } }))
}

/** Current class (from route param) + its interaction state. */
export function useClassroom() {
  const { classId } = useParams()
  const { classes } = useAppStore()
  const s = useClassroomStore()
  const cls =
    classes.find((c) => c.id === classId) ||
    DEFAULT_CLASSES.find((c) => c.id === classId) || {
      id: classId,
      grade: String(classId).replace(/\D/g, ''),
      section: String(classId).replace(/\d/g, ''),
      students: 40,
    }
  return { classId, cls, ci: getClassState(s, classId), store: s }
}

/** In-progress (unsaved) evaluations, kept in memory between rubric → feedback screens. */
export const drafts = {}
export const draftFor = (classId, studentId) => {
  const k = `${classId}/${studentId}`
  if (!drafts[k]) drafts[k] = { ticks: {}, feedback: '', intervention: '' }
  return drafts[k]
}

/** Live Classroom Interaction for a class (read outside React, e.g. home action items / remove-class check). */
export function getClassroomLive(classId) {
  const ci = getClassState(state, classId)
  if (!ci.live) return null
  const topic = TOPICS.find((x) => x.id === ci.topicId) ?? TOPICS[0]
  return { ...ci, title: topic.name }
}
