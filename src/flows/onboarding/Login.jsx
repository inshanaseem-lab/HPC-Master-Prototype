import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeIndicator, PrimaryButton, Sheet, StatusBar, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ProvenanceChip } from '../../hpc/components.jsx'
import { ROSTER, STUDENT_ID } from '../../hpc/store.js'
import bgPattern from '../../assets/common/bg-pattern.png'
import parakh from '../../assets/common/parakh.png'
import hpEmblem from '../../assets/common/hp-emblem.png'
import poweredBy from '../../assets/common/powered-by.png'
import { LANGUAGES, onboarding } from './data.js'
import { STUDENT } from '../../student/data.js'

/**
 * Sign in (kit L-01 … L-07)
 *   '/' and '/login' → LanguageScreen: paper-plane theme, language dropdown, Continue, "Powered by" card.
 *   '/sign-in'       → SignInScreen: white-card sign in, role dropdown (Teacher / Student only),
 *                      Teacher code / Student ID, then the "Is this you?" sheet with the VSK synced label.
 *
 * Colour: brand orange #FF7900 on both heroes (product-owner decision). Note that white text on
 * #FF7900 is 2.6:1, below WCAG AA — the hero titles/labels stay white to match the kit's look.
 */
const PLANE_BG = '#ff7900'

// Demo identities (kit): Teacher Anjali Sharma 120921004 · Student Riya Thakur 123451000
const RIYA = ROSTER.find((r) => r.id === STUDENT_ID)
const DEMO_STUDENT_ID = RIYA?.studentId ?? '123451000'

/** Loads Lora italic for the tagline (falls back to the system serif italic). */
function useLora() {
  useEffect(() => {
    if (document.getElementById('font-lora-italic')) return
    const link = document.createElement('link')
    link.id = 'font-lora-italic'
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400;1,500&display=swap'
    document.head.appendChild(link)
  }, [])
}
const LORA = { fontFamily: "'Lora', Georgia, 'Times New Roman', serif", fontStyle: 'italic' }

/* ===================================================== L-01 / L-03 language */

export default function LanguageScreen() {
  useLora()
  const navigate = useNavigate()
  const t = useT()
  const { language, setLanguage } = useAppStore()
  const [picked, setPicked] = useState(onboarding.languagePicked ? language : null)
  const [open, setOpen] = useState(false)

  const pick = (id) => {
    setPicked(id)
    setLanguage(id)
    onboarding.languagePicked = true
    setOpen(false)
  }
  const current = LANGUAGES.find((l) => l.id === picked)

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ backgroundColor: PLANE_BG }}>
      <PlaneTrails />
      <StatusBar variant="clear" />

      <div className="no-scrollbar relative flex min-h-0 flex-1 flex-col overflow-y-auto px-6">
        <div className="flex flex-col items-center pt-8 text-center">
          <img src={hpEmblem} alt={t('Himachal Pradesh Government emblem')} width="126" height="88" className="animate-pop-in h-[88px] w-auto object-contain" />
          <h1 className="animate-fade-up pt-6 text-[1.75rem] font-bold leading-[2.125rem] text-white [animation-delay:80ms]">
            {t('Digital Holistic')}<br />{t('Progress Card')}
          </h1>
          <p className="animate-fade-up pt-3 text-[1.1875rem] leading-[1.625rem] text-white [animation-delay:140ms]" style={LORA}>
            {t('Not a report card.')}<br />{t('A learner’s growth story.')}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3 pb-2 pt-10">
          <p id="lang-label" className="text-[0.9375rem] font-semibold leading-[1.375rem] text-white">Choose your language · भाषा चुनें</p>
          <div className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-labelledby="lang-label"
              onClick={() => setOpen((o) => !o)}
              className="tap-soft flex min-h-[54px] w-full items-center justify-between gap-2 rounded-2xl bg-white px-4 py-2 text-left shadow-[0_8px_20px_rgba(90,30,0,0.18)]"
            >
              <span className={cx('text-[1rem] leading-6', current ? 'text-ink' : 'text-ink-muted')}>{current ? current.label : 'Select language · भाषा चुनें'}</span>
              <ChevronDown className={cx('shrink-0 text-brand-700 transition-transform duration-200', open && 'rotate-180')} />
            </button>
            {open && (
              <div role="listbox" aria-labelledby="lang-label" className="animate-fade-up absolute inset-x-0 bottom-[62px] z-20 overflow-hidden rounded-2xl bg-white p-1 shadow-[0_12px_28px_rgba(90,30,0,0.28)]" style={{ animationDuration: '.2s' }}>
                {LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    role="option"
                    aria-selected={picked === l.id}
                    onClick={() => pick(l.id)}
                    className={cx('tap-soft flex min-h-12 w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-[1rem] text-ink hover:bg-brand-50', picked === l.id && 'bg-brand-50 font-semibold')}
                  >
                    <span>{l.label}<span className="pl-2 text-[0.8125rem] font-normal text-ink-muted">{l.id === 'en' ? 'अंग्रेज़ी' : 'Hindi'}</span></span>
                    {picked === l.id && <CheckIcon className="animate-check-pop text-brand-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            disabled={!picked}
            onClick={() => navigate('/sign-in')}
            className={cx(
              'tap group mt-1 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full text-[1.0625rem] font-bold transition-colors duration-200',
              picked ? 'bg-white text-brand-700 shadow-[0_8px_20px_rgba(90,30,0,0.2)] hover:bg-brand-50' : 'bg-white/25 text-white/80 active:scale-100',
            )}
          >
            {t('Continue')}
            <span className="transition-transform duration-200 group-hover:translate-x-1"><ArrowIcon /></span>
          </button>
        </div>

        <div className="flex flex-col gap-2 pb-2 pt-6">
          <p className="text-[0.875rem] font-semibold leading-5 text-white">{t('Powered by')}</p>
          <img src={poweredBy} alt={t('PARAKH, Himachal Pradesh Board of School Education and Samagra Shiksha')} width="364" height="76" className="h-auto w-full rounded-2xl shadow-[0_8px_20px_rgba(90,30,0,0.18)]" />
        </div>
      </div>
      <div className="relative pb-2"><HomeIndicator /></div>
    </div>
  )
}

/**
 * Decorative "+" marks on the language screen (kit L-01). Per product-owner request, the plane
 * illustration, its dotted flight path and the coloured waypoint dots have been removed — only
 * these small crosses remain.
 */
/** Kit L-01 paper-plane illustration — static (no animation), drawn over the orange background. */
function PlaneTrails() {
  return (
    <svg aria-hidden viewBox="0 0 412 915" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
      {/* dotted flight path: plane → ring → loop → off the left edge */}
      <path
        d="M347 263 C330 300 318 360 300 410 C285 460 210 505 132 500 C90 497 58 452 72 414 C82 388 104 392 112 414 C124 444 136 474 132 500 C100 522 70 540 40 540 C25 540 10 542 0 545"
        fill="none" stroke="#fff" strokeOpacity=".72" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 7"
      />
      {/* dotted line behind "Powered by" */}
      <path d="M0 808 C120 802 260 796 412 780" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 7" />

      {/* waypoints */}
      <circle cx="300" cy="410" r="16" fill="#fff" fillOpacity=".28" />
      <circle cx="300" cy="410" r="10.5" fill="#d7eef5" />
      <circle cx="132" cy="500" r="8.5" fill="#fde2a4" />
      <circle cx="92" cy="400" r="6.5" fill="#f7c3d6" />
      <circle cx="40" cy="540" r="5" fill="#c9c6ff" />
      <circle cx="92" cy="172" r="3.5" fill="#f5c9a3" />
      <circle cx="211" cy="324" r="3.5" fill="#fde2a4" />
      <circle cx="305" cy="789" r="4.5" fill="#fde2a4" />

      {/* paper plane */}
      <path d="M336 246 L404 232 L364 260 Z" fill="#fff" />
      <path d="M404 232 L370 283 L364 260 Z" fill="#fde2a4" />
      <path d="M364 260 L370 283 L356 263 Z" fill="#7a3a12" />

      {/* sparkles */}
      <g stroke="#fde2a4" strokeWidth="2.4" strokeLinecap="round"><path d="M380 122v14M373 129h14" /></g>
      <g stroke="#c9c6ff" strokeWidth="2.4" strokeLinecap="round"><path d="M38 264v14M31 271h14" /></g>
      <g stroke="#f7c3d6" strokeWidth="2.4" strokeLinecap="round"><path d="M320 502v14M313 509h14" /></g>
    </svg>
  )
}

/* ================================================= L-04 / L-05 sign in (white card) */

const ROLES = [
  { id: 'teacher', en: 'Teacher', hi: 'शिक्षक', icon: <TeacherIcon /> },
  { id: 'student', en: 'Student', hi: 'विद्यार्थी', icon: <StudentIcon /> },
]

export function SignInScreen() {
  const navigate = useNavigate()
  const t = useT()
  const { teacher, showToast } = useAppStore()

  const [role, setRole] = useState(onboarding.userType)
  const [roleOpen, setRoleOpen] = useState(false)
  const [id, setId] = useState(onboarding.teacherId ?? '')
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const inputRef = useRef(null)

  const isStudent = role === 'student'
  const valid = /^\d{9}$/.test(id)
  const canSubmit = !!role && id.length > 0
  const idLabel = isStudent ? t('Student ID') : t('Teacher code')

  useEffect(() => { onboarding.userType = role }, [role])

  const chooseRole = (r) => {
    setRoleOpen(false)
    if (r === role) return
    setRole(r); setId(''); setError('')
    setTimeout(() => inputRef.current?.focus(), 60)
  }

  const fail = (msg) => {
    setError(msg)
    setShaking(false)
    requestAnimationFrame(() => setShaking(true))
    inputRef.current?.focus()
  }

  const submit = (e) => {
    e?.preventDefault()
    if (!canSubmit || loading) return
    if (!valid) return fail(isStudent ? t('Enter your 9-digit Student ID') : t('Enter your 9-digit Teacher code'))
    if (!navigator.onLine) return fail(t('You’re offline. Connect to the internet and try again.'))
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Prototype: only the demo identities exist in the VSK mock
      if (id !== (isStudent ? DEMO_STUDENT_ID : teacher.code)) {
        fail(isStudent ? t('No student found with this ID. Check it and try again.') : t('No teacher found with this code. Check it and try again.'))
        return
      }
      onboarding.teacherId = id
      setConfirmOpen(true)
    }, 700)
  }

  const person = isStudent
    ? {
        heading: t('Student Details'),
        rows: [
          [t('Student Name'), STUDENT.name],
          [t('Student ID'), DEMO_STUDENT_ID],
          [t('Class'), t('Class {grade} {section}', { grade: STUDENT.grade, section: STUDENT.section })],
          [t('School Name'), teacher.school],
          [t('School ID'), teacher.schoolId],
          [t('Block'), teacher.block],
          [t('District'), teacher.district],
        ],
      }
    : {
        heading: t('Teacher Details'),
        rows: [
          [t('Teacher Name'), teacher.name],
          [t('Teacher code'), teacher.code],
          [t('School Name'), teacher.school],
          [t('School ID'), teacher.schoolId],
          [t('Block'), teacher.block],
          [t('District'), teacher.district],
        ],
      }

  const confirm = () => {
    setConfirming(true)
    setTimeout(() => navigate(isStudent ? '/s/home' : '/home', { replace: true }), 650)
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      {/* ------------------------------------------------------------- Hero */}
      <div className="relative shrink-0 overflow-hidden bg-[linear-gradient(155deg,#ff9a3c_0%,#ff7900_45%,#e86e00_100%)] pb-12">
        <div aria-hidden className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: `url(${bgPattern})`, backgroundSize: '180px 180px', filter: 'invert(1)' }} />
        <div aria-hidden className="absolute -right-16 -top-10 size-56 animate-drift rounded-full bg-white/10 blur-2xl" />

        <StatusBar variant="clear" />

        <div className="relative flex items-center justify-between px-3 pt-1">
          <button type="button" aria-label={t('Back')} onClick={() => navigate('/login')} className="tap grid size-11 place-items-center rounded-xl bg-white/15 text-white hover:bg-white/25">
            <BackIcon />
          </button>
          <span className="flex items-center gap-1.5 pr-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-white">
            <span className="size-1.5 rounded-full bg-white" /> HPC{role ? ` · ${isStudent ? t('Student') : t('Teacher')}` : ''}
          </span>
        </div>

        <div className="relative flex flex-col items-center px-6 pt-3 text-center">
          <div className="animate-pop-in grid size-[76px] place-items-center rounded-[24px] bg-white shadow-[0_14px_30px_rgba(80,25,0,0.3)]">
            <img alt="PARAKH" src={parakh} width="52" height="52" className="object-contain" />
          </div>
          <h1 className="animate-fade-up pt-4 text-[1.5rem] font-semibold leading-8 text-white [animation-delay:80ms]">{t('Who is signing in?')}</h1>
          <p className="animate-fade-up pt-1 text-[0.875rem] leading-5 text-white [animation-delay:140ms]">{t('Choose your role to continue')}</p>
        </div>
      </div>

      {/* -------------------------------------------------------------- Card */}
      <form onSubmit={submit} className="relative -mt-7 flex min-h-0 flex-1 flex-col rounded-t-[32px] bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
        <div className="no-scrollbar flex-1 overflow-y-auto px-5 pt-7">
          <div className="stagger">
            <h2 className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Sign in')}</h2>
            <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
              {!role ? t('Tell us who you are, then enter your ID.') : isStudent ? t('Welcome! Sign in with your Student ID to see your progress card.') : t('Welcome! Sign in with your Teacher code to continue.')}
            </p>
          </div>

          {/* Role dropdown */}
          <div className="relative z-30 animate-fade-up pt-6 [animation-delay:120ms]">
            <p id="role-label" className="pb-2 text-[0.8125rem] font-semibold leading-5 text-ink-2">I am a · मैं हूँ</p>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={roleOpen}
              aria-labelledby="role-label"
              onClick={() => setRoleOpen((o) => !o)}
              className={cx(
                'tap-soft flex min-h-[3.625rem] w-full items-center gap-3 rounded-2xl border bg-[#faf8f6] px-4 py-2 text-left transition-[border-color,box-shadow] duration-200',
                roleOpen ? 'border-brand bg-white shadow-[0_0_0_4px_rgba(255,121,0,0.14)]' : 'border-line hover:border-[#d2cdc7]',
              )}
            >
              <span className={cx('shrink-0', role ? 'text-brand-700' : 'text-ink-muted')}>{role ? ROLES.find((r) => r.id === role).icon : <PersonIcon />}</span>
              <span className={cx('min-w-0 flex-1 text-[1rem] leading-6', role ? 'font-semibold text-ink' : 'font-medium text-ink-muted')}>
                {role ? (() => { const r = ROLES.find((x) => x.id === role); return `${r.en} · ${r.hi}` })() : t('Select your role')}
              </span>
              <ChevronDown className={cx('shrink-0 text-ink-muted transition-transform duration-200', roleOpen && 'rotate-180')} />
            </button>
            {roleOpen && (
              <div role="listbox" aria-labelledby="role-label" className="animate-fade-up absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-line bg-white p-1 shadow-[0_12px_28px_rgba(0,0,0,0.12)]" style={{ animationDuration: '.2s' }}>
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    role="option"
                    aria-selected={role === r.id}
                    onClick={() => chooseRole(r.id)}
                    className={cx('tap-soft flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[0.9375rem] text-ink hover:bg-brand-50', role === r.id && 'bg-brand-50 font-semibold')}
                  >
                    <span className="shrink-0 text-brand-700">{r.icon}</span>
                    <span className="min-w-0 flex-1">{r.en} · {r.hi}</span>
                    {role === r.id && <CheckIcon className="animate-check-pop text-brand-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Teacher code / Student ID */}
          {role && (
            <div key={role} className="animate-fade-up pt-5">
              <div
                onAnimationEnd={() => setShaking(false)}
                className={cx(
                  'relative flex h-[3.625rem] items-center gap-3 rounded-2xl border bg-[#faf8f6] px-4 transition-[border-color,box-shadow,background-color] duration-200',
                  error
                    ? cx('border-danger bg-white shadow-[0_0_0_4px_rgba(181,74,69,0.12)]', shaking && 'animate-shake')
                    : focused ? 'border-brand bg-white shadow-[0_0_0_4px_rgba(255,121,0,0.14)]' : 'border-line hover:border-[#d2cdc7]',
                )}
                onClick={() => inputRef.current?.focus()}
              >
                <span className={cx('shrink-0 transition-colors', focused || id ? 'text-brand-700' : 'text-ink-muted')}><IdCardIcon /></span>
                <div className="relative min-w-0 flex-1 self-stretch">
                  <label
                    htmlFor="login-id"
                    className={cx(
                      'pointer-events-none absolute left-0 origin-left transition-all duration-200',
                      focused || id ? 'top-[0.5625rem] text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-brand-600' : 'top-1/2 -translate-y-1/2 text-[0.9375rem] font-medium text-ink-muted',
                      error && (focused || id) && '!text-danger',
                    )}
                  >
                    {idLabel}
                  </label>
                  <input
                    ref={inputRef}
                    id="login-id"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={9}
                    value={id}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => { setId(e.target.value.replace(/\D/g, '')); setError('') }}
                    aria-invalid={!!error}
                    aria-describedby="login-id-hint"
                    className="absolute inset-x-0 bottom-[0.4375rem] h-6 bg-transparent text-[1.0625rem] font-semibold tracking-[0.12em] text-ink outline-none"
                  />
                </div>
                {valid && !error ? (
                  <span className="grid size-6 shrink-0 animate-check-pop place-items-center rounded-full bg-[#1e6b3a] text-white"><CheckIcon width="14" height="14" /></span>
                ) : id ? (
                  <button type="button" aria-label={t('Clear')} onClick={(e) => { e.stopPropagation(); setId(''); setError(''); inputRef.current?.focus() }} className="tap group/clear -mr-2 grid size-11 shrink-0 place-items-center rounded-full">
                    <span className="grid size-8 place-items-center rounded-full bg-[#e9e5e1] text-ink-muted group-hover/clear:bg-[#dcd7d2]"><CloseIcon /></span>
                  </button>
                ) : null}
              </div>
              <p id="login-id-hint" role={error ? 'alert' : undefined} className={cx('px-1 pt-2 text-[0.75rem] leading-4', error ? 'animate-fade-up font-medium text-danger' : 'text-ink-muted')}>
                {error || (isStudent
                  ? t('Ask your class teacher if you don’t know it · Demo: {id}', { id: DEMO_STUDENT_ID })
                  : t('You’ll find it on your school ID card · Demo: {id}', { id: teacher.code }))}
              </p>
            </div>
          )}
        </div>

        <div className="shrink-0 px-5 pb-6 pt-3">
          <PrimaryButton type="submit" disabled={!canSubmit} loading={loading} className="group !min-h-[54px] text-[1rem] font-semibold">
            {t('Continue')}
            <span className="transition-transform duration-200 group-hover:translate-x-1"><ArrowIcon /></span>
          </PrimaryButton>
          <p className="pt-3 text-center text-[0.8125rem] leading-5 text-ink-muted">
            {t('Trouble signing in?')}{' '}
            <button type="button" onClick={() => showToast(isStudent ? t('Please ask your class teacher for your Student ID') : t('Please contact your school admin for your Teacher code'))} className="tap inline-flex min-h-11 items-center px-1 font-semibold text-brand-700 underline-offset-2 hover:underline">
              {t('Get help')}
            </button>
          </p>
          <HomeIndicator />
        </div>
      </form>

      {/* ------------------------------------------------ L-06 / L-07 Is this you? */}
      <Sheet open={confirmOpen} onClose={() => !confirming && setConfirmOpen(false)}>
        <div className="px-5 pb-6 pt-4" role="dialog" aria-label={t('Is this you?')}>
          <p className="text-[1.5rem] font-bold leading-8 text-ink">{t('Is this you?')}</p>
          <p className="pt-0.5 text-[0.9375rem] leading-[1.375rem] text-ink-muted">{t('Please check your details')}</p>

          <div className="mt-4 rounded-2xl border border-line bg-white p-4 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <p className="text-[1rem] font-bold leading-6 text-ink">{person.heading}</p>
              <ProvenanceChip kind="vsk" />
            </div>
            <dl className="stagger flex flex-col gap-3 pt-3">
              {person.rows.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.8125rem] leading-5 text-ink-muted">{label}</dt>
                  <dd className="break-words text-[1rem] font-semibold leading-6 text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <PrimaryButton loading={confirming} onClick={confirm} className="group mt-5 !min-h-[52px] font-semibold">
            {t('Confirm and Proceed')} <span className="transition-transform duration-200 group-hover:translate-x-1"><ArrowIcon /></span>
          </PrimaryButton>
          <button
            type="button"
            disabled={confirming}
            onClick={() => { setConfirmOpen(false); setTimeout(() => { setId(''); inputRef.current?.focus() }, 250) }}
            className="tap mt-2 min-h-12 w-full rounded-full text-[0.9375rem] font-semibold text-brand-700 hover:bg-brand-50"
          >
            {t('Not me')}
          </button>
        </div>
      </Sheet>
    </div>
  )
}

/* Icons (24px line icons, currentColor) */
function I(props) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props} /> }
function IdCardIcon() { return <I width="22" height="22"><rect x="3" y="5" width="18" height="14" rx="3" /><circle cx="9" cy="11" r="2" /><path d="M6.5 16c.5-1.3 1.4-2 2.5-2s2 .7 2.5 2M14 10h4M14 13.5h3" /></I> }
function TeacherIcon() { return <I><circle cx="12" cy="7.5" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></I> }
function StudentIcon() { return <I><path d="M2.5 9 12 4.5 21.5 9 12 13.5z" /><path d="M6.5 11v4.5c1.5 1.5 3.4 2.2 5.5 2.2s4-.7 5.5-2.2V11M21.5 9v5" /></I> }
function PersonIcon() { return <I><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></I> }
const CheckIcon = (p) => <I strokeWidth="2.6" {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></I>
const CloseIcon = () => <I width="12" height="12" strokeWidth="2.6"><path d="M6 6l12 12M18 6 6 18" /></I>
const ArrowIcon = () => <I><path d="M5 12h14M13 6l6 6-6 6" /></I>
const BackIcon = () => <I width="22" height="22" strokeWidth="2.2"><path d="M19 12H5M11 6l-6 6 6 6" /></I>
const ChevronDown = ({ className }) => <I className={className} strokeWidth="2.2"><path d="m6 9 6 6 6-6" /></I>
