import { useSyncExternalStore } from 'react'
import { INITIAL_ACTIVITIES } from './data.js'

/**
 * Student app state, shared by every student flow and saved to localStorage.
 *   const { activities, groupCreated } = useStudentState()
 *   updateActivity('gp-water', { state: 'reflected' })
 *   getActivity('a4')
 */
const KEY = 'hpc-student:state'
const fresh = () => ({ activities: INITIAL_ACTIVITIES.map((a) => ({ ...a })), groupCreated: true })

let state = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (saved?.activities) return saved
  } catch { /* storage unavailable */ }
  return fresh()
})()
const listeners = new Set()

function set(next) {
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  listeners.forEach((l) => l())
}

export function useStudentState() {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l) }, () => state)
}

export const getActivity = (id) => state.activities.find((a) => a.id === id)

export function updateActivity(id, patch) {
  set({ ...state, activities: state.activities.map((a) => (a.id === id ? { ...a, ...patch } : a)) })
}

/** Demo helpers (used by the /s/demo state switcher). */
export function setStudentState(patch) { set({ ...state, ...patch }) }
export function resetStudentState() { set(fresh()) }
