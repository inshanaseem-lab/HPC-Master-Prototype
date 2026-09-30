import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// Screens are code-split: this micro-frontend's screens download on first visit
const LanguageScreen = lazy(() => import('./Login.jsx'))
const SignInScreen = lazy(() => import('./Login.jsx').then((m) => ({ default: m.SignInScreen })))
const HomeScreen = lazy(() => import('./Home.jsx'))
const ActionItemsScreen = lazy(() => import('./ActionItems.jsx'))
const ManageClassesScreen = lazy(() => import('./ManageClasses.jsx'))
const ProfileScreen = lazy(() => import('./Profile.jsx'))

export default [
  // Kit L-01/L-03 (language) → L-04/L-05 (role + ID) → L-06/L-07 (Is this you?)
  { path: '/', element: <LanguageScreen /> },
  { path: '/login', element: <LanguageScreen /> },
  { path: '/sign-in', element: <SignInScreen /> },
  ...['/language', '/user-type', '/teacher-id', '/teacher-details'].map((path) => ({
    path,
    element: <Navigate to="/login" replace />,
  })),
  { path: '/home', element: <HomeScreen /> },
  { path: '/action-items', element: <ActionItemsScreen /> },
  { path: '/classes/manage', element: <ManageClassesScreen /> },
  { path: '/profile', element: <ProfileScreen /> },
]
