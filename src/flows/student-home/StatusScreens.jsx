import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomActions, OutlineButton, PrimaryButton, Screen, StatusBar, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { HelpCircle, WifiOff } from './parts.jsx'

function StatusBody({ tone, icon, title, body, shake }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <span className={cx('grid size-[72px] animate-pop-in place-items-center rounded-full', tone === 'error' ? 'bg-[#fbedec] text-[#b54a45]' : 'bg-[#f1efec] text-ink-2', shake && 'animate-shake')}>
        {icon}
      </span>
      <h1 className="animate-fade-up text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{title}</h1>
      <p className="max-w-[18rem] animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>
    </div>
  )
}

/**
 * 11.3 content. `onRetry` resolves true when back online.
 * Used both as the /s/offline screen and as the automatic overlay on /s/home.
 */
export function OfflinePanel({ onBack }) {
  const t = useT()
  const { showToast } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(0)
  const retry = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (navigator.onLine) { onBack?.(); return }
      setShake((n) => n + 1)
      showToast(t('Still offline. Check your connection.'), 'error')
    }, 600)
  }
  return (
    <div className="flex h-full flex-col bg-surface">
      <StatusBar variant="light" />
      <div className="flex-1">
        <StatusBody key={shake} shake={shake > 0} icon={<WifiOff size={36} />} title={t('No internet connection')}
          body={t('Connect to mobile data or Wi-Fi to load your activities.')} />
      </div>
      <BottomActions>
        <PrimaryButton loading={loading} onClick={retry}>{t('Retry')}</PrimaryButton>
      </BottomActions>
    </div>
  )
}

export function OfflineScreen() {
  const navigate = useNavigate()
  const back = () => (window.history.length > 1 ? navigate(-1) : navigate('/s/home', { replace: true }))
  return <OfflinePanel onBack={back} />
}

/** 11.5 Something went wrong. */
export function ErrorScreen() {
  const t = useT()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const retry = () => {
    setLoading(true)
    setTimeout(() => (window.history.length > 1 ? navigate(-1) : navigate('/s/home', { replace: true })), 600)
  }
  return (
    <Screen bg="plain" statusBar="light"
      footer={
        <BottomActions className="flex flex-col gap-3">
          <PrimaryButton loading={loading} onClick={retry}>{t('Try Again')}</PrimaryButton>
          <OutlineButton onClick={() => navigate('/s/home')}>{t('Back to Home')}</OutlineButton>
        </BottomActions>
      }
    >
      <StatusBody tone="error" icon={<HelpCircle size={36} />} title={t('Something went wrong')}
        body={t('We couldn’t load this activity. Please try again in a moment.')} />
    </Screen>
  )
}
