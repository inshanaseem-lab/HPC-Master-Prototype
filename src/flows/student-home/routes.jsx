import { lazy } from 'react'

// Screens are code-split: this micro-frontend's screens download on first visit
const Home = lazy(() => import('./Home.jsx'))
const Activities = lazy(() => import('./Activities.jsx'))
const GroupScreen = lazy(() => import('./GroupScreen.jsx'))
const CompletedView = lazy(() => import('./CompletedView.jsx'))
const Profile = lazy(() => import('./Profile.jsx'))
const Demo = lazy(() => import('./Demo.jsx'))
const ErrorScreen = lazy(() => import('./StatusScreens.jsx').then((m) => ({ default: m.ErrorScreen })))
const OfflineScreen = lazy(() => import('./StatusScreens.jsx').then((m) => ({ default: m.OfflineScreen })))

export default [
  { path: '/s/home', element: <Home /> },
  // /s/hpc (My Live HPC) is served by the students MFE, which owns the HPC report
  { path: '/s/activities', element: <Activities /> },
  { path: '/s/group/:groupId', element: <GroupScreen /> },
  { path: '/s/completed/:id', element: <CompletedView /> },
  { path: '/s/profile', element: <Profile /> },
  { path: '/s/offline', element: <OfflineScreen /> },
  { path: '/s/error', element: <ErrorScreen /> },
  { path: '/s/demo', element: <Demo /> },
]
