/**
 * Section B (Group Project) and Section D (Classroom Interaction) content for the student app.
 * English only here; screens translate at render with t().
 */
import { GROUPS } from '../../student/data.js'

/** The prototype's "today" (matches the board: 12 Sep 2026). */
export const PROTO_TODAY = new Date(2026, 8, 12)
export const TODAY_LABEL = '12 Sep'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "15 Sep" / "15 Sep 2026, 11:59 PM" → Date (year 2026 when missing). */
export function parseDay(s) {
  const m = /(\d{1,2})\s+([A-Za-z]{3})/.exec(s || '')
  if (!m) return null
  const y = /\b(20\d\d)\b/.exec(s)?.[1] ?? 2026
  return new Date(Number(y), MONTHS.indexOf(m[2]), Number(m[1]))
}
export const fmtDay = (date) => `${date.getDate()} ${MONTHS[date.getMonth()]}`

/** Full deadline text shown on the deadline row. */
export const deadlineText = (a) => a.deadline ?? `${a.due} 2026, 11:59 PM`

/** Days left before the deadline, from the prototype's today. */
export function daysLeft(a) {
  const d = parseDay(a.deadline ?? a.due)
  return d ? Math.round((d - PROTO_TODAY) / 86400000) : null
}

/** Last day of the 1-week late reflection window. */
export function lateUntil(a) {
  if (a.lateUntil) return a.lateUntil
  const d = parseDay(a.deadline ?? a.due)
  if (!d) return ''
  d.setDate(d.getDate() + 7)
  return fmtDay(d)
}

/** Members to peer-review (everyone in the group except you). */
export const reviewees = (a) => (GROUPS[a.groupId]?.members ?? []).filter((m) => !m.you)
export const firstName = (name) => name.split(' ')[0]

/* ------------------------------------------------------------ Screen copy */

export const CONTENT = {
  'gp-water': {
    why: 'Working as a team on a real problem in your village builds planning, observation and communication skills.',
    before: 'Read the student handbook with your group. Share tasks fairly, and keep notes and photos from every stage. Your teacher records the final submission.',
    stages: [
      { name: 'Plan', body: 'Decide what to study and who does what', done: true },
      { name: 'Observe', body: 'Visit water sources and record what you see', done: true },
      { name: 'Final', body: 'Present your findings as a chart or model', done: false },
    ],
    handbook: true,
  },
  'ci-plastic': {
    why: 'Taking part in class activities helps you listen, share ideas and respect other points of view.',
    before: 'Read the student handbook to prepare before the preparation deadline. Your teacher observes you in class; there is nothing to submit.',
    handbook: true,
  },
}
export const DEFAULT_CONTENT = {
  B: {
    why: 'Working as a team on a real problem builds planning, observation and communication skills.',
    before: 'Read the student handbook with your group. Share tasks fairly, and keep notes and photos from every stage. Your teacher records the final submission.',
    stages: [
      { name: 'Plan', body: 'Decide what to study and who does what', done: false },
      { name: 'Observe', body: 'Collect information and record what you see', done: false },
      { name: 'Final', body: 'Present your findings as a chart or model', done: false },
    ],
    handbook: false,
  },
  D: {
    why: 'Taking part in class activities helps you listen, share ideas and respect other points of view.',
    before: 'Read the student handbook to prepare before the preparation deadline. Your teacher observes you in class; there is nothing to submit.',
    handbook: false,
  },
}
export const contentFor = (a) => ({ ...DEFAULT_CONTENT[a.section], ...CONTENT[a.id] })

/* -------------------------------------------------------------- Questions */

const FREQ = ['Always', 'Often', 'Sometimes', 'Rarely']

/** Self-reflection: B = 6 questions, D = 5 questions. */
export const SELF_REFLECTION = {
  B: [
    { q: 'How well did you understand the goal of the project?', hint: 'Think about what your group set out to find.', options: ['I understood it fully', 'I understood most of it', 'I understood some of it', 'I was not sure about it'] },
    { q: 'How much did you contribute to your group’s work?', hint: 'Think about all three stages.', options: ['I led tasks and helped others', 'I did my share every time', 'I helped some of the time', 'I found it hard to contribute'] },
    { q: 'How well did you listen to your group members?', options: ['I always listened and asked questions', 'I listened most of the time', 'I listened some of the time', 'I found it hard to listen'] },
    { q: 'How well did you complete the tasks given to you?', options: ['On time and carefully', 'On time, with some help', 'Late, but I finished them', 'I could not finish them'] },
    { q: 'What did you learn most from this project?', options: ['How to plan and share work', 'How to observe and record facts', 'How to present what we found', 'How to solve problems together'] },
    { q: 'How do you feel about your group’s final work?', options: ['Very proud of it', 'Happy with it', 'It could be better', 'Not happy with it'] },
  ],
  D: [
    { q: 'How well did you back your points with facts?', options: ['Every point had evidence', 'Most points had evidence', 'A few points had evidence', 'I mostly shared opinions'] },
    { q: 'How well did you prepare before the activity?', options: ['I read the handbook and made notes', 'I read the handbook', 'I prepared a little', 'I did not prepare'] },
    { q: 'How well did you listen to the other side?', options: ['I listened carefully every time', 'I listened most of the time', 'I listened some of the time', 'I found it hard to listen'] },
    { q: 'How confident did you feel while speaking?', options: ['Very confident', 'Mostly confident', 'A little nervous', 'Very nervous'] },
    { q: 'How well did you work with your group?', options: ['We planned and shared every part', 'We shared most parts', 'We shared a few parts', 'I worked mostly alone'] },
  ],
}

/** Peer review (one questionnaire per member). `{name}` = the member's first name. */
export const PEER_REVIEW = {
  B: [
    { q: 'How much did {name} contribute to the group’s work?', options: ['A lot', 'A fair share', 'A little', 'Very little'] },
    { q: 'How well did {name} finish the tasks they took on?', options: ['Always on time', 'Mostly on time', 'Sometimes late', 'Often did not finish'] },
    { q: 'How often did {name} listen to others’ ideas?', options: FREQ },
    { q: 'How often did {name} help others in the group?', options: FREQ },
    { q: 'How often did {name} share useful ideas?', options: FREQ },
  ],
  D: [
    { q: 'How well did {name} prepare for the activity?', options: ['Very well', 'Well', 'A little', 'Not at all'] },
    { q: 'How respectfully did {name} respond to the other side?', options: FREQ },
    { q: 'How clearly did {name} share their points?', options: ['Very clearly', 'Clearly', 'Somewhat clearly', 'Not clearly'] },
    { q: 'How often did {name} back points with facts?', options: FREQ },
    { q: 'How well did {name} work with your side?', options: ['Very well', 'Well', 'A little', 'Not at all'] },
  ],
}

/** Minutes shown on the step rows. */
export const REFLECTION_MIN = { B: 5, D: 4 }

/** Base route for an activity in this flow. */
export const basePath = (a) => (a.section === 'B' ? `/s/project/${a.id}` : `/s/class/${a.id}`)
