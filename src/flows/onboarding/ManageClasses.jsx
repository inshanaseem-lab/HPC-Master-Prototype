import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import chevronSlate from '../../assets/onboarding/chevron-down-slate.svg'
import checkIcon from '../../assets/onboarding/check.svg'
import xCircle from '../../assets/onboarding/x-circle.svg'
import { GRADE_OPTIONS, gradeLabel } from './data.js'
import { NavHeader, RemoveClassModal } from './parts.jsx'
import { useT } from '../../i18n/index.js'
import { useMultiStage } from '../../hpc/store.js'
import { getService } from '../../platform/services.js'

// Owned by the students MFE (service registry)
const liveActivitiesFor = (classId, ms) => getService('students.liveActivities', [])(classId, ms)

/**
 * /classes/manage — kit T02-04 / T02-05 (grades 9–12, streams for 11 and 12, "Live" marks)
 * and T02-03 (a class with a live activity can't be removed).
 */
export default function ManageClassesScreen() {
  const navigate = useNavigate()
  const { classes, setClasses, showToast } = useAppStore()
  const t = useT()
  const initial = useMemo(() => classes.map((c) => c.id), []) // eslint-disable-line react-hooks/exhaustive-deps
  const [selected, setSelected] = useState(initial)
  const [open, setOpen] = useState(false)
  const [removing, setRemoving] = useState(null)
  const [saving, setSaving] = useState(false)
  const ms = useMultiStage()
  const liveOf = (id) => liveActivitiesFor(id, ms)

  const options = GRADE_OPTIONS
  const byId = (id) => options.find((o) => o.id === id) ?? classes.find((c) => c.id === id)
  const chips = options.filter((o) => selected.includes(o.id))
  const dirty = selected.length !== initial.length || selected.some((id) => !initial.includes(id))

  const toggle = (id) => {
    if (selected.includes(id) && liveOf(id).length) { setRemoving(byId(id)); return }
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }
  const anyLive = chips.some((c) => liveOf(c.id).length)

  const confirmRemove = () => {
    if (liveOf(removing.id).length) { setRemoving(null); return }
    setSelected((s) => s.filter((x) => x !== removing.id))
    showToast(t('Class {grade}-{section} removed', { grade: removing.grade, section: removing.section }))
    setRemoving(null)
  }

  const save = () => {
    setSaving(true)
    setTimeout(() => {
      const next = options
        .filter((o) => selected.includes(o.id))
        .map((o) => {
          const existing = classes.find((c) => c.id === o.id)
          return existing ?? { ...o }
        })
      setClasses(next)
      showToast(next.length ? t(next.length > 1 ? '{n} classes saved' : '{n} class saved', { n: next.length }) : t('All classes removed'))
      navigate('/home', { replace: true })
    }, 600)
  }

  return (
    <Screen
      bg="plain"
      className="!bg-[#f7f4ef]"
      statusBar="dark"
      header={<NavHeader title={t('Add / Remove Classes')} />}
      footer={
        <>
        <BottomActions className="bg-[#f7f4ef]">
          <PrimaryButton
            disabled={!dirty}
            loading={saving}
            onClick={save}
            className={cx('text-[1rem]', dirty && 'shadow-[inset_-2px_-2px_2px_0px_rgba(15,23,42,0.14),inset_2px_2px_2px_0px_rgba(255,255,255,0.9)]')}
          >
            {t('Save Classes')}
          </PrimaryButton>
        </BottomActions>
        {/* Rendered outside the scroll body so the overlay covers the whole phone */}
        <RemoveClassModal cls={removing} live={removing ? liveOf(removing.id) : []} onConfirm={confirmRemove} onCancel={() => setRemoving(null)} />
        </>
      }
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Grade Details')}</h2>
          <p className="text-[0.875rem] leading-[1.1875rem] text-ink-muted">
            {t('Please select the grades and sections you will be conducting HPC for')}
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-3">
          <p id="grade-picker-label" className="text-[0.875rem] font-medium leading-5 text-[#334155]">{t('Class & Section')}</p>
          <button
            aria-labelledby="grade-picker-label"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={cx(
              'tap-soft flex min-h-12 w-full items-center gap-2 rounded-md border bg-[#f8fafc] px-3 py-2 text-left shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.06)] transition-colors',
              open ? 'border-brand' : 'border-[#e2e8f0] hover:border-[#cbd5e1]',
            )}
          >
            <span className="min-w-0 flex-1 text-[0.875rem] leading-5 text-slate-500">
              {selected.length ? t('{n} selected', { n: selected.length }) : t('Select')}
            </span>
            <img alt="" width="20" height="20" src={chevronSlate} className={cx('transition-transform duration-200', open && 'rotate-180')} />
          </button>

          {open && (
            <div
              role="listbox"
              aria-multiselectable="true"
              className="animate-fade-up flex flex-col gap-0.5 overflow-hidden rounded-xl border border-[#e6ddd6] bg-white p-1 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)]"
              style={{ animationDuration: '.22s' }}
            >
              {options.map((o) => {
                const on = selected.includes(o.id)
                return (
                  <button
                    key={o.id}
                    role="option"
                    aria-selected={on}
                    onClick={() => toggle(o.id)}
                    className="tap-soft flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#fff6ef]"
                  >
                    {on ? (
                      <span className="animate-check-pop flex shrink-0 rounded bg-brand">
                        <img alt="" width="16" height="16" src={checkIcon} />
                      </span>
                    ) : (
                      <span className="size-4 shrink-0 rounded border border-[#94a3b8] transition-colors" />
                    )}
                    <span className={cx('min-w-0 flex-1 text-[0.9375rem] text-[#211a17]', on ? 'font-normal' : 'font-medium')}>{gradeLabel(o, t)}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-x-2 font-bold">
            <p className="min-w-0 text-[1.0625rem] text-[#211a17]">{t('Grades selected')}</p>
            <p className="shrink-0 text-[0.75rem] text-[#736a64]">{t('{n} selected', { n: selected.length })}</p>
          </div>
          {chips.length === 0 ? (
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('No grades selected yet. Tap “Select” to add your classes.')}</p>
          ) : (
            <div className="stagger flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c.id}
                  className="flex min-h-11 max-w-full items-center gap-1 rounded-full border border-brand-700 bg-brand-50 pl-3 text-[0.875rem] font-semibold text-brand-700"
                >
                  {gradeLabel(c, t)}
                  {liveOf(c.id).length > 0 && <span className="text-[0.75rem] font-bold text-[#1b6b34]">· {t('Live')}</span>}
                  <button
                    aria-label={t('Remove {label}', { label: gradeLabel(c, t) })}
                    onClick={() => setRemoving(byId(c.id))}
                    className="tap -my-px grid size-11 shrink-0 place-items-center rounded-full hover:bg-[#ffe0cc]"
                  >
                    <img alt="" width="14" height="14" src={xCircle} />
                  </button>
                </span>
              ))}
            </div>
          )}
          {anyLive && (
            <div className="animate-fade-up flex gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 text-[0.8125rem] leading-[1.1875rem] text-ink-2">
              <InfoIcon />
              {t('Classes marked Live have activities running. They can be removed once those activities are completed.')}
            </div>
          )}
        </div>
      </div>
    </Screen>
  )
}

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0 text-brand-700" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
)
