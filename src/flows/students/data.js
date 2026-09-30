/** Mock data for the "View Student's HPC" + class overview flow. */

import { ROSTER, activitiesFor, groupOf } from '../../hpc/store.js'
import { DEFAULT_CLASSES } from '../../store/AppStore.jsx'
import { getService } from '../../platform/services.js'

// Data owned by other micro-frontends, read through the service registry (no cross-MFE imports)
const getLive = (classId) => getService('know-myself.getLive')(classId)
const getSurvey = (id) => getService('know-myself.getSurvey')(id)
const getClassroomLive = (classId) => getService('classroom.getLive')(classId)

// 9A is the shared multi-stage roster (46 learners, src/hpc/store.js) so the teacher and
// student apps agree; the other classes get a deterministic roster of Himachali names.
const FIRST_F = ['Aditi', 'Anjali', 'Divya', 'Isha', 'Kavya', 'Kritika', 'Megha', 'Neha', 'Nisha', 'Pallavi', 'Payal', 'Pooja', 'Ritika', 'Shivani', 'Simran', 'Sneha', 'Swati', 'Tanvi', 'Tanya', 'Komal']
const FIRST_M = ['Aarav', 'Abhishek', 'Akash', 'Aman', 'Ankit', 'Arjun', 'Ayush', 'Deepak', 'Gaurav', 'Harsh', 'Kunal', 'Lakshay', 'Manish', 'Mohit', 'Nitin', 'Pranav', 'Rahul', 'Rohit', 'Sahil', 'Varun']
const LAST = ['Thakur', 'Rana', 'Negi', 'Chauhan', 'Pathania', 'Jamwal', 'Katoch', 'Guleria', 'Sharma', 'Verma', 'Dogra', 'Kanwar', 'Chandel', 'Sood', 'Bhardwaj', 'Kaundal', 'Parmar', 'Dhiman', 'Minhas', 'Jaswal']
const FEMALE_9A = new Set(['Riya', 'Pooja', 'Megha', 'Neha', 'Kavya', 'Isha', 'Tanvi', 'Sneha', 'Pallavi', 'Simran', 'Anjali', 'Kritika', 'Shivani', 'Aditi', 'Payal', 'Ritika', 'Komal', 'Nisha', 'Divya', 'Swati', 'Muskan', 'Tanya'])

function rosterRows(cls) {
  if (cls.id === '9A') {
    return ROSTER.map((r) => [r.studentId, r.name, '9A', FEMALE_9A.has(r.name.split(' ')[0]) ? 'Female' : 'Male', r.id])
  }
  const seedN = [...cls.id].reduce((a, c) => a + c.charCodeAt(0), 0)
  return Array.from({ length: cls.students }, (_, i) => {
    const female = (i + seedN) % 2 === 0
    const first = (female ? FIRST_F : FIRST_M)[(i * 7 + seedN) % 20]
    const last = LAST[(i * 3 + seedN) % LAST.length]
    return [String(123460000 + seedN * 100 + i), `${first} ${last}`, cls.id, female ? 'Female' : 'Male', null]
  })
}
const RAW = DEFAULT_CLASSES.flatMap(rosterRows)

export const classLabel = (classId) => {
  const m = /^(\d+)([A-Z])$/.exec(classId ?? '')
  return m ? `${m[1]} ${m[2]}` : classId
}

// Small deterministic hash so each student's report looks different but stable
function seed(str) {
  let h = 0
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return (n) => {
    h = (h * 1103515245 + 12345) >>> 0
    return h % n
  }
}

const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

export const STUDENTS = RAW.map(([id, name, classId, gender, learnerId], i) => {
  const [grade, section] = [classId.slice(0, -1), classId.slice(-1)]
  return {
    id,
    learnerId, // multi-stage learner id (9A only), e.g. 's-1000'
    name,
    initials: initials(name),
    classId,
    grade,
    section,
    roll: String(i + 1).padStart(2, '0'),
    gender,
    dob: `${String(10 + (i % 18)).padStart(2, '0')}/0${1 + (i % 9)}/20${10 + (i % 3)}`,
    age: 16 - (i % 3),
    nationality: 'Indian',
    category: ['General', 'OBC', 'SC', 'General'][i % 4],
    phone: `89765${String(78968 + i * 137).slice(-5)}`,
    bloodGroup: ['B+ve', 'O+ve', 'A+ve', 'AB+ve'][i % 4],
    pen: `PEN${String(40021 + i * 7)}`,
    apaar: String(12345453 + i * 91),
    school: {
      udise: '123515287584',
      name: 'Varana Primary School',
      village: 'Mandi',
      block: 'Mandi',
      district: 'Mandi',
      state: 'Himachal Pradesh',
      pincode: '175001',
    },
    family: {
      mother: { name: `Smita ${name.split(' ')[1] ?? 'Kumar'}`, education: '10th pass', occupation: 'Housewife' },
      father: { name: `Susheel ${name.split(' ')[1] ?? 'Kumar'}`, education: '12th pass', occupation: 'Salaried Employee' },
      sibling: { name: `Ravi ${name.split(' ')[1] ?? 'Kumar'}`, age: 12 + (i % 6) },
    },
  }
})

export const getStudent = (id) => STUDENTS.find((s) => s.id === id)

export const studentsInClass = (classId) => STUDENTS.filter((s) => s.classId === classId)

/* ------------------------------------------------------------ HPC report */

const SUBJECTS = ['Maths', 'English', 'Science 1', 'Hindi', 'Science 2']
const MONTHS = ['January', 'February', 'March', 'April']
export const ASSESSMENTS = ['FA1', 'FA2', 'FA3', 'SA1', 'SA2']

const gradeFor = (pct) => (pct >= 90 ? 'A' : pct >= 75 ? 'B' : pct >= 60 ? 'C' : pct >= 40 ? 'D' : 'E')

export function buildReport(student) {
  const r = seed(student.id)
  const months = MONTHS.map((m) => {
    const present = 18 + r(8)
    return { month: m, present, total: 25, pct: Math.round((present / 25) * 100) }
  })
  const present = months.reduce((a, m) => a + m.present, 0) + 10
  const attendance = { present, total: 110, pct: Math.round((present / 110) * 100), months, trend: 'up' }

  // Subject scores per assessment (out of 40)
  const bySubject = {}
  for (const sub of SUBJECTS) {
    bySubject[sub] = ASSESSMENTS.map(() => (sub === 'Science 2' ? 10 + r(12) : 26 + r(15)))
  }
  const subjectsFor = (assessment) => {
    const idx = ASSESSMENTS.indexOf(assessment)
    return SUBJECTS.map((name) => {
      const score = bySubject[name][idx]
      const prev = idx > 0 ? bySubject[name][idx - 1] : score
      const pct = Math.round((score / 40) * 100)
      return { name, score, pct, grade: gradeFor(pct), trend: score >= prev ? 'up' : 'down' }
    })
  }
  const current = subjectsFor('FA3')
  const overall = Math.round(current.reduce((a, s) => a + s.pct, 0) / current.length)
  const passing = current.filter((s) => s.pct > 40).length

  const fa = [70 + r(30), 45 + r(25), 80 + r(19), null]
  const sa = [70 + r(30), 45 + r(25), 80 + r(19), null]

  return {
    attendance,
    summary: { overall, grade: gradeFor(overall), passing, subjects: SUBJECTS.length },
    subjectsFor,
    charts: [
      { key: 'fa', title: 'FA Performance', labels: ['FA1', 'FA2', 'FA3', 'FA4'], values: fa },
      { key: 'sa', title: 'SA Performance', labels: ['SA1', 'SA2', 'SA3', 'SA4'], values: sa },
    ],
    goal: {
      // Rendered as t('I aim to score 80% marks in {subject} subject this year', { subject: t(goal.subject) })
      subject: ['Hindi', 'Maths', 'English', 'Science'][r(4)],
      status: ['On Track', 'On Track', 'Needs Focus'][r(3)],
    },
  }
}

export const HEALTH_SURVEY = [
  { emoji: '🌤️', title: 'General wellbeing', body: 'Try a simple daily routine to feel steadier on the harder days.' },
  { emoji: '🥗', title: 'Eating & drinking', body: "Keep your meals regular and water close by — it's fuelling your day." },
  { emoji: '😴', title: 'Sleep & rest', body: 'Set a regular bedtime and short breaks to wake up feeling fresh.' },
  { emoji: '💬', title: 'Emotional well-being', body: "Keep noticing what's helping you feel healthy and well." },
]

export const GOAL_SURVEY_ROWS = [
  { emoji: '📚', title: 'Subject difficulty', body: 'Ask your teacher for support in the subjects that need it right now.' },
  { emoji: '🎯', title: 'Target %', body: 'Aim for a few marks better than last time - a reachable step.' },
  { emoji: '🗂️', title: 'Weekly effort', body: "Pick a smaller amount you can sustain instead of a big number you can't." },
]
export const GOAL_SURVEY_SUBJECTS = ['English', 'Hindi']

/* ----------------------------------------------------- Class live activities */

// Non-multi-stage live activities (mock). kind maps to the progress route: /<kind>/:classId/progress
export const LIVE_ACTIVITIES = {
  '9A': [
    { id: 'km-1', kind: 'know-myself', label: 'Section A', title: 'TIME MANAGEMENT', short: 'A3 · Time Management', image: 'time', start: '15 Aug 2026', end: '15 Sep 2026' },
  ],
  '10A': [
    { id: 'km-2', kind: 'know-myself', label: 'Section A', title: 'TIME MANAGEMENT', short: 'A3 · Time Management', image: 'time', start: '10 Sep 2026', end: '10 Oct 2026' },
  ],
  '11B': [],
  '12A': [],
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const isoToDay = (iso) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return `${String(d).padStart(2, '0')} ${MONTHS_SHORT[m - 1]} ${y}`
}
const MS_KIND = { B: { kind: 'group-project', label: 'Group Project', badge: 'GP' }, C: { kind: 'pbi', label: 'Problem Based Enquiry', badge: 'PB' } }

/**
 * Every live activity for a class: the handbook multi-stage records (src/hpc/store.js, Part B / C)
 * plus the flow-local mocks above. Used by the Class Overview and to block removing a class (kit T02-03).
 * `ms` is passed in by React callers (useMultiStage()) so the list re-renders on events.
 */
export function liveActivitiesFor(classId, ms) {
  const multi = (ms ? Object.values(ms.activities ?? {}).filter((a) => a.classId === classId) : activitiesFor(classId))
    .filter((a) => a.status === 'live' && MS_KIND[a.type])
    .map((a) => ({
      id: a.id, ...MS_KIND[a.type], title: a.title, short: a.title, multiStage: a,
      start: isoToDay(a.events?.[0]?.at?.slice(0, 10)), end: isoToDay(a.stageDates?.S3),
    }))
  const mocks = LIVE_ACTIVITIES[classId] ?? []
  const km = getLive(classId)
  const kmSurvey = km && getSurvey(km.surveyId)
  const kmItem = kmSurvey && !mocks.some((m) => m.short?.startsWith(`${kmSurvey.id} `)) && {
    id: `km-${classId}`, kind: 'know-myself', label: 'Section A', title: kmSurvey.title.toUpperCase(), short: `${kmSurvey.id} · ${kmSurvey.title}`,
    image: 'time', start: isoToDay(km.startedAt), end: isoToDay(km.deadline),
  }
  const ci = getClassroomLive(classId)
  const ciItem = ci && { id: `ci-${classId}`, kind: 'classroom', label: 'Classroom Interaction', title: ci.title, short: ci.title, badge: 'CI', start: isoToDay(ci.activityDate), end: isoToDay(ci.deadline) }
  return [...multi, ...mocks, ...[kmItem, ciItem].filter(Boolean)]
}

/**
 * Has this learner submitted the CURRENT stage of a multi-stage activity?
 * B: their group's Stage 1 planning / Stage 2 draft / Stage 3 final is in; C: their own plan / summary / revision.
 */
export function hasSubmitted(a, learnerId) {
  if (!a || !learnerId) return false
  const stage = a.currentStage
  if (a.type === 'B') {
    const g = groupOf(a, learnerId)
    return !!(stage === 'S1' ? g?.planning?.submittedAt : stage === 'S2' ? g?.draft?.recordedAt : g?.final?.recordedAt)
  }
  const l = a.learners?.[learnerId]
  return !!(stage === 'S1' ? l?.plan?.submittedAt : stage === 'S2' ? l?.summary?.submittedAt : l?.revision?.resubmittedAt)
}
