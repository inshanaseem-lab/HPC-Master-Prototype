/** Static copy for the Problem Based Enquiry teacher flow. Rubric text lives in src/hpc/config.js. */

export const WHY = 'Each learner proposes their own solution to a real problem, building research and creative thinking.'

export const MATERIALS = [
  { id: 'handbook', title: 'Teacher handbook', meta: 'PDF · how to run all three stages' },
  { id: 'worksheet', title: 'Student Worksheet', meta: 'PDF · print or share in class' },
]

export const TOPIC_MODES = [
  { id: 'assigned', label: 'Assigned by me', desc: 'You give each learner a topic from your list.' },
  { id: 'choose', label: 'Learners choose from my list', desc: 'Each learner picks one topic from your list.' },
  { id: 'self', label: 'Learners suggest their own', desc: 'Each learner proposes a problem; you see it in their Stage 1 plan.' },
]

export const ASSIGN_MODES = [
  { id: 'bulk', label: 'Same topic for everyone' },
  { id: 'random', label: 'Spread topics at random' },
  { id: 'manual', label: 'Choose for each learner' },
]

/** Sample names for demo-submitted files. */
export const fileName = (name, kind) => `${name.split(' ')[0].toLowerCase()}-${kind}.pdf`
