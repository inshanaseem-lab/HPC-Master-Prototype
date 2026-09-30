import { useCallback, useSyncExternalStore } from 'react'

/**
 * Flow-local draft for Group Project setup, keyed by class id (sessionStorage, so a reload
 * mid-setup keeps the teacher's work). Nothing reaches students until "Make Project live",
 * which writes the activity to the shared multi-stage store (src/hpc/store.js).
 */
const KEY = 'hpc-teacher:group-setup:v2'
export const EMPTY_SETUP = { subjects: [], goals: [], competencies: [], pedagogies: [], pedagogyOther: '', prompt: '', output: '' }
const DEFAULT = { title: '', setup: EMPTY_SETUP, discussed: false, groupSize: 5, groups: [], stageDates: { S1: '', S2: '', S3: '' }, seeded: false }

let state = (() => {
  try { return JSON.parse(sessionStorage.getItem(KEY)) || {} } catch { return {} }
})()
const listeners = new Set()

function notify() {
  try { sessionStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  listeners.forEach((l) => l())
}
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l) }

export function useGroupSetup(classId) {
  const snap = useSyncExternalStore(subscribe, () => state[classId])
  const value = snap ?? DEFAULT
  const update = useCallback(
    (patch) => {
      const prev = state[classId] ?? DEFAULT
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch }
      state = { ...state, [classId]: next }
      notify()
    },
    [classId],
  )
  return [value, update]
}

export function clearGroupSetup(classId) {
  const { [classId]: _, ...rest } = state
  state = rest
  notify()
}
