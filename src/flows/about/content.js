/**
 * GIGW 3.0 mandatory information. Pages marked `owner: true` need final text from the
 * content owner (Samagra Shiksha, Himachal Pradesh) before launch.
 */
export const APP_VERSION = '0.9.0 (prototype)'
export const LAST_UPDATED = '26 Sep 2026'

export const PAGES = [
  {
    id: 'help',
    title: 'Help & support',
    summary: 'How to get help with the app',
    owner: true,
    sections: [
      { heading: 'Trouble signing in', body: 'Teachers: ask your school head or block office for your Teacher code. Students: ask your class teacher for your Student ID.' },
      { heading: 'Questions about an activity', body: 'Talk to your class teacher. Teachers can contact their block resource person.' },
      { heading: 'Contact', body: 'Helpline number and email to be provided by Samagra Shiksha, Himachal Pradesh.' },
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility statement',
    summary: 'How this app supports people with disabilities',
    sections: [
      { heading: 'Standard', body: 'This app aims to meet the Guidelines for Indian Government Websites and Apps (GIGW 3.0), which follow WCAG 2.1 Level AA.' },
      {
        heading: 'What you can do',
        list: [
          'Use the app in English or Hindi.',
          'Make text larger using your phone’s text-size setting; layouts adjust.',
          'Use a screen reader such as TalkBack; screens, buttons and form fields are labelled.',
          'Use a keyboard or switch access; every control shows a clear focus outline.',
          'Turn on “Reduce motion” to switch off animations.',
        ],
      },
      { heading: 'Known limitation', body: 'Orange buttons use white text, which has lower contrast (2.6:1) than WCAG AA requires (4.5:1). All other text meets AA.' },
      { heading: 'Report a problem', body: 'If something is hard to use, tell us through Feedback in this app.' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy policy',
    summary: 'What information the app uses and why',
    owner: true,
    sections: [
      { heading: 'What we use', body: 'Your name, class, school and the activities you complete for the Holistic Progress Card. School details come from VSK (Vidya Samiksha Kendra).' },
      { heading: 'Who can see it', body: 'Your teachers see your activities and reflections. Classmates see only the peer reviews they write. Nobody outside your school sees your information.' },
      { heading: 'Your rights', body: 'Ask your school to correct any wrong information.' },
    ],
  },
  {
    id: 'terms',
    title: 'Terms of use',
    summary: 'Rules for using this app',
    owner: true,
    sections: [
      { heading: 'Use', body: 'This app is for teachers and students of Himachal Pradesh government schools, to record the Holistic Progress Card.' },
      { heading: 'Your responsibilities', body: 'Keep your ID private. Write respectful, honest reflections and peer reviews.' },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback',
    summary: 'Tell us what to improve',
    sections: [
      { heading: 'Help us improve', body: 'Tell us what is hard to use or what is missing. Do not share personal details of students here.' },
    ],
  },
]
