/**
 * Section A survey questions and Section C self-reflection questions.
 * English text lives here and is translated at render time (see src/i18n/hi/student-ac.js).
 * type: 'single' (one option), 'multi' (any number), 'text' (short answer)
 */

export const SURVEYS = {
  a4: [
    {
      type: 'multi',
      q: 'Which subjects do you enjoy the most?',
      options: ['Maths', 'Science', 'Languages', 'Social Science', 'Art and music', 'Sports', 'Computers'],
    },
    {
      type: 'single',
      q: 'How often do you think about what you will do after school?',
      options: ['Very often', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      type: 'single',
      q: 'What would you like to do after Class 12?',
      options: ['Study further in college', 'Learn a trade or vocational skill', 'Start working', 'I haven’t decided yet'],
    },
    {
      type: 'multi',
      q: 'What kind of work interests you?',
      options: [
        'Working with people',
        'Working with machines or tools',
        'Working with plants and animals',
        'Working with numbers and computers',
        'Creating art, music or writing',
        'Helping people stay healthy',
      ],
    },
    {
      type: 'single',
      q: 'Who do you talk to about your future plans?',
      options: ['My parents or family', 'My teachers', 'My friends', 'No one yet'],
    },
    {
      type: 'multi',
      q: 'Which skills do you want to get better at before you finish school?',
      options: ['Speaking confidently', 'Using a computer', 'Writing clearly', 'Solving problems', 'Working in a team', 'Managing money'],
    },
    {
      type: 'single',
      q: 'Do you know what you need to study for the work you want to do?',
      options: ['Yes, I know clearly', 'I know a little', 'Not yet, but I want to find out', 'I haven’t thought about it'],
    },
    {
      type: 'text',
      q: 'Describe one job you would like to do and why.',
      placeholder: 'For example: I want to be a nurse because…',
    },
  ],
  a5: [
    {
      type: 'text',
      q: 'What is one thing you did this year that you are proud of?',
      placeholder: 'For example: I won a quiz, learnt to swim, helped at home…',
    },
    {
      type: 'multi',
      q: 'Where did your achievements happen?',
      options: ['In class', 'In sports', 'In art, music or dance', 'At home', 'In my community', 'In a competition'],
    },
    {
      type: 'single',
      q: 'How did you feel when you achieved it?',
      options: ['Very proud', 'Happy', 'It felt normal', 'I’m not sure'],
    },
    {
      type: 'single',
      q: 'Who helped you the most?',
      options: ['My family', 'My teacher', 'My friends', 'I did it on my own'],
    },
    {
      type: 'single',
      q: 'What helped you succeed?',
      options: ['Practising regularly', 'Asking for help', 'Not giving up', 'Planning my time'],
    },
    {
      type: 'text',
      q: 'What would you like to achieve next?',
      placeholder: 'Write one goal for the coming months',
    },
  ],
}

export const surveyQuestions = (id) => SURVEYS[id] ?? SURVEYS.a5

/** Section C · Problem Based Enquiry self-reflection (4-option single choice). */
export const PBI_REFLECTION = [
  {
    q: 'How well did you understand the problem before proposing a solution?',
    options: [
      { title: 'Very well', desc: 'I researched causes and talked to people affected' },
      { title: 'Well', desc: 'I understood the main causes' },
      { title: 'Partly', desc: 'Some parts were still unclear' },
      { title: 'Not yet', desc: 'I need more help to understand it' },
    ],
  },
  {
    q: 'How much research did you do before deciding on your solution?',
    options: [
      { title: 'A lot', desc: 'I used books, the internet and asked people' },
      { title: 'Some', desc: 'I looked at a few sources' },
      { title: 'A little', desc: 'I mostly used what I already knew' },
      { title: 'None', desc: 'I started without any research' },
    ],
  },
  {
    q: 'How much of the solution is your own idea?',
    options: [
      { title: 'All of it', desc: 'It is my own new idea' },
      { title: 'Most of it', desc: 'I built on an idea I found' },
      { title: 'Some of it', desc: 'I changed an existing idea a little' },
      { title: 'Very little', desc: 'I mostly used someone else’s idea' },
    ],
  },
  {
    q: 'How well did you manage your time?',
    options: [
      { title: 'Very well', desc: 'I finished every part on time' },
      { title: 'Well', desc: 'I finished, with a small rush at the end' },
      { title: 'Partly', desc: 'Some parts were rushed' },
      { title: 'Not well', desc: 'I ran out of time' },
    ],
  },
  {
    q: 'What will you do differently next time?',
    options: [
      { title: 'Plan earlier', desc: 'Start sooner and split the work into parts' },
      { title: 'Research more', desc: 'Look at more sources before deciding' },
      { title: 'Ask for help sooner', desc: 'Talk to my teacher when I am stuck' },
      { title: 'Test my idea', desc: 'Try out my solution before submitting' },
    ],
  },
]

/* ------------------------------------------------------------ Demo dates */

// The board's sample data is set on 10 Sep 2026 ("5 days left" for a 15 Sep deadline).
export const DEMO_TODAY = new Date(2026, 8, 10)
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const todayLabel = () => `${DEMO_TODAY.getDate()} ${MONTHS[DEMO_TODAY.getMonth()]}`
export function nowLabel() {
  const now = new Date()
  let h = now.getHours()
  const m = String(now.getMinutes()).padStart(2, '0')
  const ap = h >= 12 ? 'pm' : 'am'
  h = h % 12 || 12
  return `${todayLabel()}, ${h}:${m} ${ap}`
}

/** Days from the demo "today" to a deadline like "15 Sep 2026, 11:59 PM". */
export function daysLeft(deadline) {
  const m = /(\d{1,2}) (\w{3}) (\d{4})/.exec(deadline || '')
  if (!m) return null
  const d = new Date(Number(m[3]), MONTHS.indexOf(m[2]), Number(m[1]))
  return Math.round((d - DEMO_TODAY) / 86400000)
}

/* ------------------------------------------------------------- Files */

export const MAX_FILES = 5
export const MAX_BYTES = 10 * 1024 * 1024
const OK_EXT = /\.(jpe?g|png|gif|webp|heic|pdf|docx?|pptx?|mp4|mov|3gp|webm)$/i
export const isSupported = (f) =>
  /^(image|video)\//.test(f.type) || f.type === 'application/pdf' || OK_EXT.test(f.name)

export function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}
