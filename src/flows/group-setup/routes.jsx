import { lazy } from 'react'

// Screens are code-split: this micro-frontend's screens download on first visit
const Setup = lazy(() => import('./Setup.jsx'))
const GroupRules = lazy(() => import('./GroupRules.jsx'))
const ManageGroups = lazy(() => import('./ManageGroups.jsx'))
const MakeLive = lazy(() => import('./MakeLive.jsx'))
const LiveSuccess = lazy(() => import('./LiveSuccess.jsx'))

// Handbook Part B Page 1 + kit T05: Setup (Discussion held) → Groups → Stage dates & review → Live
export default [
  { path: '/group-project/:classId', element: <Setup /> },
  { path: '/group-project/:classId/groups', element: <GroupRules /> },
  { path: '/group-project/:classId/groups/manage', element: <ManageGroups /> },
  { path: '/group-project/:classId/live', element: <MakeLive /> },
  { path: '/group-project/:classId/success', element: <LiveSuccess /> },
]
