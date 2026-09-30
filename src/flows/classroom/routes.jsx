import { lazy } from 'react'
import { provide } from '../../platform/services.js'
import { getClassroomLive } from './store.js'

// Services this MFE exposes to others (see src/platform/services.js)
provide('classroom.getLive', getClassroomLive)

// Screens are code-split: this micro-frontend's screens download on first visit
const SelectType = lazy(() => import('./SelectType.jsx'))
const Setup = lazy(() => import('./Setup.jsx'))
const Groups = lazy(() => import('./Groups.jsx'))
const MakeLive = lazy(() => import('./MakeLive.jsx'))
const LiveSuccess = lazy(() => import('./Success.jsx').then((m) => ({ default: m.LiveSuccess })))
const EvaluationSuccess = lazy(() => import('./Success.jsx').then((m) => ({ default: m.EvaluationSuccess })))
const ClassLive = lazy(() => import('./ClassLive.jsx'))
const Overview = lazy(() => import('./Overview.jsx'))
const Responses = lazy(() => import('./Responses.jsx'))
const Evaluate = lazy(() => import('./Evaluate.jsx'))
const Feedback = lazy(() => import('./Feedback.jsx'))

export default [
  // Activation
  { path: '/classroom/:classId', element: <SelectType /> },
  { path: '/classroom/:classId/setup', element: <Setup /> },
  { path: '/classroom/:classId/groups', element: <Groups /> },
  { path: '/classroom/:classId/live', element: <MakeLive /> },
  { path: '/classroom/:classId/live/success', element: <LiveSuccess /> },
  // Progress tracking
  { path: '/classroom/:classId/progress', element: <ClassLive /> },
  { path: '/classroom/:classId/overview', element: <Overview /> },
  { path: '/classroom/:classId/responses', element: <Responses /> },
  // Evaluate
  { path: '/classroom/:classId/evaluate/:id', element: <Evaluate /> },
  { path: '/classroom/:classId/feedback/:id', element: <Feedback /> },
  { path: '/classroom/:classId/evaluated/:id', element: <EvaluationSuccess /> },
]
