/**
 * Student app — shared sample data (matches "Student App Flows v2": Class 9 A, Student ID …1000).
 * Every student flow reads activities from here via the store in ./store.js.
 */

export const STUDENT = {
  name: 'Riya Thakur',
  initials: 'RT',
  classId: '9A',
  grade: '9',
  section: 'A',
  idMasked: '…1000',
  school: 'Varana Primary School',
  district: 'Mandi',
  roll: '01',
  // The teacher-side HPC report screen is reused read-only for "View My HPC" (2.1)
  hpcStudentId: '12334',
}

// Section chip colours from the HPC design kit (S01-02)
export const SECTIONS = {
  A: { letter: 'A', name: 'Know Myself', color: '#2f4fb3', bg: '#e6edff' },
  B: { letter: 'B', name: 'Group Project', color: '#2f4fb3', bg: '#e6edff' },
  C: { letter: 'C', name: 'Problem Based Enquiry', color: '#6a3fc4', bg: '#efe8ff' },
  D: { letter: 'D', name: 'Classroom Interaction', color: '#b0305e', bg: '#fde7ef' },
}

export const GROUPS = {
  G2: {
    id: 'G2', name: 'Group 2', activityId: 'gp-water', teacher: 'Anjali Sharma',
    members: [
      { id: 'm1000', name: 'Riya Thakur', idMasked: '…1000', you: true },
      { id: 'm1003', name: 'Aman Verma', idMasked: '…1003' },
      { id: 'm1022', name: 'Pooja Kumari', idMasked: '…1022' },
      { id: 'm1031', name: 'Sahil Chauhan', idMasked: '…1031' },
      { id: 'm1037', name: 'Megha Rana', idMasked: '…1037' },
    ],
  },
  G3: {
    id: 'G3', name: 'Group 3', activityId: 'ci-plastic', teacher: 'Rakesh Negi',
    members: [
      { id: 'm1000', name: 'Riya Thakur', idMasked: '…1000', you: true },
      { id: 'm1019', name: 'Neha Sharma', idMasked: '…1019' },
      { id: 'm1005', name: 'Arjun Rana', idMasked: '…1005' },
      { id: 'm1024', name: 'Kavya Negi', idMasked: '…1024' },
      { id: 'm1029', name: 'Rohit Kumar', idMasked: '…1029' },
    ],
  },
}

/**
 * `state` values per section (the flows move activities between them):
 *   A survey:   'live' → 'submitted'            | 'missed'
 *   B project:  'in-progress' (5.1) → 'waiting-teacher' (10.1, deadline passed, not recorded)
 *               → 'recorded' (5.2, self-reflection next) → 'reflected' (peer review next) → 'done'
 *   C inquiry:  'live' (6.1) → 'draft' (files saved) → 'submitted' (self-reflection next) → 'done' | 'missed'
 *   D class:    'before-class' (7.1) → 'waiting-teacher' (10.2) → 'marked-complete' (7.2)
 *               → 'reflected' (peer review next, only if grouped) → 'done'
 * `late: true` = deadline passed but reflection window (+1 week) still open (9.4);
 * `closed: true` = reflection window ended (9.5).
 */
export const INITIAL_ACTIVITIES = [
  // ---- Live
  {
    id: 'gp-water', section: 'B', title: 'Water in my village', groupId: 'G2', teacher: 'Anjali Sharma',
    deadline: '15 Sep 2026, 11:59 PM', due: '15 Sep', state: 'recorded',
    submission: { kind: 'Digital · photo', at: '11 Sep, 4:32 pm', file: 'group2-water-chart.jpg' },
    peerDone: [],
  },
  {
    id: 'ci-plastic', section: 'D', title: 'Plastic ban debate', type: 'Organised debate', side: 'For the ban',
    groupId: 'G3', teacher: 'Rakesh Negi', prepDeadline: '10 Sep', classDate: '12 Sep', due: '14 Sep',
    state: 'marked-complete', peerDone: [],
  },
  {
    id: 'a4', section: 'A', code: 'A4', title: 'Plans after school', questions: 8, minutes: 10,
    deadline: '15 Sep 2026, 11:59 PM', due: '15 Sep', state: 'live',
    why: 'Thinking about what comes after school helps you choose subjects and skills now.',
  },
  {
    id: 'a5', section: 'A', code: 'A5', title: 'Accomplishments', questions: 6, minutes: 8,
    deadline: '18 Sep 2026, 11:59 PM', due: '18 Sep', state: 'live',
    why: 'Looking back at what you have achieved helps you see your strengths.',
  },
  {
    id: 'pbi-energy', section: 'C', title: 'Clean energy for my school', individual: true, teacher: 'Suman Rana',
    deadline: '20 Sep 2026, 11:59 PM', due: '20 Sep', state: 'live', files: [],
  },
  // ---- Completed (order is fixed by section, not by date)
  { id: 'a1', section: 'A', code: 'A1', title: 'Information & Interests', state: 'submitted', submittedOn: '2 Sep' },
  { id: 'a2', section: 'A', code: 'A2', title: 'Goal setting', state: 'submitted', submittedOn: '5 Sep' },
  { id: 'a3', section: 'A', code: 'A3', title: 'Time Management', state: 'submitted', submittedOn: '9 Sep' },
  { id: 'gp-garden', section: 'B', title: 'Our school garden', state: 'done', submittedOn: '28 Aug', groupId: 'G2' },
  { id: 'pbi-water', section: 'C', title: 'Save water at home', state: 'done', submittedOn: '3 Sep', individual: true },
  { id: 'ci-homework', section: 'D', title: 'Should homework be optional?', type: 'Organised debate', state: 'done', submittedOn: '6 Sep', groupId: 'G3' },
  { id: 'ci-waste', section: 'D', title: 'Waste segregation role play', type: 'Role play', state: 'done', submittedOn: '8 Sep' },
]

/** Is this activity finished from the student's point of view? */
// Section A is finished once submitted; B/C/D still have reflection steps after 'submitted'
export const isCompleted = (a) =>
  a.state === 'done' || a.state === 'missed' || (a.section === 'A' && a.state === 'submitted')

/** Route that opens an activity at its current step. */
export function activityPath(a) {
  if (isCompleted(a)) return `/s/completed/${a.id}`
  switch (a.section) {
    case 'A': return `/s/survey/${a.id}`
    case 'B': return `/s/project/${a.id}`
    case 'C': return `/s/pbi/${a.id}`
    case 'D': return `/s/class/${a.id}`
    default: return '/s/home'
  }
}
