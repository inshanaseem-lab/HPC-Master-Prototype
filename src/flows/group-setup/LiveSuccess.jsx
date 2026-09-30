import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BottomActions, OutlineButton, PrimaryButton, Screen } from '../../components/ui.jsx'
import checkIcon from '../../assets/group-setup/live-check.svg'
import { useDate, useT } from '../../i18n/index.js'
import { GROUP_PROJECT } from '../../hpc/config.js'
import { formatLong } from '../../hpc/components.jsx'
import { useBActivity } from '../group-live/lib.js'
import { GPHeader, useClassInfo } from './parts.jsx'
import { clearGroupSetup } from './store.js'

/** Group Project · Live success (kit T05-14). */
export default function LiveSuccess() {
  const navigate = useNavigate()
  const t = useT()
  const d = useDate()
  const { classId, name } = useClassInfo()
  const a = useBActivity(classId)
  useEffect(() => { clearGroupSetup(classId) }, [classId])
  if (!a) return <Navigate to={`/group-project/${classId}`} replace />
  const n = Object.keys(a.groups).length

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<GPHeader step="3 / 3" onBack={() => navigate('/home')} />}
      footer={
        <BottomActions>
          <div className="flex flex-col gap-3">
            <PrimaryButton className="font-bold" onClick={() => navigate('/home')}>{t('Back to Home')}</PrimaryButton>
            <OutlineButton className="font-bold" onClick={() => navigate(`/group-project/${classId}/progress`, { replace: true })}>{t('Track progress')}</OutlineButton>
          </div>
        </BottomActions>
      }
    >
      <div className="flex min-h-full flex-col items-center justify-center gap-3 p-4 text-center">
        <div className="grid size-16 animate-pop-in place-items-center rounded-full bg-[#eaf6ec]">
          <img alt="" width="30" height="30" src={checkIcon} />
        </div>
        <div className="stagger flex flex-col items-center gap-3">
          <h2 className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Activity is now live!')}</h2>
          <p className="max-w-[20rem] text-[1rem] leading-6 text-ink-muted">
            {t('“{title}” is now live for {cls}. Students will see Stage 1 in their app.', { title: t(a.title), cls: name })}
          </p>
          <p className="text-[0.9375rem] font-medium text-ink-2">{n === 1 ? t('1 group') : t('{n} groups', { n })}</p>
          <div className="mt-1 w-full max-w-[20rem] rounded-2xl border border-line bg-white p-3 text-left">
            {GROUP_PROJECT.stages.map((s) => (
              <p key={s.id} className="flex flex-wrap justify-between gap-x-3 py-1 text-[0.875rem]">
                <span className="text-ink-muted">{t(s.label)} · {t(s.name)}</span>
                <span className="font-semibold text-ink">{d(formatLong(a.stageDates?.[s.id]))}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}
