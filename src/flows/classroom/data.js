/** Mock data for the Classroom Interaction flow (HPC Section D). */

export const INTERACTION_TYPES = [
  { id: 'discussion', name: 'Classroom discussion', meta: 'Any subject · 1 period', periods: '1', why: 'Learners share ideas, listen to each other and build on what others say.' },
  { id: 'debate', name: 'Organised debate', meta: 'Social science, language, environment · 1–2 periods', periods: '1–2', why: 'Learners argue a position with evidence and respond to the other side respectfully.' },
  { id: 'roleplay', name: 'Simulation or role play', meta: 'Social science, language · 1–2 periods', periods: '1–2', why: 'Learners step into a role to understand a situation from another point of view.' },
  { id: 'lab', name: 'Lab experiment', meta: 'Science, maths · 1–2 periods', periods: '1–2', why: 'Learners test an idea, observe carefully and explain what they found.' },
  { id: 'digital', name: 'Digital learning activity', meta: 'Any subject · needs devices', periods: '1', why: 'Learners use a digital tool to explore, create and share their learning.' },
  { id: 'drama', name: 'Dramatic presentation', meta: 'Language, arts · 2 periods', periods: '2', why: 'Learners express ideas through performance, voice and movement.' },
]

export const TOPICS = [
  {
    id: 'water',
    name: 'Water in my village',
    subject: 'Social Science',
    outcome: 'Investigates a local issue using evidence',
    competency: 'Argumentation · critical thinking',
    pedagogy: 'Structured debate, two sides',
    rubric: 'Awareness · Creativity · Sensitivity',
    stages: 'plan → observe → final',
  },
  {
    id: 'dam',
    name: 'Himachal Dam',
    subject: 'Geography',
    outcome: 'Weighs the benefits and costs of a development project',
    competency: 'Reasoning · perspective taking',
    pedagogy: 'Role play of stakeholders',
    rubric: 'Awareness · Creativity · Sensitivity',
    stages: 'plan → observe → final',
  },
  {
    id: 'waste',
    name: 'Waste at our school',
    subject: 'Environmental Studies',
    outcome: 'Proposes a practical solution to a shared problem',
    competency: 'Collaboration · problem solving',
    pedagogy: 'Guided classroom discussion',
    rubric: 'Awareness · Creativity · Sensitivity',
    stages: 'plan → observe → final',
  },
]

export const MATERIALS = [
  { id: 'handbook', name: 'Teacher handbook', meta: 'PDF · how to run all three stages' },
  { id: 'worksheet', name: 'Student Worksheet', meta: 'PDF · print or share in class' },
]

/** Rubric questions for evaluation (one page each). */
export const RUBRIC = [
  {
    id: 'awareness',
    label: 'Awareness',
    statements: [
      'Names the specific local problem the project addresses',
      'Explains why the problem matters to their community',
      'Connects the problem to a wider cause',
      'References at least one source of information used',
    ],
  },
  {
    id: 'creativity',
    label: 'Creativity',
    statements: [
      'Suggests an idea that is new to the class',
      'Combines ideas from different sources or subjects',
      'Presents their point in an original way',
      'Improves an idea after hearing feedback',
    ],
  },
  {
    id: 'sensitivity',
    label: 'Sensitivity',
    statements: [
      'Listens to others without interrupting',
      'Responds respectfully to a different view',
      'Considers how the issue affects different people',
      'Encourages quieter classmates to share',
    ],
  },
]

const FIRST = ['Aarav', 'Aditi', 'Aman', 'Anjali', 'Ankit', 'Divya', 'Gaurav', 'Isha', 'Kunal', 'Kavya', 'Manish', 'Megha', 'Nitin', 'Neha', 'Pranav', 'Pooja', 'Rahul', 'Riya', 'Sahil', 'Tanvi']
const LAST = ['Thakur', 'Rana', 'Negi', 'Chauhan', 'Pathania', 'Jamwal', 'Katoch', 'Guleria', 'Sharma', 'Dogra']

/** Deterministic mock roster for a class. */
export function getStudents(classId, count = 40) {
  const seed = [...String(classId)].reduce((a, c) => a + c.charCodeAt(0), 0)
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST[(i + seed) % FIRST.length]
    const last = LAST[(i * 3 + seed) % LAST.length]
    return {
      id: `${classId}-${String(i + 1).padStart(2, '0')}`,
      name: `${first} ${last}`,
      initials: `${first[0]}${last[0]}`,
      studentId: String(1234567800 + seed * 7 + i),
    }
  })
}

/** How many learners have already submitted (mock). */
export const RESPONDED_COUNT = 12

export const fmtDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
export const fmtShort = (iso) => {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
