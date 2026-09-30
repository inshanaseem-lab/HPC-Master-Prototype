import { lazy } from 'react'
import { provide } from '../../platform/services.js'
import { getLive, getSurvey } from './data.js'

// Services this MFE exposes to others (see src/platform/services.js)
provide('know-myself.getLive', getLive)
provide('know-myself.getSurvey', getSurvey)

// Screens are code-split: this micro-frontend's screens download on first visit
const ActivityType = lazy(() => import('./StartActivity.jsx').then((m) => ({ default: m.ActivityType })))
const SelectClass = lazy(() => import('./StartActivity.jsx').then((m) => ({ default: m.SelectClass })))
const KnowMyself = lazy(() => import('./Activation.jsx').then((m) => ({ default: m.KnowMyself })))
const LiveSuccess = lazy(() => import('./Activation.jsx').then((m) => ({ default: m.LiveSuccess })))
const MakeLive = lazy(() => import('./Activation.jsx').then((m) => ({ default: m.MakeLive })))
const Review = lazy(() => import('./Activation.jsx').then((m) => ({ default: m.Review })))
const ClassProgress = lazy(() => import('./Tracking.jsx').then((m) => ({ default: m.ClassProgress })))
const Nudge = lazy(() => import('./Tracking.jsx').then((m) => ({ default: m.Nudge })))
const StudentResponse = lazy(() => import('./Tracking.jsx').then((m) => ({ default: m.StudentResponse })))
const SurveyOverview = lazy(() => import('./Tracking.jsx').then((m) => ({ default: m.SurveyOverview })))

export default [
  { path: '/activity/start', element: <SelectClass /> },
  { path: '/activity/:classId/type', element: <ActivityType /> },
  { path: '/know-myself/:classId', element: <KnowMyself /> },
  { path: '/know-myself/:classId/review', element: <Review /> },
  { path: '/know-myself/:classId/live', element: <MakeLive /> },
  { path: '/know-myself/:classId/success', element: <LiveSuccess /> },
  { path: '/know-myself/:classId/progress', element: <ClassProgress /> },
  { path: '/know-myself/:classId/survey', element: <SurveyOverview /> },
  { path: '/know-myself/:classId/nudge', element: <Nudge /> },
  { path: '/know-myself/:classId/response/:studentId', element: <StudentResponse /> },
]
