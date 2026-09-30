/**
 * Mock read-only content for the Completed views (3.3 / 3.4). English here, translated at render.
 */

export const SURVEY_ANSWERS = {
  A1: [
    ['What do you enjoy doing most in your free time?', 'Drawing and painting'],
    ['Which subject do you like the most?', 'Science'],
    ['What would you like to learn more about?', 'How plants grow'],
  ],
  A2: [
    ['Which subject do you want to improve most this year?', 'Mathematics'],
    ['What marks are you aiming for in this subject?', '80%'],
    ['How many hours a week will you spend on it?', '5 hours'],
  ],
  A3: [
    ['How many hours do you study at home each day?', '2 hours'],
    ['Do you make a timetable for your week?', 'Sometimes'],
    ['What takes most of your time after school?', 'Helping at home'],
  ],
  A4: [
    ['What would you like to do after school?', 'Study further'],
    ['Which field interests you the most?', 'Health and medicine'],
    ['Who do you talk to about your plans?', 'My parents'],
  ],
  A5: [
    ['What are you most proud of this year?', 'Winning the school quiz'],
    ['Which skill have you improved the most?', 'Speaking in front of others'],
    ['Who helped you the most?', 'My teacher'],
  ],
}

export const DEFAULT_SURVEY = [
  ['How did you feel about this survey?', 'Good'],
  ['Did you understand all the questions?', 'Yes'],
]

export const REFLECTION_ANSWERS = [
  ['How well did you understand the topic?', 'Very well'],
  ['How much did you contribute to the work?', 'A lot'],
  ['How well did you work with others?', 'Well'],
  ['Did you finish your tasks on time?', 'Mostly'],
  ['What was the hardest part for you?', 'Collecting information'],
  ['How confident are you to present your work?', 'Confident'],
]

export const PEER_ANSWERS = [
  ['How much did {name} contribute?', 'A lot'],
  ['Did {name} listen to others’ ideas?', 'Always'],
  ['Did {name} finish their tasks on time?', 'Mostly'],
  ['How well did {name} explain their ideas?', 'Well'],
  ['Would you like to work with {name} again?', 'Yes'],
]

/** Submission details for completed sample activities that don't carry their own. */
export const SUBMISSIONS = {
  'gp-garden': { kind: 'Physical · model', at: '20 Aug, 11:15 am', file: 'group1-garden-model.jpg', reflectedOn: '25 Aug' },
  'pbi-water': { kind: 'Digital · document', at: '1 Sep, 6:10 pm', file: 'save-water-at-home.pdf', reflectedOn: '3 Sep' },
  'ci-homework': { reflectedOn: '6 Sep' },
  'ci-waste': { reflectedOn: '8 Sep' },
}
