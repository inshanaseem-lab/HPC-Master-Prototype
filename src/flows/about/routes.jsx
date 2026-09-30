import { lazy } from 'react'

// About & policies micro-frontend (GIGW mandatory pages). Screens are code-split.
const AboutList = lazy(() => import('./About.jsx'))
const AboutPage = lazy(() => import('./About.jsx').then((m) => ({ default: m.AboutPage })))

export default [
  { path: '/about', element: <AboutList /> },
  { path: '/about/:page', element: <AboutPage /> },
]
