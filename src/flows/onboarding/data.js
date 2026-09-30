/** Mock data for the onboarding / home / profile flow. */

export const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी' },
]

/**
 * Grade/section options offered in Add / Remove classes (kit T02-04/05). Grades 9–12 only;
 * 11 and 12 carry a stream (Science / Humanities / Commerce). Sizes 40–60; 9A = 46 (multi-stage roster).
 */
export const STREAMS = ['Science', 'Humanities', 'Commerce']
export const GRADE_OPTIONS = [
  { id: '9A', grade: '9', section: 'A', students: 46 },
  { id: '9B', grade: '9', section: 'B', students: 44 },
  { id: '10A', grade: '10', section: 'A', students: 42 },
  { id: '10B', grade: '10', section: 'B', students: 48 },
  { id: '11A', grade: '11', section: 'A', stream: 'Science', students: 50 },
  { id: '11B', grade: '11', section: 'B', stream: 'Humanities', students: 52 },
  { id: '11C', grade: '11', section: 'C', stream: 'Commerce', students: 45 },
  { id: '12A', grade: '12', section: 'A', stream: 'Science', students: 58 },
  { id: '12B', grade: '12', section: 'B', stream: 'Humanities', students: 41 },
  { id: '12C', grade: '12', section: 'C', stream: 'Commerce', students: 55 },
]

/** "Grade 9-A" / "Grade 11-B · Humanities" (translated when `t` is passed). */
export const gradeLabel = (c, t = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k])) => {
  const base = t('Grade {grade}-{section}', { grade: c.grade, section: c.section })
  return c.stream ? `${base} · ${t(c.stream)}` : base
}

/** "Class 9 A" / "Class 11 B - Humanities" (kit T01-01 card title). */
export const classTitle = (c, t = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k])) => {
  const base = t('Class {grade} {section}', { grade: c.grade, section: c.section })
  return c.stream ? `${base} - ${t(c.stream)}` : base
}

/** Class card fill by grade (kit T01-01); white badge with the grade in kit red. */
export const GRADE_FILL = { 9: '#bfc3fb', 10: '#ffc1d6', 11: '#fff1d0', 12: '#cbedf4' }
export const cardFill = (c) => GRADE_FILL[c.grade] ?? '#f1efec'

/** Extra profile fields not held in the global store. */
export const PROFILE = {
  gender: 'Female',
  dob: '26/12/1965',
  age: 61,
  nationality: 'Indian',
  category: 'General',
  phone: '8976578968',
  bloodGroup: 'B+ve',
  pen: 'Placeholder',
  apaarId: '12345453',
  udise: '123515287584',
  village: 'Mandi',
  state: 'Himachal Pradesh',
  cluster: 'Gahar',
  pincode: '123435',
}

/** Onboarding answers kept across the sign-in steps (module state, prototype only). */
export const onboarding = { userType: null, teacherId: '', languagePicked: false }
