import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoverTrails, HomeIndicator, Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import bgPattern from '../../assets/common/bg-pattern.png'
import trash from '../../assets/onboarding/trash.svg'
import plus from '../../assets/onboarding/plus.svg'
import bank from '../../assets/onboarding/bank.svg'
import separator from '../../assets/onboarding/separator.svg'
import separatorV32 from '../../assets/onboarding/separator-v32.svg'
import separatorV58 from '../../assets/onboarding/separator-v58.svg'
import { LANGUAGES, PROFILE, gradeLabel } from './data.js'
import { useMultiStage } from '../../hpc/store.js'
import { getService } from '../../platform/services.js'

// Owned by the students MFE (service registry)
const liveActivitiesFor = (classId, ms) => getService('students.liveActivities', [])(classId, ms)
import { ProvenanceChip } from '../../hpc/components.jsx'
import { NavHeader, RemoveClassModal } from './parts.jsx'

const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

function Field({ label, value }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
      <p className="text-[1rem] font-medium leading-5 text-slate-500">{label}</p>
      <p className="text-[1.125rem] font-semibold leading-6 text-[#334155] [overflow-wrap:anywhere]">{value}</p>
    </div>
  )
}

/** Two fields split by a vertical separator. */
function FieldPair({ a, b, tall }) {
  const h = tall ? 58 : 32
  return (
    <div className="flex items-center gap-6">
      <Field {...a} />
      <div className="flex w-0 shrink-0 items-center justify-center" style={{ height: h }}>
        <img alt="" src={tall ? separatorV58 : separatorV32} width={h} height="1" className="max-w-none -rotate-90" />
      </div>
      <Field {...b} />
    </div>
  )
}

const Separator = () => <img alt="" src={separator} width="380" height="1" className="block h-px w-full" />

function SectionHeading({ icon, children }) {
  return (
    <div className="flex items-center gap-2">
      {icon && <img alt="" width="24" height="24" src={icon} />}
      <h2 className="text-[1.125rem] font-bold leading-7 text-[#1a1c1e]">{children}</h2>
    </div>
  )
}

/** EN / हिंदी segmented toggle for the orange cover (same pattern as the Login toggle). */
function LanguageToggle({ value, onChange, label }) {
  const idx = Math.max(0, LANGUAGES.findIndex((l) => l.id === value))
  return (
    <div role="radiogroup" aria-label={label} className="relative grid shrink-0 grid-cols-2 rounded-full border border-white/50 bg-white/20 p-0.5 backdrop-blur-sm">
      <span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{ transform: `translateX(${idx * 100}%)` }}
      />
      {LANGUAGES.map((l) => (
        <button
          key={l.id}
          type="button"
          role="radio"
          aria-checked={value === l.id}
          aria-label={l.id === 'en' ? 'English' : 'हिंदी'}
          onClick={() => onChange(l.id)}
          className={cx(
            'tap relative z-10 min-h-11 min-w-[56px] px-3 text-[0.8125rem] font-semibold transition-colors',
            value === l.id ? 'text-brand-700' : 'text-white',
          )}
        >
          {l.id === 'en' ? 'EN' : 'हिंदी'}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------ /profile (352:8701) */
export default function ProfileScreen() {
  const navigate = useNavigate()
  const { teacher, classes, setClasses, showToast, resetDemo, language, setLanguage } = useAppStore()
  const t = useT()
  const [removing, setRemoving] = useState(null)
  const ms = useMultiStage()
  const liveOf = (id) => liveActivitiesFor(id, ms)

  const confirmRemove = () => {
    if (liveOf(removing.id).length) { setRemoving(null); return }
    setClasses(classes.filter((c) => c.id !== removing.id))
    showToast(t('Class {grade}-{section} removed', { grade: removing.grade, section: removing.section }))
    setRemoving(null)
  }

  return (
    <Screen
      bg="white"
      statusBar="light"
      header={<NavHeader title={t('My Profile')} className="shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)]" />}
      footer={<RemoveClassModal cls={removing} live={removing ? liveOf(removing.id) : []} onConfirm={confirmRemove} onCancel={() => setRemoving(null)} />}
    >
      <div style={{ backgroundImage: `url(${bgPattern})`, backgroundSize: '180px 180px' }}>
        {/* Orange hero (the design's 314px block, minus the 100px status + nav bars overlapping it) */}
        {/* Grows with the text; the language toggle sits in its own row so it never covers the avatar */}
        <div className="relative min-h-[214px] overflow-hidden bg-brand pb-5">
          <CoverTrails />
          <div className="relative z-10 flex justify-end px-3 pt-3">
            <LanguageToggle value={language} onChange={setLanguage} label={t('App language')} />
          </div>
          <div className="relative flex flex-col items-center gap-2 px-4 text-center">
            <div aria-hidden className="animate-pop-in grid size-[74px] place-items-center rounded-full bg-[#f5f5f5] text-[1.4167rem] font-medium leading-[2.125rem] text-[#334155]">
              {initials(teacher.name)}
            </div>
            <div className="stagger flex max-w-full flex-col items-center gap-1 text-white">
              <h2 className="break-words text-[1.375rem] font-bold leading-10">{teacher.name}</h2>
              <p className="text-[0.8125rem] leading-5">{t('Teacher code {code}', { code: teacher.code })}</p>
            </div>
          </div>
        </div>

        <div className="stagger flex flex-col gap-6 px-4 pb-6 pt-[9px]">
          {/* Grade details */}
          <section className="flex flex-col gap-4">
            <SectionHeading>{t('Grade Details')}</SectionHeading>
            <div className="flex flex-col gap-1">
              <p className="text-[1rem] font-medium leading-5 text-slate-500">{t('You are teaching following grades -')}</p>
              <table className="w-full overflow-hidden rounded border border-[rgba(226,232,240,0.5)] bg-white text-left">
                <thead className="bg-[#ffefe0]">
                  <tr className="min-h-9 text-[0.875rem] font-semibold text-slate-900">
                    <th className="w-[3.5rem] px-2 py-2 font-semibold">{t('Sl.No')}</th>
                    <th className="border-l border-[rgba(226,232,240,0.5)] px-2 py-2 font-semibold">{t('Grade Selected')}</th>
                    <th className="w-12"><span className="sr-only">{t('Actions')}</span></th>
                  </tr>
                </thead>
                <tbody className="text-[1.125rem] font-semibold text-[#404040]">
                  {classes.length === 0 && (
                    <tr><td colSpan={3} className="px-2 py-3 text-[0.875rem] font-medium text-ink-muted">{t('No grades added yet')}</td></tr>
                  )}
                  {classes.map((c, i) => (
                    <tr key={c.id} className="border-t border-[rgba(226,232,240,0.5)] transition-colors hover:bg-[#fffaf6]">
                      <td className="px-2">{i + 1}</td>
                      <td className="border-l border-[rgba(226,232,240,0.5)] px-2 py-1 text-[1rem]">
                        {gradeLabel(c, t)}
                        {liveOf(c.id).length > 0 && <span className="pl-1.5 text-[0.75rem] font-bold text-[#1b6b34]">· {t('Live')}</span>}
                      </td>
                      <td className="pr-1 text-right">
                        <button
                          aria-label={t('Remove {label}', { label: `${c.grade}-${c.section}` })}
                          onClick={() => setRemoving(c)}
                          className="tap ml-auto grid size-11 place-items-center rounded-md hover:bg-[#fdecec]"
                        >
                          <img alt="" width="16" height="16" src={trash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => navigate('/classes/manage')}
              className="tap flex min-h-11 w-full items-center justify-center gap-1 rounded-full border-2 py-2 border-[#ffd4ad] bg-[#ffe0c5] px-3 text-[0.875rem] font-semibold leading-5 text-brand-700 transition-colors hover:bg-[#ffd6b3]"
            >
              <img alt="" width="20" height="20" src={plus} />
              {t('Select another grade')}
            </button>
          </section>

          <Separator />

          {/* School information (VSK synced) */}
          <section className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><SectionHeading icon={bank}>{t('School Information')}</SectionHeading><ProvenanceChip kind="vsk" /></div>
            <Field label={t('School Name')} value={teacher.school} />
            <Field label={t('UDISE Code')} value={PROFILE.udise} />
            <FieldPair tall a={{ label: t('Block'), value: teacher.block }} b={{ label: t('District'), value: teacher.district }} />
            <Field label={t('State')} value={t(PROFILE.state)} />
          </section>

          {/* GIGW: help, accessibility statement, policies, feedback */}
          <button
            onClick={() => navigate('/about')}
            className="tap-soft flex min-h-12 w-full items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-left hover:bg-[#fffaf6]"
          >
            <span className="min-w-0 flex-1 text-[1rem] font-semibold leading-6 text-[#1a1c1e]">{t('About & policies')}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-700" aria-hidden><path d="m9 6 6 6-6 6" /></svg>
          </button>

          <div className="flex flex-col items-center pt-4">
            <button
              onClick={() => { resetDemo(); navigate('/login', { replace: true }) }}
              className="tap min-h-11 rounded-full px-4 py-1 text-[0.75rem] font-medium text-ink-muted underline-offset-2 hover:bg-black/5 hover:text-ink-muted hover:underline"
            >
              {t('Reset demo')}
            </button>
            <HomeIndicator />
          </div>
        </div>
      </div>
    </Screen>
  )
}
