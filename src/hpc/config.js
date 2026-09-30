/**
 * HPC Secondary (Grades 9–12) — handbook content for the multi-stage activities.
 * Source: NCERT/PARAKH "How to fill the HPC — Secondary Stage", Part B (Group Project) and
 * Part C (Problem Based Enquiry), as extracted in the HPC prompt pack. Statements are verbatim
 * unless marked `condensed` (the extraction summarised them).
 *
 * This file stands in for the state's configuration service: screens READ from it and never
 * hard-code rubric text or score bands (Req #19, #20).
 */

export const ABILITIES = [
  { id: 'awareness', label: 'Awareness', icon: 'eye' },
  { id: 'sensitivity', label: 'Sensitivity', icon: 'heart' },
  { id: 'creativity', label: 'Creativity', icon: 'spark' },
]

export const LEVELS = [
  { id: 'B', label: 'Beginner', value: 5 },
  { id: 'P', label: 'Proficient', value: 10 },
  { id: 'A', label: 'Advanced', value: 15 },
]

/* ------------------------------------------------------------------ Setup (Page 1) */

export const PEDAGOGIES = [
  'Art-integrated',
  'Sports-integrated',
  'Toy-based',
  'Technology-integrated',
  'Skill-based learning',
  'Drama/Theatre-integrated',
  'Cross-cutting theme integrated',
  'Experiential learning',
  'Indian Knowledge Systems integrated',
  'Any other',
]

// Illustrative list from the handbook ("among others")
export const SUBJECTS = [
  'Development Economics', 'Sociology', 'Anthropology', 'Archaeology', 'Biology', 'Computational Biology',
  'Earth Sciences', 'Music', 'Theatre', 'Fine Arts', 'Graphic Design', 'Photography', 'Textile Design',
  'Business Studies', 'Sustainability', 'Media', 'Indian Knowledge Systems', 'Legal Studies',
  'Science', 'Social Science', 'Mathematics', 'English', 'Hindi',
]

// Content from config — sample codes only (the state supplies the real NCF-SE lists)
export const CURRICULAR_GOALS = [
  { code: 'CG-2', label: 'Understands the interdependence of living and non-living components in the environment' },
  { code: 'CG-5', label: 'Uses scientific methods to investigate questions about the world around them' },
  { code: 'CG-8', label: 'Understands and appreciates the diversity of social and cultural life in their community' },
  { code: 'CG-9', label: 'Analyses local problems and proposes sustainable, evidence-based solutions' },
]
export const COMPETENCIES = [
  { code: 'C-2.3', goal: 'CG-2', label: 'Explains how human activity affects local water and land resources' },
  { code: 'C-5.1', goal: 'CG-5', label: 'Frames questions and hypotheses that can be investigated' },
  { code: 'C-5.4', goal: 'CG-5', label: 'Collects, organises and interprets data to draw conclusions' },
  { code: 'C-8.5', goal: 'CG-8', label: 'Works collaboratively and respects diverse points of view' },
  { code: 'C-9.2', goal: 'CG-9', label: 'Proposes solutions and weighs their possible drawbacks' },
]

/* ------------------------------------------------------------ Part B · Group Project */

export const GROUP_PROJECT = {
  minGroupSize: 3,
  stages: [
    { id: 'S1', label: 'Stage 1', name: 'Planning', trigger: 'The teacher sets the prompt', self: true, peer: false },
    { id: 'S2', label: 'Stage 2', name: 'Draft', trigger: 'A first draft, sketch or prototype exists', self: false, peer: false, teacherOnly: true },
    { id: 'S3', label: 'Stage 3', name: 'Final', trigger: 'The final output is created', self: true, peer: true },
  ],
  unpacking: ['Guiding questions', 'What do I know?', 'What do I need to find out?'],
  planning: [
    { id: 'schedule', label: 'Project schedule (day-wise)', rows: { min: 3, max: 14 }, placeholder: 'Day 1 — …' },
    { id: 'resources', label: 'Resources needed', rows: { min: 1, max: 10 } },
    { id: 'roles', label: 'Roles of group members', rows: { min: 3, max: 10 }, perMember: true },
    { id: 'barriers', label: 'Possible barriers', rows: { min: 1, max: 8 } },
  ],
  // Stage 1 · Learner reflection (5 per ability) — verbatim
  s1Self: {
    awareness: [
      'I understand the purpose of the project.',
      'I could read and understand the resource material.',
      'I talk about things I know that are needed for the project.',
      'I identify challenges my group might face during the project.',
      'I could enumerate and describe the steps (start to finish) required to do the project.',
    ],
    sensitivity: [
      "I listen to my group's ideas and respect them.",
      'I try to make sure group decisions are taken collectively.',
      'I try to make sure that my peers understand all aspects of the project.',
      'I can meaningfully relate to the objectives of the project.',
      'I feel joyous in contributing to the project.',
    ],
    creativity: [
      'I think of different ways to approach the task.',
      'I brainstorm about project execution and presentation.',
      'I think of different resources to be used in the project.',
      'I come up with innovative solutions to mitigate the challenges.',
      'I can think of new ideas to relate the output of the project in daily life.',
    ],
  },
  // Stage 1 · Teacher assessment (5 per ability) — verbatim
  s1Teacher: {
    awareness: [
      'Guiding questions created by the learner demonstrate a clear understanding of project goals and objectives.',
      'The learner identifies potential challenges and proposes solutions.',
      'The learner develops a plan for project execution.',
      'The learner can communicate project ideas and plans to other group members.',
      'The learner can successfully identify existing content knowledge and gaps in their understanding.',
    ],
    sensitivity: [
      'The learner actively seeks input from all group members during planning.',
      'The learner tries to support fair distribution of tasks and responsibilities including all genders.',
      'The learner ensures that decisions are made collaboratively.',
      'The learner actively maintains a shared understanding with the group.',
      'The learner can handle different opinions in the group respectfully.',
    ],
    creativity: [
      'The learner can brainstorm about project execution and presentation.',
      'The learner demonstrates curiosity in proposing sources of material beyond conventional resources.',
      'The learner demonstrates initiative in proposing solutions to possible barriers.',
      'The learner can provide creative input to decide the roles of group members.',
      'The learner can go beyond the defined features of the project prompt/task and add a unique element to it.',
    ],
  },
  // Stage 2 · Teacher assessment (6 per ability) — verbatim; each begins "The learner …" in the handbook
  s2Teacher: {
    awareness: [
      'Shows evidence of sufficient engagement in the process of project work.',
      'Can present a draft of the work done as per the project schedule.',
      'Can demonstrate thorough research skills on the project task/topic.',
      'Can identify possible areas of improvement in the draft.',
      "Is aware of different team members' contributions to the project so far.",
      'The product created demonstrates the application of knowledge gained.',
    ],
    sensitivity: [
      'Participates in group discussions respectfully.',
      "Responds appropriately to other group members' emotions during the project.",
      'Attempts to build a positive emotional atmosphere within the group.',
      'Demonstrates some understanding of the social relevance of the project.',
      'Refrains from expressing negative emotions during group work.',
      'Participates enthusiastically and diligently in the project.',
    ],
    creativity: [
      'Demonstrates flexibility with respect to project roles.',
      'Displays willingness to consider different sources of information, tools, or materials.',
      'Takes initiative to complete the project tasks.',
      'Builds on the unique elements introduced earlier, or incorporates them at this stage.',
      'Shows evidence of having considered and selected some ideas from the brainstorming stage.',
      'The product created is innovative and useful to the community.',
    ],
  },
  // Stage 3 · Teacher rubric — descriptor grid written by the teacher (3 abilities × B/P/A), one level picked per ability
  s3RubricTemplate: {
    awareness: { B: '', P: '', A: '' },
    sensitivity: { B: '', P: '', A: '' },
    creativity: { B: '', P: '', A: '' },
  },
  // Stage 3 · Learner reflection and peer feedback (3 per ability, mirrored) — condensed
  s3Self: {
    awareness: [
      'I could identify areas where my understanding improved.',
      'I could explain how my work contributed.',
      "I was able to improve the project based on my own and peers' review.",
    ],
    sensitivity: [
      'I built a positive emotional atmosphere.',
      'I could reflect on my strengths and areas for improvement.',
      'I understood the social relevance of the project.',
    ],
    creativity: [
      'I made creative contributions.',
      'I took initiative to complete the project.',
      'I used different materials, tools and resources.',
    ],
  },
  s3Peer: {
    awareness: [
      'My peer showed improved understanding.',
      'My peer could explain how her/his work contributed.',
      "My peer improved the project based on own and peers' review.",
    ],
    sensitivity: [
      "My peer helped build a positive atmosphere by valuing everyone's opinions.",
      'My peer reflected on strengths and areas for improvement.',
      'My peer understood the social relevance of the project.',
    ],
    creativity: [
      'My peer made creative contributions.',
      'My peer took initiative to help complete the project.',
      'My peer used different materials, tools and resources.',
    ],
  },
  postReflection: [
    'What did I learn?',
    'Most enjoyable part',
    'Three strengths I demonstrated',
    'Two areas of improvement',
    'Challenges I faced',
    'Some questions I still have…',
    'How could your teacher modify this project to make it more interesting?',
  ],
}

/* ---------------------------------------------------- Part C · Problem Based Enquiry */

export const PBI = {
  instrument: { maxQuestions: 10, interviewMinutes: 5, minResponses: 10 },
  extraParamsPerAbility: 2,
  stages: [
    { id: 'S1', label: 'Stage 1', name: 'Draft plan', self: true, peer: false },
    { id: 'S2', label: 'Stage 2', name: 'Data and draft summary', self: true, peer: false },
    { id: 'S3', label: 'Stage 3', name: 'Peer review and revise', self: false, peer: true },
  ],
  draftPlan: [
    'What do I know?',
    'What do I need to find out?',
    'What do I need to do?',
    'Research task schedule',
    'Evidence collection to support/negate the hypothesis',
    'Analysis and synthesis',
    'Discussions',
    'Conclusion (tentative solution)',
  ],
  summary: ['Key findings', 'Proposed solution', 'Justification', 'Possible drawbacks'],
  // Pre-printed teacher statements that "apply automatically" — verbatim.
  // ⚠ S3 Awareness has 4 (OQ-SEC-11).
  fixed: {
    S1: {
      awareness: ['Has conceptual understanding', 'Alignment between research problem and questionnaire', 'Has identified potential challenges'],
      sensitivity: ['Understands the larger social purpose', 'Questionnaire has inclusive, accessible wording', 'Clear understanding of stakeholders and their needs'],
      creativity: ['Considers alternative methods of collecting findings', 'Considers alternative respondent groups', 'Thinks of different ways to motivate respondents'],
    },
    S2: {
      awareness: ['Collected data and presented it comprehensively', 'Translated data into understandable findings', 'Proposed practical recommendations aligned with findings'],
      sensitivity: ['Fair, impartial data collection and analysis', 'Articulated the social impact of recommendations', "Handled respondents' discrete information confidentially"],
      creativity: ['Considered drawbacks/unintended consequences', 'Presented findings in an engaging format', 'Innovative yet realistic recommendations'],
    },
    S3: {
      awareness: ['Refined the discussions', 'Prior knowledge revised/augmented', 'Revised draft suitable for peer review', 'Evidence included in discussions/conclusions'],
      sensitivity: ['Accepts constructive feedback', 'Shifts perspective and incorporates feedback', 'Revised draft inclusive of diverse perspectives'],
      creativity: ['Responds to feedback innovatively', 'Novel data collection in the revised draft', 'Explores ways to present the revised draft to the peer'],
    },
  },
  // Parameter bank (Pages 11–12) · "illustrative, please adapt" — stage assignment 🟡 unconfirmed
  bank: {
    awareness: [
      'Understands what counts as supporting evidence', 'Weighs alternative respondent groups',
      'Considers constraints (time, access, attitudes)', 'Frames and limits topics with context',
      'Understands data limitations and response reliability', 'Asks clear, unambiguous questions',
      'Separates essential from non-essential peer feedback', 'Acknowledges contrary results',
      'Presents findings clearly', 'Connects findings to recommendations',
    ],
    sensitivity: [
      'Considers emotional impacts', 'Understands differential policy impacts', 'Avoids intrusive questions',
      'Adapts to communication styles', 'Professional tone', "Adapts to respondents' needs",
      'Responds constructively to negative feedback', 'Acknowledges personal bias', 'Avoids emotionally charged wording',
      'Conducts interviews professionally', 'Responds to emotion in interviews', 'Understands positive and negative consequences',
    ],
    creativity: [
      'Novel ideas', 'Multiple perspectives', 'Innovative question wording', 'Multiple media for data',
      'Goes beyond peer feedback', 'Invites constructive critique', 'Alters approach on valid peer concerns',
      'Shifts strategy when unproductive', 'Less obvious insights', 'Flexible with unexpected responses',
      'Recognises when a shift is needed', 'Articulates contradictory implications',
    ],
  },
  // Learner (S1, S2) and peer (S3) statements — condensed
  self: {
    S1: {
      awareness: ['I understood the purpose of the enquiry.', 'I drafted a fitting questionnaire.', "I found out things I didn't know."],
      sensitivity: ['I understood the social purpose.', 'I used my knowledge of social relationships to choose respondents.', "I considered respondents' emotional reactions."],
      creativity: ['I considered different respondent groups.', 'I thought of ways to motivate respondents.', 'I considered different data-collection methods.'],
    },
    S2: {
      awareness: ['I addressed anticipated challenges.', 'I collected data from sufficient respondents.', 'I refined and improved the draft.'],
      sensitivity: ['I was aware of my personal biases.', 'I used inclusive terminology.', "I handled respondents' information confidentially."],
      creativity: ['I used various data-collection strategies.', 'I adjusted my approach to unexpected challenges.', 'I found engaging ways to present findings.'],
    },
  },
  peer: {
    awareness: ['The revised draft is clear enough to review.', 'There is a good fit between the problem and the data approach.', 'The interview draft is appropriate and easy to understand.'],
    sensitivity: ['My peer received feedback openly.', 'My peer was willing to modify the draft.', "The wording is respectful of respondents' emotions."],
    creativity: ['My peer considered alternate data methods.', 'My peer considered alternate respondent groups.', 'My peer thought of ways to motivate respondents.'],
  },
  s1SelfExtra: ['Problems I faced in Stage 1', 'How did I solve them / what help do I still need?'],
  s2SelfExtra: ['Words of appreciation for yourself'],
  peerExtra: ['Words of appreciation / encouragement'],
  postReflection: [
    'What did I learn?',
    'Most enjoyable part',
    'Least enjoyable part',
    'Three strengths',
    'Three areas of improvement',
    'Questions I still have',
    'How could your teacher modify this enquiry?',
  ],
}

/* ------------------------------------------------------------------ Band tables */
/**
 * Lookup tables per instrument × assessor (pack §1.3). The UI must render these and never compute
 * its own thresholds. Scores outside every row return { id: 'unbanded' } so the gap is visible
 * (OQ-SEC-4: B teacher 0–4 and 26; OQ-SEC-11: C teacher Awareness 16).
 */
export const BANDS = {
  B: {
    teacher: [{ min: 5, max: 11, level: 'B' }, { min: 12, max: 18, level: 'P' }, { min: 19, max: 25, level: 'A' }],
    learner: [{ min: 0, max: 3, level: 'B' }, { min: 4, max: 6, level: 'P' }, { min: 7, max: 8, level: 'A' }],
    peer: [{ min: 0, max: 1, level: 'B' }, { min: 2, max: 2, level: 'P' }, { min: 3, max: 3, level: 'A' }],
  },
  C: {
    teacher: [{ min: 0, max: 5, level: 'B' }, { min: 6, max: 10, level: 'P' }, { min: 11, max: 15, level: 'A' }],
    learner: [{ min: 0, max: 2, level: 'B' }, { min: 3, max: 4, level: 'P' }, { min: 5, max: 6, level: 'A' }],
    peer: [{ min: 0, max: 1, level: 'B' }, { min: 2, max: 2, level: 'P' }, { min: 3, max: 3, level: 'A' }],
  },
}

export function bandFor(instrument, assessor, score) {
  const row = BANDS[instrument]?.[assessor]?.find((r) => score >= r.min && score <= r.max)
  return row ? { id: row.level, label: LEVELS.find((l) => l.id === row.level).label } : { id: 'unbanded', label: 'Outside band table' }
}

/** Open questions surfaced in the UI where they apply. */
export const OPEN_QUESTIONS = {
  'OQ-SEC-3': 'PBI self-reflection stages: the text says S1 & S3, the exemplar says S1 & S2. This build follows the exemplar (S1 & S2).',
  'OQ-SEC-4': 'Group Project teacher maximum is 26 (5 + 6 + 15) but the band table stops at 25, and 0–4 is unbanded.',
  'OQ-SEC-5': 'Peer provenance colour is proposed; the kit only defines teacher and student.',
  'OQ-SEC-6': 'Who authors extra parameters (teacher free text, state bank, or both) is undecided. Both are allowed here.',
  'OQ-SEC-10': 'Who in the group may edit shared Stage 1 fields. Here any member can edit; the last editor is shown.',
  'OQ-SEC-11': 'PBI Stage 3 Awareness has 4 fixed statements, so the teacher Awareness maximum is 16 against a band cap of 15.',
  'OQ-FINAL': 'The handbook does not define how teacher, learner and peer levels combine. The teacher picks the final level; the app does not calculate it.',
}

/* ------------------------------------------- Group Project registry (content from config) */
/**
 * Approved Group Project topics. The teacher picks one; every setup field (Part B Page 1) is
 * pulled from here — nothing is typed by hand. Supplied by the state; sample entries below.
 */
export const GROUP_PROJECT_CATALOG = [
  {
    id: 'water-village', title: 'Water in my village', subject: 'Social Science',
    why: 'Students work in teams on a real problem in their village, building planning, observation and communication skills.',
    subjects: ['Social Science', 'Sustainability'], goals: ['CG-2', 'CG-8'], competencies: ['C-2.3', 'C-8.5'],
    pedagogies: ['Experiential learning', 'Cross-cutting theme integrated'],
    learningOutcome: 'Investigates a local issue using evidence',
    competency: 'Environmental awareness · collaboration',
    pedagogy: 'Inquiry-based, group',
    prompt: 'How can our village use and save water better? Study the water sources around you and propose a plan.',
    output: 'A village water map with a 5-point action plan, presented to the class',
  },
  {
    id: 'waste-school', title: 'Waste-free school', subject: 'Science',
    why: 'Groups study how waste is made and handled in school and design a simple system everyone can follow.',
    subjects: ['Science', 'Sustainability'], goals: ['CG-2', 'CG-9'], competencies: ['C-2.3', 'C-9.2'],
    pedagogies: ['Experiential learning', 'Skill-based learning'],
    learningOutcome: 'Proposes a practical solution to a local problem',
    competency: 'Sustainability · problem solving',
    pedagogy: 'Project-based, group',
    prompt: 'How can our school reduce and sort its waste? Track the waste for a week and design a system.',
    output: 'A waste audit chart and a sorting plan for the school',
  },
  {
    id: 'local-heritage', title: 'Our local heritage', subject: 'History',
    why: 'Groups document a heritage site or tradition near them and share why it matters to the community.',
    subjects: ['Social Science', 'Indian Knowledge Systems'], goals: ['CG-8'], competencies: ['C-8.5'],
    pedagogies: ['Art-integrated', 'Indian Knowledge Systems integrated'],
    learningOutcome: 'Describes the cultural value of a local heritage site',
    competency: 'Cultural awareness · communication',
    pedagogy: 'Field visit, group',
    prompt: 'What is special about a heritage site or tradition near you? Collect stories and pictures.',
    output: 'An illustrated booklet or short presentation for the class',
  },
]

/* ------------------------------------ Problem Based Enquiry registry (content from config) */
/** Approved PBI topics. Picking one fills Part C Page 1; the hypothesis stays optional. */
export const PBI_CATALOG = [
  {
    id: 'clean-energy', title: 'Clean energy for my school', subject: 'Science',
    why: 'Learners investigate a real problem, collect evidence from people around them and propose a solution.',
    subjects: ['Science', 'Sustainability'], goals: ['CG-5', 'CG-9'], competencies: ['C-5.1', 'C-5.4', 'C-9.2'],
    pedagogies: ['Experiential learning', 'Technology-integrated'],
    learningOutcome: 'Collects and interprets data to propose a solution',
    competency: 'Scientific enquiry · problem solving',
    pedagogy: 'Enquiry-based, individual',
    prompt: 'Find out how your community could switch to cleaner energy, collect evidence from at least 10 people, and propose a solution.',
    output: 'A 1–2 page summary with findings, a proposed solution and its possible drawbacks',
  },
  {
    id: 'public-transport', title: 'Getting more people to use public transport', subject: 'Social Science',
    why: 'Learners study why people choose how they travel and suggest changes their community could make.',
    subjects: ['Social Science', 'Sustainability'], goals: ['CG-9'], competencies: ['C-9.2'],
    pedagogies: ['Experiential learning'],
    learningOutcome: 'Uses survey data to suggest practical changes',
    competency: 'Data use · civic awareness',
    pedagogy: 'Survey-based, individual',
    prompt: 'Why do people in your area use or avoid public transport? Ask at least 10 people and propose one change.',
    output: 'A 1–2 page summary with findings, a proposed change and its possible drawbacks',
  },
  {
    id: 'local-stream', title: 'Protecting our local stream', subject: 'Science',
    why: 'Learners find out what harms a local waterway and what their community could do to protect it.',
    subjects: ['Science', 'Earth Sciences'], goals: ['CG-2', 'CG-5'], competencies: ['C-2.3', 'C-5.4'],
    pedagogies: ['Experiential learning', 'Cross-cutting theme integrated'],
    learningOutcome: 'Explains how human activity affects a local water source',
    competency: 'Environmental awareness · enquiry',
    pedagogy: 'Field observation, individual',
    prompt: 'What is harming the stream near you? Collect evidence from at least 10 people and propose a way to protect it.',
    output: 'A 1–2 page summary with findings, a proposed solution and its possible drawbacks',
  },
]
