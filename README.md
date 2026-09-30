# HPC Teacher App (prototype)

Built from the Figma page **"Final Screens"** — file `XYfAaoF4jiBG5nY8dE9PBp` (HPC New Prototype – 22 September).

```
npm install
npm run dev      # http://localhost:5190
```

Stack: Vite + React 18 + Tailwind 3 + react-router (HashRouter). State persists in localStorage;
use **Profile → Reset demo** to replay onboarding.

**Sign in** at `/login`: pick Teacher or Student and enter any 5+ digit ID.
Teachers land on `/home`; students land on the student app at `/s/home` (sample student Riya Thakur, Class 9 A).

**Languages:** English / हिंदी toggle on Login and on both Profile screens. Every string goes through
`useT()` from `src/i18n/index.js`, keyed by its English text; Hindi lives in `src/i18n/hi/<flow>.js`,
and `zz-overrides.js` holds the canonical wording for terms shared across flows. In dev, untranslated
strings are collected on `window.__missingHi`.

## Flows (src/flows/*, each registers its own routes.jsx)
| Folder | Entry | Covers |
|---|---|---|
| onboarding | `/language` | Language → user type → teacher ID → confirm → Home (empty / populated), Add/Remove classes, Profile |
| students | `/students`, `/class/:classId` | View Student's HPC search, full HPC report, student details, class overview |
| know-myself | `/activity/start` | Select class → activity type, Section A Know Myself: create, review, make live, success, progress, survey, nudge, response |
| group-setup | `/group-project/:classId` | Section B setup, group creation tool, view groups, make live, success |
| group-live | `/group-project/:classId/progress` | Submissions (file upload), student submission, rubric, feedback |
| pbi | `/pbi/:classId` | Section C activation, progress, submissions/nudge, rubric, feedback |
| classroom | `/classroom/:classId` | Section D type, setup, groups, make live, progress, responses, rubric, feedback |
| student-home | `/s/home` | Student home, Today's Focus, My Activities, My Group, My HPC, completed views, empty/end/error states, `/s/demo` state switcher |
| student-ac | `/s/survey/:id`, `/s/pbi/:id` | Know Myself surveys, Problem Based Enquiry (add work, confirm, self-reflection), missed / failure states |
| student-bd | `/s/project/:id`, `/s/class/:id` | Group Project and Classroom Interaction: waiting, self-reflection, peer review, late window |

Student flows follow the "Student App Flows v2" board; shared student data and state live in `src/student/`.

Shared UI: `src/components/ui.jsx` (Screen, StatusBar, TopAppBar, buttons, Sheet, Modal, Toast).
Tokens & motion keyframes: `tailwind.config.js`, `src/index.css` (`tap`, `tap-soft`, `stagger`, `skeleton`).
