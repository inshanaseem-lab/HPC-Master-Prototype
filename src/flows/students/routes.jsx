import { lazy } from 'react'
import { provide } from '../../platform/services.js'
import { liveActivitiesFor } from './data.js'

// Services this MFE exposes to others (see src/platform/services.js)
provide('students.liveActivities', liveActivitiesFor)

// Screens are code-split: this micro-frontend's screens download on first visit
const StudentSearch = lazy(() => import('./StudentSearch.jsx'))
const StudentReport = lazy(() => import('./StudentReport.jsx'))
const StudentDetails = lazy(() => import('./StudentDetails.jsx'))
const ClassOverview = lazy(() => import('./ClassOverview.jsx'))
const MyHpc = lazy(() => import('./MyHpc.jsx'))

export default [
  { path: '/students', element: <StudentSearch /> },
  { path: '/students/:studentId', element: <StudentReport /> },
  { path: '/students/:studentId/details', element: <StudentDetails /> },
  { path: '/class/:classId', element: <ClassOverview /> },
  // Student app: My Live HPC (same report, read-only)
  { path: '/s/hpc', element: <MyHpc /> },
]
