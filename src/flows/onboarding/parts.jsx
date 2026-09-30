import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, cx } from '../../components/ui.jsx'
import arrowLeft from '../../assets/onboarding/arrow-left.svg'
import alertCircle from '../../assets/onboarding/alert-circle.svg'
import { useT } from '../../i18n/index.js'

/** White nav bar with left arrow and centred title (Add / Remove classes, My Profile). */
export function NavHeader({ title, onBack, className }) {
  const navigate = useNavigate()
  const t = useT()
  return (
    // Grows with the text (large OS font / Hindi): the title wraps instead of truncating.
    <div className={cx('relative flex min-h-16 shrink-0 items-center gap-1 border-b border-[#e6ddd6] bg-white px-2 py-2', className)}>
      <button
        aria-label={t('Back')}
        onClick={onBack ?? (() => navigate(-1))}
        className="tap grid size-11 shrink-0 place-items-center rounded-lg hover:bg-black/5"
      >
        <img alt="" width="24" height="24" src={arrowLeft} />
      </button>
      <h1 className="min-w-0 flex-1 break-words text-center text-[1.125rem] font-bold leading-6 text-[#211a17]">{title}</h1>
      <span aria-hidden="true" className="w-11 shrink-0" />
    </div>
  )
}

/**
 * "Do you want to remove 9-A?" confirm dialog — or, when the class has live activities
 * (`live` = [{ short }]), the kit T02-03 "You can’t remove 9-A yet" message with the list.
 */
export function RemoveClassModal({ cls, live = [], onConfirm, onCancel }) {
  const t = useT()
  const [last, setLast] = useState(cls)
  const [lastLive, setLastLive] = useState(live)
  useEffect(() => { if (cls) { setLast(cls); setLastLive(live) } }, [cls]) // eslint-disable-line react-hooks/exhaustive-deps
  const label = last ? `${last.grade}-${last.section}` : ''
  if (lastLive.length) {
    return (
      <Modal open={!!cls} onClose={onCancel} className="max-w-[344px] overflow-hidden rounded-2xl bg-white">
        <div className="flex flex-col items-center gap-4 p-5" role="alertdialog" aria-label={t('You can’t remove {label} yet', { label })}>
          <div className="animate-check-pop rounded-full bg-[#fde7d6] p-5">
            <img alt="" width="32" height="32" src={alertCircle} />
          </div>
          <div className="flex w-full flex-col gap-2 text-center">
            <p className="text-[1.125rem] font-bold leading-7 text-ink">{t('You can’t remove {label} yet', { label })}</p>
            <p className="text-[0.875rem] leading-5 text-ink-muted">
              {t(lastLive.length === 1 ? '{label} has {n} live activity. You can remove this class once it is completed.' : '{label} has {n} live activities. You can remove this class once they are completed.', { label, n: lastLive.length })}
            </p>
          </div>
          <ul className="stagger flex w-full flex-col gap-2">
            {lastLive.map((a) => (
              <li key={a.id} className="rounded-xl bg-[#f7f5f2] px-3.5 py-2.5 text-[0.875rem] leading-5 text-ink">
                {translateShort(t, a.short ?? a.title)} · <span className="font-semibold text-[#1b6b34]">{t('Live')}</span>
              </li>
            ))}
          </ul>
          <button onClick={onCancel} className="tap mt-1 min-h-12 w-full rounded-full bg-brand text-[0.9375rem] font-semibold text-white hover:bg-brand-hover">{t('OK')}</button>
        </div>
      </Modal>
    )
  }
  return (
    <Modal open={!!cls} onClose={onCancel} className="max-w-[336px] overflow-hidden rounded-lg border border-[#e2c7b0] bg-[#fefefe] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col items-center gap-6 p-4" role="alertdialog" aria-label={t('Remove {label}', { label })}>
        <div className="animate-check-pop rounded-[47.5px] bg-[#fde7d6] p-6">
          <img alt="" width="54" height="54" src={alertCircle} />
        </div>
        <div className="flex w-full flex-col gap-2 text-center">
          <p className="text-[1.125rem] font-bold leading-7 text-[#0e0805]">{t('Do you want to remove {label}?', { label })}</p>
          <p className="text-[0.875rem] leading-[1.1875rem] text-ink-muted">
            {t('Note: If last grade is removed then you won’t be able to conduct HPC Activities')}
          </p>
        </div>
        <div className="flex w-full items-center gap-2">
          <button
            onClick={onConfirm}
            className="tap min-h-11 flex-1 rounded-full bg-brand text-[0.875rem] font-medium text-white shadow-[inset_-2px_-2px_2px_0px_rgba(15,23,42,0.14),inset_2px_2px_2px_0px_rgba(255,255,255,0.9)] transition-colors hover:bg-brand-hover"
          >
            {t('Yes')}
          </button>
          <button onClick={onCancel} className="tap min-h-11 flex-1 rounded-full text-[0.875rem] font-medium text-brand-700 transition-colors hover:bg-[#fff1e8]">
            {t('Cancel')}
          </button>
        </div>
      </div>
    </Modal>
  )
}

/** "A3 · Time Management" → code kept, title translated. */
export function translateShort(t, s) {
  const [code, ...rest] = String(s).split(' · ')
  return rest.length ? `${code} · ${t(rest.join(' · '))}` : t(s)
}
