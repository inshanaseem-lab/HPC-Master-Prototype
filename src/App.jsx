import { Suspense } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { ToastHost } from './components/ui.jsx'
import { MfeBoundary, RouteAnnouncer, ScreenSkeleton } from './platform/shell.jsx'

/**
 * Platform shell. Every micro-frontend lives in src/flows/<mfe>/ and exports its route table from
 * routes.jsx (screens inside are lazy, so each MFE downloads on first visit):
 *   export default [{ path: '/home', element: <Home /> }, ...]
 * Route tables are small and eager; screens are code-split.
 */
const modules = import.meta.glob('./flows/*/routes.jsx', { eager: true })
const routes = Object.entries(modules).flatMap(([file, m]) => {
  const mfe = file.split('/')[2]
  return (m.default ?? []).map((r) => ({ ...r, mfe }))
})

export default function App() {
  const location = useLocation()
  const navType = useNavigationType()
  // Push = new screen slides in from the right, back (POP) = from the left
  const anim = navType === 'POP' ? 'animate-slide-in-left' : 'animate-slide-in-right'

  return (
    // Surround: light canvas on tablets, dark only for the desktop device preview
    <div className="flex min-h-full items-stretch justify-center bg-[#e9e6e1] lg:items-center lg:bg-[#2b2a2e] lg:py-6">
      {/*
        Responsive frame (no stretching):
          ≤ 480 px      full-bleed phone
          481–1023 px   centred 480 px column (tablets, large phones in landscape)
          ≥ 1024 px     412 × 915 device preview
      */}
      <div
        id="phone-frame"
        className="relative h-[100dvh] w-full overflow-hidden bg-surface col:max-w-[480px] col:shadow-[0_0_0_1px_#e4e1dd,0_10px_40px_rgba(0,0,0,0.08)] lg:h-[min(915px,calc(100dvh-48px))] lg:w-[412px] lg:rounded-[36px] lg:shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:ring-8 lg:ring-black"
      >
        <RouteAnnouncer />
        <div key={location.pathname} className={`h-full w-full ${anim}`}>
          <Routes location={location}>
            {routes.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={
                  <MfeBoundary mfe={r.mfe} resetKey={location.pathname}>
                    <Suspense fallback={<ScreenSkeleton />}>{r.element}</Suspense>
                  </MfeBoundary>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
        <ToastHost />
      </div>
    </div>
  )
}
