import { DEFAULT_CLASSES } from '../../store/AppStore.jsx'

/* ------------------------------------------------------------ Activity types */

export const ACTIVITY_TYPES = [
  {
    id: 'know-myself',
    title: 'Know Myself',
    desc: 'Guide learners to fill Reflection & Planning surveys for their goals, time management, future plans.',
    route: (c) => `/know-myself/${c}`,
  },
  {
    id: 'group-project',
    title: 'Group project',
    desc: 'Set up a shared project for learners to compete in teams',
    route: (c) => `/group-project/${c}`,
  },
  {
    id: 'pbi',
    title: 'Problem Based Enquiry',
    desc: 'Set up tasks for individual learners that require them to propose solutions to a contemporary, real-world issue',
    route: (c) => `/pbi/${c}`,
  },
  {
    id: 'classroom',
    title: 'Class interaction',
    desc: 'Plan and observe a classroom discussion, debate, lab experiment, simulation, role-play, dramatic presentation.',
    route: (c) => `/classroom/${c}`,
  },
]

/* ------------------------------------------------------ Section A surveys */

const DEFAULT_STEPS = [
  'Explain that no answer is right or wrong and that this is not marked.',
  'Share one example from your own life to get them started.',
  'Tell them the deadline you are about to set.',
]

export const SURVEYS = [
  {
    id: 'A1',
    title: 'Information & Interests',
    why: 'A reflection on what students notice, enjoy learning about, and find interesting.',
    questions: 10,
    competency: 'Self-aware',
    steps: ['Ask a few students to name one thing they enjoy doing outside school.', ...DEFAULT_STEPS],
    sample: [
      { q: 'What do you enjoy doing most in your free time?', a: 'Drawing and painting' },
      { q: 'Which subject do you look forward to the most?', a: 'Science' },
      { q: 'Tell us about something new you learnt recently.', a: 'How rainwater harvesting works in our school.' },
    ],
  },
  {
    id: 'A2',
    title: 'Goal setting',
    why: 'A reflection on the goals students set for themselves this year and how they plan to reach them.',
    questions: 6,
    competency: 'Self-mgmt',
    steps: ['Ask the class what a “goal” means to them. Collect a few answers.', ...DEFAULT_STEPS],
    sample: [
      { q: 'What is one goal you want to achieve this year?', a: 'Improve my maths marks' },
      { q: 'What will you do every week to reach it?', a: 'Practise 10 problems' },
      { q: 'Who can help you reach this goal?', a: 'My elder sister and my maths teacher.' },
    ],
  },
  {
    id: 'A3',
    title: 'Time Management',
    why: 'A reflection on how students spend and plan their time, and what they might want to change.',
    questions: 8,
    competency: 'Self-mgmt',
    steps: [
      'Ask the class how many hours they think they spend on the phone each day. Compare guesses.',
      'Explain that no answer is right or wrong and that this is not marked.',
      'Point out that the reflection asks what they would like to change, not just what they do.',
      'Tell them the deadline you are about to set.',
    ],
    sample: [
      { q: 'How many hours do you spend on a phone or TV each day?', a: '2–3 hours' },
      { q: 'When do you usually do your homework?', a: 'After dinner' },
      { q: 'What is one thing you would like to change about how you use your time?', a: 'I want to finish homework before playing so I can sleep earlier.' },
    ],
  },
  {
    id: 'A4',
    title: 'Plans after school',
    why: 'A reflection on what students hope to do after school and what they need to get there.',
    questions: 7,
    competency: 'Planning',
    steps: ['Ask two or three students what they want to become. Keep it light.', ...DEFAULT_STEPS],
    sample: [
      { q: 'What would you like to do after finishing school?', a: 'Study nursing' },
      { q: 'Which subjects will help you with this?', a: 'Biology' },
      { q: 'Who have you talked to about this plan?', a: 'My aunt, who works at the district hospital.' },
    ],
  },
  {
    id: 'A5',
    title: 'Accomplishments',
    why: 'A reflection on what students are proud of, inside and outside the classroom.',
    questions: 5,
    competency: 'Self-aware',
    steps: ['Share something small you were proud of recently.', ...DEFAULT_STEPS],
    sample: [
      { q: 'What is one thing you did this year that you are proud of?', a: 'Won the school quiz' },
      { q: 'What helped you do it?', a: 'Practice with friends' },
      { q: 'What would you like to accomplish next?', a: 'I want to represent my school at the district quiz.' },
    ],
  },
  {
    id: 'A6',
    title: 'Skills for life',
    why: 'A reflection on the everyday skills students use and the ones they want to build.',
    questions: 8,
    competency: 'Life skills',
    steps: ['Ask the class to name a skill they use at home every day.', ...DEFAULT_STEPS],
    sample: [
      { q: 'Which skill do you use most at home?', a: 'Cooking' },
      { q: 'Which skill would you like to learn next?', a: 'Basic computer skills' },
      { q: 'How will this skill help you?', a: 'I can help my father keep accounts for his shop.' },
    ],
  },
  {
    id: 'A7',
    title: 'Online course selection',
    short: 'Online courses',
    disabled: true, // greyed out on the Know Myself list
    why: 'A reflection on which online course students want to take and why.',
    questions: 3,
    competency: 'Planning',
    steps: DEFAULT_STEPS,
    sample: [
      { q: 'Which subject area interests you most right now?', a: 'Environmental Studies' },
      { q: 'Pick a course from the approved catalogue for that area.', a: 'Environmental Sustainability' },
      { q: 'Why did you pick this course?', a: 'I want to understand climate change better since my village floods every monsoon.' },
    ],
  },
  {
    id: 'A8',
    title: 'Health survey',
    why: 'A reflection on students’ everyday habits around sleep, food and exercise.',
    questions: 9,
    competency: 'Well-being',
    steps: ['Ask the class how many hours they usually sleep.', ...DEFAULT_STEPS],
    sample: [
      { q: 'How many hours do you sleep on a school night?', a: '7 hours' },
      { q: 'How often do you play a sport or exercise?', a: '3–4 days a week' },
      { q: 'What is one healthy habit you want to start?', a: 'Drinking more water during the school day.' },
    ],
  },
]

export const getSurvey = (id) => SURVEYS.find((s) => s.id === id) ?? SURVEYS[2]

/* --------------------------------------------------------------- Students */

const FIRST = ['Aarav', 'Aditi', 'Aman', 'Anjali', 'Ankit', 'Divya', 'Gaurav', 'Isha', 'Kunal', 'Kavya', 'Manish', 'Megha', 'Nitin', 'Neha', 'Pranav', 'Pooja', 'Rahul', 'Riya', 'Sahil', 'Tanvi']
const LAST = ['Thakur', 'Rana', 'Negi', 'Chauhan', 'Pathania', 'Jamwal', 'Katoch', 'Guleria', 'Sharma', 'Dogra']

/** Up to 60 learners (class sizes are 40–60); the first 12 have submitted. */
export const STUDENTS = Array.from({ length: 60 }, (_, i) => ({
  id: `s${i + 1}`,
  name: `${FIRST[i % FIRST.length]} ${LAST[(i + Math.floor(i / FIRST.length) * 3) % LAST.length]}`,
  apaar: `APAAR …${1000 + i}`,
  submitted: i < 12,
}))

export const getStudent = (id) => STUDENTS.find((s) => s.id === id) ?? STUDENTS[0]

/* ------------------------------------------------------------ Classes */

export function findClass(classes, classId) {
  const c = classes.find((x) => x.id === classId) ?? DEFAULT_CLASSES.find((x) => x.id === classId)
  if (c) return c
  const m = /^(\d+)([A-Z]?)$/i.exec(classId ?? '')
  return { id: classId, grade: m?.[1] ?? classId, section: m?.[2] ?? '', students: 40 }
}

/* ------------------------------------------------ Live activity (flow-local) */

const LIVE_KEY = 'hpc-teacher:know-myself-live'

/** { [classId]: { surveyId, deadline: 'YYYY-MM-DD', startedAt: 'YYYY-MM-DD' } } */
export function getLiveMap() {
  try { return JSON.parse(localStorage.getItem(LIVE_KEY)) ?? {} } catch { return {} }
}
export function getLive(classId) {
  return getLiveMap()[classId] ?? null
}
export function setLive(classId, data) {
  try { localStorage.setItem(LIVE_KEY, JSON.stringify({ ...getLiveMap(), [classId]: data })) } catch { /* ignore */ }
}

/* ------------------------------------------------------------ Dates */

export const fmtLong = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
export const fmtShort = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
export const todayIso = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
