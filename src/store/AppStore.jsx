import { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Global prototype state shared by every flow.
 * Flow-specific state should live inside that flow's folder.
 */
const AppStore = createContext(null)

export const TEACHER = {
  name: 'Anjali Sharma',
  code: '120921004',
  teacherId: '123456789',
  school: 'VARANA PRIMARY SCHOOL',
  schoolId: '123456789',
  block: 'Dholka',
  district: 'Dharamshala',
}

// Classes the teacher has already added (populated home state, kit T01-01).
// Model: { id, grade: '9'–'12', section, stream? (grades 11–12 only), students: 40–60 }.
// 9A matches the multi-stage roster in src/hpc/store.js (46 learners).
export const DEFAULT_CLASSES = [
  { id: '9A', grade: '9', section: 'A', students: 46 },
  { id: '10A', grade: '10', section: 'A', students: 42 },
  { id: '11B', grade: '11', section: 'B', stream: 'Humanities', students: 52 },
  { id: '12A', grade: '12', section: 'A', stream: 'Science', students: 58 },
]

/** A saved class fits the current model (grades 9–12, 40–60 learners, streams only for 11/12, 9A = 46). */
const validClass = (c) =>
  c && typeof c.id === 'string' && ['9', '10', '11', '12'].includes(String(c.grade)) &&
  Number.isInteger(c.students) && c.students >= 40 && c.students <= 60 &&
  (['11', '12'].includes(String(c.grade)) ? typeof c.stream === 'string' : !c.stream) &&
  (c.id !== '9A' || c.students === 46)

/** Old saved classes (7–10, fixed 40 learners, no streams) are replaced by the demo defaults. */
function migrateClasses(saved) {
  if (!Array.isArray(saved)) return []
  if (saved.length === 0) return []
  return saved.every(validClass) ? saved : DEFAULT_CLASSES
}

const KEY = 'hpc-teacher:'
function load(k, fallback) {
  try { const v = localStorage.getItem(KEY + k); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
function save(k, v) {
  try { localStorage.setItem(KEY + k, JSON.stringify(v)) } catch { /* storage unavailable */ }
}

export function AppStoreProvider({ children }) {
  const [language, setLanguage] = useState(() => load('language', 'en'))
  // Starts empty so onboarding lands on the "set up your workspace" home
  const [classes, setClasses] = useState(() => migrateClasses(load('classes', [])))
  useEffect(() => {
    save('language', language)
    // Screen readers pick pronunciation from <html lang>, so keep it in sync with the app language
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en'
  }, [language])
  useEffect(() => save('classes', classes), [classes])
  const [toast, setToast] = useState(null)

  const value = useMemo(
    () => ({
      teacher: TEACHER,
      language, setLanguage,
      classes, setClasses,
      resetDemo: () => { setClasses([]); setLanguage('en') },
      loadDemoClasses: () => setClasses(DEFAULT_CLASSES),
      toast,
      showToast: (message, tone = 'success') => {
        const id = Date.now()
        setToast({ id, message, tone })
        setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), 2400)
      },
    }),
    [language, classes, toast],
  )
  return <AppStore.Provider value={value}>{children}</AppStore.Provider>
}

export const useAppStore = () => useContext(AppStore)
