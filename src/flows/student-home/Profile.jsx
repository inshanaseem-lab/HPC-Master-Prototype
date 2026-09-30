import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomActions, Modal, OutlineButton, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { STUDENT } from '../../student/data.js'
import { Card, Chevron, LogoutIcon, Overline, StudentAppBar } from './parts.jsx'

/** Student profile: details, EN / हिंदी switch, sign out. */
export default function Profile() {
  const t = useT()
  const navigate = useNavigate()
  const { language, setLanguage, showToast } = useAppStore()
  const [confirm, setConfirm] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const fields = [
    [t('Class'), t('Class {grade} {section}', { grade: STUDENT.grade, section: STUDENT.section })],
    [t('Student ID'), STUDENT.idMasked],
    [t('Roll number'), STUDENT.roll],
    [t('School'), STUDENT.school],
    [t('District'), STUDENT.district],
  ]

  const switchLang = (id) => {
    if (id === language) return
    setLanguage(id)
    showToast(id === 'hi' ? 'भाषा हिंदी में बदल दी गई' : 'Language changed to English')
  }

  const signOut = () => {
    setSigningOut(true)
    setTimeout(() => navigate('/login', { replace: true }), 600)
  }

  return (
    <Screen bg="plain" statusBar="light" header={<StudentAppBar title={t('My Profile')} />}
      footer={
        <BottomActions>
          <OutlineButton onClick={() => setConfirm(true)}><LogoutIcon size={18} />{t('Sign out')}</OutlineButton>
        </BottomActions>
      }>
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <div className="flex flex-col items-center gap-2 pt-2 text-center">
          <span className="grid size-[74px] animate-pop-in place-items-center rounded-full bg-[#ffe3cc] text-[1.375rem] font-semibold text-brand-700 shadow-[inset_0_0_0_2px_#ffa554]">
            {STUDENT.initials}
          </span>
          <p className="text-[1.25rem] font-semibold leading-7 text-ink">{STUDENT.name}</p>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {t('Class {grade} {section} · Student ID {id}', { grade: STUDENT.grade, section: STUDENT.section, id: STUDENT.idMasked })}
          </p>
        </div>

        <Card>
          <div className="px-4 pt-3.5"><Overline>{t('My details')}</Overline></div>
          {fields.map(([k, v], i) => (
            <div key={k} className={cx('flex items-start justify-between gap-4 px-4 py-3', i < fields.length - 1 && 'border-b border-[#f1efec]')}>
              <span className="text-[0.8125rem] leading-5 text-ink-muted">{k}</span>
              <span className="min-w-0 text-right text-[0.875rem] font-semibold leading-5 text-ink [overflow-wrap:anywhere]">{v}</span>
            </div>
          ))}
        </Card>

        <Card className="flex flex-wrap items-center gap-3 px-4 py-3.5">
          <div className="min-w-[10rem] flex-1">
            <p className="text-[0.875rem] font-semibold leading-5 text-ink">{t('Language')}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Choose the app language')}</p>
          </div>
          <div role="radiogroup" aria-label={t('Language')} className="relative grid shrink-0 grid-cols-2 rounded-full border border-[#ffd4ad] bg-brand-50 p-0.5">
            <span aria-hidden className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-brand shadow-sm transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${language === 'hi' ? 100 : 0}%)` }} />
            {[['en', 'EN'], ['hi', 'हिंदी']].map(([id, label]) => (
              <button key={id} role="radio" aria-checked={language === id} onClick={() => switchLang(id)}
                className={cx('tap relative z-10 min-h-11 min-w-[56px] px-3 py-1.5 text-[0.8125rem] font-semibold transition-colors',
                  language === id ? 'text-white' : 'text-brand-700 hover:text-brand-600')}>
                {label}
              </button>
            ))}
          </div>
        </Card>

        {/* GIGW: help, accessibility statement, policies, feedback */}
        <Card>
          <button
            onClick={() => navigate('/about')}
            className="tap-soft flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 py-3 text-left hover:bg-[#fffaf6]"
          >
            <span className="min-w-0 flex-1 text-[0.875rem] font-semibold leading-5 text-ink">{t('About & policies')}</span>
            <Chevron size={20} className="shrink-0 text-brand-700" />
          </button>
        </Card>

        <button onClick={() => navigate('/s/demo')} className="tap mx-auto min-h-11 px-3 text-[0.75rem] text-ink-muted underline-offset-2 hover:text-ink hover:underline">
          {t('Demo states')}
        </button>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)}>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1">
            <p className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Sign out?')}</p>
            <p className="text-[0.875rem] leading-5 text-ink-muted">{t('You can sign in again with your Student ID.')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <PrimaryButton loading={signingOut} onClick={signOut}>{t('Sign out')}</PrimaryButton>
            <OutlineButton onClick={() => setConfirm(false)}>{t('Cancel')}</OutlineButton>
          </div>
        </div>
      </Modal>
    </Screen>
  )
}
