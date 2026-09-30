import { useSyncExternalStore } from 'react'
import { GROUP_PROJECT } from './config.js'

/**
 * Shared, cross-role store for the handbook's multi-stage activities (Part B and Part C).
 * Teacher and student screens read and write the SAME records, so a teacher action (e.g.
 * assessing Stage 1) visibly unlocks the student's next step in the prototype.
 *
 * Every write that changes what the other role sees must go through `emit(activityId, event, patchFn)`
 * with a NAMED event (e.g. 'B.S1.teacher_evaluated'). Events are logged with who/when so the UI can
 * show "what moved it here" and an audit trail.
 *
 * Record shapes (both activities live under class 9A for the demo):
 *
 * B · Group Project  (id 'gp-water')
 *   { id, type: 'B', classId, title, status: 'draft'|'live'|'closed',
 *     setup: { subjects[], goals[], competencies[], pedagogies[], prompt, output },
 *     stageDates: { S1, S2, S3 },                         // ISO dates, strictly increasing
 *     currentStage: 'S1'|'S2'|'S3'|'overview'|'closed',  // what the class is on
 *     rubricS3: { awareness: { B, P, A }, sensitivity: {…}, creativity: {…} },   // teacher-written descriptors
 *     groups: { [groupId]: { id, name, members: [learnerId],
 *        planning: { schedule[], resources[], roles: { [learnerId]: role }, barriers[], editedBy, editedAt, submittedAt },
 *        draft:    { kind, files[], link, note, recordedAt },      // S2, recorded by teacher
 *        final:    { kind, files[], link, note, recordedAt } } },   // S3, recorded by teacher
 *     learners: { [learnerId]: {
 *        unpacking: { questions, know, need, submittedAt },
 *        s1Teacher: { ticks: { awareness: [i…], … }, comments, intervention, savedAt },
 *        s1Self:    { ticks, savedAt },
 *        s2Teacher: { ticks, comments, intervention, savedAt },
 *        s3Teacher: { levels: { awareness: 'B'|'P'|'A', … }, comments, savedAt },
 *        s3Self:    { ticks, savedAt },
 *        peerGiven: { [peerId]: { ticks, savedAt } },            // reviews THIS learner wrote
 *        overview:  { final: { awareness: 'B'|'P'|'A', … }, savedAt },
 *        post:      { answers: { [prompt]: text }, teacherComments, savedAt } } },
 *     events: [{ name, at, by, target }] }
 *
 * C · Problem Based Enquiry  (id 'pbi-energy')
 *   { id, type: 'C', classId, title, status, setup: { …as B, prompt, hypothesis },
 *     stageDates: { S1, S2, S3 }, currentStage,
 *     params: { S1: { awareness: [text, text], … }, S2: {…}, S3: {…} },  // 2 teacher-chosen per ability per stage
 *     pairs: { [learnerId]: peerId },                                     // S3 peer pairs (preferably different topics)
 *     learners: { [learnerId]: {
 *        topic, hypothesis,
 *        plan:      { answers: { [field]: text }, submittedAt },                     // S1 draft plan
 *        s1Teacher: { ticks, comments, intervention, savedAt },
 *        s1Self:    { ticks, problems, help, savedAt },
 *        instrument:{ kind: 'questionnaire'|'interview', items[], targetGroup, justification },
 *        roster:    [{ name, role, date, mode }],                                   // ≥ 10
 *        summary:   { answers: { [field]: text }, files[], submittedAt },           // S2
 *        s2Teacher: { ticks, comments, intervention, savedAt },
 *        s2Self:    { ticks, appreciation, savedAt },
 *        peerGiven: { ticks, appreciation, savedAt },                               // review this learner wrote for their pair
 *        revision:  { note, files[], resubmittedAt },                               // S3
 *        s3Teacher: { ticks, comments, intervention, savedAt },
 *        overview:  { final, savedAt }, post: { answers, teacherComments, savedAt } } },
 *     events: [] }
 *
 * `ticks` everywhere = indexes into the statement list for that stage/ability (config.js), plus
 * for C teacher stages the chosen extra params are appended after the fixed statements.
 */

const KEY = 'hpc-multistage:v1'
export const STUDENT_ID = 's-1000' // Riya Thakur, the sample student
export const TEACHER = 'Anjali Sharma'

/* ------------------------------------------------------------------ Roster (9A) */

// Group 1 and Group 2 match the design kit (T10-10) and the student board (Riya's Group 2)
const NAMED = [
  ['Aarav Pathania', 1001], ['Abhishek Jamwal', 1002], ['Ankit Jamwal', 1004], ['Ankit Pathania', 1006], ['Ayush Jamwal', 1007],
  ['Riya Thakur', 1000], ['Aman Verma', 1003], ['Pooja Kumari', 1022], ['Sahil Chauhan', 1031], ['Megha Rana', 1037],
  ['Neha Sharma', 1019], ['Arjun Rana', 1005], ['Kavya Negi', 1024], ['Rohit Kumar', 1029],
]
const MORE = [
  'Isha Katoch', 'Tanvi Guleria', 'Kunal Thakur', 'Sneha Dogra', 'Vivek Chandel', 'Pallavi Sood', 'Rahul Bhardwaj',
  'Simran Kaundal', 'Deepak Rana', 'Anjali Minhas', 'Harsh Parmar', 'Kritika Negi', 'Nitin Kanwar', 'Shivani Thakur',
  'Manish Dhiman', 'Aditi Verma', 'Gaurav Katoch', 'Payal Chauhan', 'Sumit Rana', 'Ritika Sharma', 'Yash Pathania',
  'Komal Guleria', 'Varun Jaswal', 'Nisha Rawat', 'Akash Sen', 'Divya Thakur', 'Mohit Negi', 'Swati Kapoor',
  'Lakshay Rana', 'Muskan Sharma', 'Pranav Dogra', 'Tanya Bhatia',
]
const used = new Set(NAMED.map(([, n]) => n))
let next = 1008
const numbered = [...NAMED, ...MORE.map((name) => { while (used.has(next)) next += 1; used.add(next); return [name, next++] })]
export const ROSTER = numbered.map(([name, n]) => ({
  id: `s-${n}`,
  name,
  idMasked: `…${n}`,
  studentId: String(123450000 + n),
  initials: name.split(' ').map((p) => p[0]).join('').slice(0, 2),
}))
export const learner = (id) => ROSTER.find((r) => r.id === id)

/** Groups of 5 (min 3); the last group absorbs leftovers — 46 learners → 8 × 5 + 1 × 6. Riya (s-1000) is in Group 2. */
function makeGroups() {
  const ids = ROSTER.map((r) => r.id)
  const groups = {}
  let g = 1
  for (let i = 0; i < ids.length; i += 5) {
    const rest = ids.length - i
    const members = rest < 5 + GROUP_PROJECT.minGroupSize ? ids.slice(i) : ids.slice(i, i + 5)
    groups[`G${g}`] = { id: `G${g}`, name: `Group ${g}`, members, planning: null, draft: null, final: null }
    g += 1
    if (members.length > 5) break
  }
  return groups
}

const PBI_TOPICS = [
  'Clean energy for my school',
  'Getting more people to use public transport',
  'Attracting visitors to a local heritage site',
  'Protecting our local stream',
]

function fresh() {
  const today = '2026-09-10'
  const b = {
    id: 'gp-water', type: 'B', classId: '9A', title: 'Water in my village', status: 'live',
    setup: {
      subjects: ['Sustainability', 'Social Science'], goals: ['CG-2', 'CG-8'], competencies: ['C-2.3', 'C-8.5'],
      pedagogies: ['Experiential learning', 'Cross-cutting theme integrated'],
      prompt: 'How can our village use and save water better? Study the water sources around you and propose a plan.',
      output: 'A village water map with a 5-point action plan, presented to the class',
    },
    stageDates: { S1: '2026-09-15', S2: '2026-09-22', S3: '2026-09-30' },
    currentStage: 'S1', rubricS3: structuredClone(GROUP_PROJECT.s3RubricTemplate),
    groups: makeGroups(), learners: Object.fromEntries(ROSTER.map((r) => [r.id, {}])),
    events: [{ name: 'B.live', at: `${today}T09:00`, by: TEACHER }],
  }
  const c = {
    id: 'pbi-energy', type: 'C', classId: '9A', title: 'Clean energy for my school', status: 'live',
    setup: {
      subjects: ['Science', 'Sustainability'], goals: ['CG-5', 'CG-9'], competencies: ['C-5.1', 'C-5.4', 'C-9.2'],
      pedagogies: ['Experiential learning', 'Technology-integrated'],
      prompt: 'Find out how your community could switch to cleaner energy, collect evidence from at least 10 people, and propose a solution.',
      hypothesis: '',
    },
    stageDates: { S1: '2026-09-16', S2: '2026-09-24', S3: '2026-10-02' },
    currentStage: 'S1',
    params: { S1: {}, S2: {}, S3: {} },
    pairs: {},
    learners: Object.fromEntries(ROSTER.map((r, i) => [r.id, { topic: PBI_TOPICS[i % PBI_TOPICS.length] }])),
    events: [{ name: 'C.live', at: `${today}T09:00`, by: TEACHER }],
  }
  seedDemo(b, c)
  return { activities: { [b.id]: b, [c.id]: c } }
}

/**
 * Demo progress so both apps have something to show on first open (fixed demo date 10 Sep 2026):
 * B — Groups 1 and 3 have submitted Stage 1 planning; Group 1's first two learners are assessed.
 *     Riya's Group 2 has not started, so the student walk-through begins at Stage 1.
 * C — 20 learners submitted the Stage 1 draft plan; 8 of them are assessed. Riya has not started.
 */
function seedDemo(b, c) {
  const at = '2026-09-09T16:30'
  for (const gid of ['G1', 'G3']) {
    const g = b.groups[gid]
    g.planning = {
      schedule: ['Day 1 — List water sources in our ward', 'Day 2 — Visit the kuhl and the hand pump', 'Day 3 — Interview 5 households', 'Day 4 — Draw the water map'],
      resources: ['Chart paper and colours', 'Phone camera', 'Village map from the panchayat'],
      roles: Object.fromEntries(g.members.map((m, i) => [m, ['Leader', 'Note-taker', 'Photographer', 'Map maker', 'Presenter', 'Researcher'][i % 6]])),
      barriers: ['Rain may stop field visits', 'Some households may not want to talk'],
      editedBy: g.members[0], editedAt: at, submittedAt: at,
    }
    g.members.forEach((m) => {
      b.learners[m].unpacking = {
        questions: 'Where does our village get its water? Which sources are drying up, and why?',
        know: 'We use the kuhl for fields and the hand pump for drinking water.',
        need: 'How much water each household uses and how clean the sources are.',
        submittedAt: at,
      }
    })
    b.events.push({ name: 'B.S1.submitted', at, by: g.members[0], target: gid })
  }
  b.groups.G1.members.slice(0, 2).forEach((m, i) => {
    b.learners[m].s1Teacher = {
      ticks: { awareness: [0, 1, 2, 3].slice(0, 3 + i), sensitivity: [0, 2, 4], creativity: [0, 1] },
      comments: 'Clear plan and good questions.', intervention: 'Encourage quieter members to lead a field visit.', savedAt: at,
    }
    b.events.push({ name: 'B.S1.teacher_evaluated', at, by: TEACHER, target: m })
  })

  ROSTER.slice(0, 22).filter((r) => r.id !== STUDENT_ID).slice(0, 20).forEach((r, i) => {
    const l = c.learners[r.id]
    l.plan = {
      answers: {
        'What do I know?': 'Our school uses diesel generators during power cuts.',
        'What do I need to find out?': 'Whether families would support solar panels and what they cost.',
        'What do I need to do?': 'Ask teachers, parents and the gram panchayat.',
        'Research task schedule': 'Day 1–2 questionnaire · Day 3–6 responses · Day 7 analysis',
        'Evidence collection to support/negate the hypothesis': 'Questionnaire with 10 respondents',
        'Analysis and synthesis': 'Tally answers and look for patterns',
        Discussions: 'Share findings with my class',
        'Conclusion (tentative solution)': 'Rooftop solar for the school building',
      },
      submittedAt: at,
    }
    c.events.push({ name: 'C.S1.submitted', at, by: r.id, target: r.id })
    if (i < 8) {
      l.s1Teacher = { ticks: { awareness: [0, 1], sensitivity: [0, 2], creativity: [1] }, comments: 'Good start.', intervention: '', savedAt: at }
      c.events.push({ name: 'C.S1.teacher_evaluated', at, by: TEACHER, target: r.id })
    }
  })
}

let state = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (saved?.activities) return saved
  } catch { /* storage unavailable */ }
  return fresh()
})()
const listeners = new Set()
function commit(next) {
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  listeners.forEach((l) => l())
}

/** React hook: the whole multi-stage state, or one activity when an id is passed. */
export function useMultiStage(id) {
  const s = useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l) }, () => state)
  return id ? s.activities[id] : s
}
export const getMultiStage = (id) => state.activities[id]

/**
 * The only way to change a multi-stage activity. `mutate` receives a deep copy to edit in place.
 *   emit('gp-water', 'B.S1.teacher_evaluated', (a) => { a.learners[id].s1Teacher = {...} }, { by: TEACHER, target: id })
 */
export function emit(id, event, mutate, { by = TEACHER, target } = {}) {
  const a = structuredClone(state.activities[id])
  mutate?.(a)
  a.events = [...(a.events ?? []), { name: event, at: new Date().toISOString(), by, target }]
  commit({ ...state, activities: { ...state.activities, [id]: a } })
}

/** Most recent event for a learner/group (to show "what moved it here"). */
export function lastEvent(a, target) {
  return [...(a?.events ?? [])].reverse().find((e) => !target || e.target === target)
}

export function resetMultiStage() { commit(fresh()) }

/** Group that contains a learner (Part B). */
export function groupOf(a, learnerId) {
  return Object.values(a?.groups ?? {}).find((g) => g.members.includes(learnerId))
}

/** Sum of ticks for one ability across the given stage records. */
export function tickCount(records, ability) {
  return records.reduce((n, r) => n + (r?.ticks?.[ability]?.length ?? 0), 0)
}

/** Create (or replace) an activity record, e.g. when a teacher makes a new Group Project live. */
export function createActivity(record, event) {
  const a = { events: [], ...structuredClone(record) }
  if (event) a.events.push({ name: event, at: new Date().toISOString(), by: TEACHER })
  commit({ ...state, activities: { ...state.activities, [a.id]: a } })
  return a.id
}

/** All activities of a type for a class (newest last). */
export function activitiesFor(classId, type) {
  return Object.values(state.activities).filter((a) => a.classId === classId && (!type || a.type === type))
}
export { makeGroups as defaultGroups }
