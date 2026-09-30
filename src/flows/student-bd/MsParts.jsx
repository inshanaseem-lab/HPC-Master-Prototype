import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Screen, cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { useAppStore } from '../../store/AppStore.jsx'
import { ABILITIES } from '../../hpc/config.js'
import { EvalFooter, LeaveSheet, LockNotice, TickList } from '../../hpc/components.jsx'
import { STUDENT_ID, useMultiStage } from '../../hpc/store.js'
import { AppBar, Eyebrow } from './parts.jsx'
import { ABILITY_IDS, msBase, progressOf, useToday } from './msLogic.js'

/**
 * Route wrapper for the multi-stage screens: loads the activity + learner progress,
 * and sends the student back to the activity page when the record doesn't exist.
 */
export function withMs(Component) {
  return function MsRoute() {
    const { id } = useParams()
    const a = useMultiStage(id)
    const now = useToday()
    if (!a) return <Navigate to={`/s/project/${id}`} replace />
    return <Component a={a} p={progressOf(a, STUDENT_ID, now)} me={STUDENT_ID} base={msBase(id)} now={now} />
  }
}

/** Save helper: offline → error toast and keep the draft; otherwise ~600ms spinner then `fn`. */
export function useSaver() {
  const t = useT()
  const { showToast } = useAppStore()
  const [saving, setSaving] = useState(null)
  const run = (key, fn, okMessage) => {
    if (saving) return
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      showToast(t('You’re offline. Your draft is kept on this phone — try again when you’re back online.'), 'error')
      return
    }
    setSaving(key)
    setTimeout(() => {
      setSaving(null)
      fn()
      if (okMessage) showToast(okMessage)
    }, 600)
  }
  return [saving, run]
}

/** Shake-on-invalid helper. */
export function useShake() {
  const [on, setOn] = useState(false)
  return [on, () => { setOn(true); setTimeout(() => setOn(false), 420) }]
}

/* ------------------------------------------------------------ Form fields */

export function TextArea({ label, hint, value, onChange, error, readOnly, rows = 3, id }) {
  const t = useT()
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{label}</span>
      {hint && <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{hint}</span>}
      <textarea
        id={id}
        rows={rows}
        value={value ?? ''}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={readOnly ? '' : t('Type your answer')}
        aria-invalid={Boolean(error)}
        className={cx(
          'resize-none rounded-xl border bg-white px-3.5 py-3 text-[0.9375rem] leading-[1.375rem] text-ink outline-none transition-colors placeholder:text-[#8f8c95] focus:border-brand focus:ring-2 focus:ring-brand-bright/30',
          error ? 'border-danger' : 'border-line',
          readOnly && 'bg-surface',
        )}
      />
      {error && <span className="animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-danger">{error}</span>}
    </label>
  )
}

const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M18 6 6 18M6 6l12 12" /></svg>
const PlusIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>

/** Repeatable text rows with min/max from config. */
export function RowsField({ label, rows, min, max, value, onChange, placeholder, error, readOnly, numbered }) {
  const t = useT()
  const list = value?.length ? value : Array(min).fill('')
  const set = (i, v) => onChange(list.map((x, j) => (j === i ? v : x)))
  return (
    <fieldset className="flex min-w-0 flex-col gap-2">
      <legend className="flex w-full flex-wrap items-baseline justify-between gap-x-3 pb-1.5">
        <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{label}</span>
        <span className="text-[0.75rem] text-ink-muted">{t('At least {min} · up to {max}', { min, max })}</span>
      </legend>
      <div className="stagger flex flex-col gap-2">
        {list.map((v, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2">
            {numbered && <span className="w-12 shrink-0 text-[0.8125rem] font-semibold text-ink-muted">{t('Day {n}', { n: i + 1 })}</span>}
            <input
              value={v}
              readOnly={readOnly}
              onChange={(e) => set(i, e.target.value)}
              placeholder={readOnly ? '' : placeholder}
              aria-label={`${label} ${i + 1}`}
              aria-invalid={Boolean(error && !v.trim())}
              className={cx(
                'min-h-12 min-w-[min(8rem,100%)] flex-1 rounded-xl border bg-white px-3.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-[#8f8c95] focus:border-brand focus:ring-2 focus:ring-brand-bright/30',
                error && !v.trim() && i < min ? 'border-danger' : 'border-line',
                readOnly && 'bg-surface',
              )}
            />
            {!readOnly && list.length > min && (
              <button type="button" aria-label={t('Remove row {n}', { n: i + 1 })} onClick={() => onChange(list.filter((_, j) => j !== i))} className="tap grid size-11 shrink-0 place-items-center rounded-full text-ink-muted hover:bg-black/5">
                <XIcon />
              </button>
            )}
          </div>
        ))}
      </div>
      {!readOnly && list.length < max && (
        <button type="button" onClick={() => onChange([...list, ''])} className="tap flex min-h-11 items-center gap-1.5 self-start rounded-full px-2 text-[0.875rem] font-semibold text-brand-700 hover:bg-brand-50">
          <PlusIcon /> {t('Add row')}
        </button>
      )}
      {error && <p className="animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-danger">{error}</p>}
      {rows}
    </fieldset>
  )
}

/* ------------------------------------------------------------ Tick runner */

/**
 * Three-step tick form (one ability per step) with kit Previous/Next footer and "Question n of 3".
 * statements: { awareness: [], sensitivity: [], creativity: [] } (English, from config).
 * onSubmit(ticks) is called after the ~600ms save spinner; offline keeps the ticks on screen.
 */
export function TickRunner({ title, statements, intro, promptFor, onSubmit, onExit, exitTitle, exitBody, submitLabel, notice }) {
  const t = useT()
  const [step, setStep] = useState(0)
  const [ticks, setTicks] = useState({ awareness: [], sensitivity: [], creativity: [] })
  const [leave, setLeave] = useState(false)
  const [saving, save] = useSaver()
  const ability = ABILITY_IDS[step]
  const last = step === ABILITY_IDS.length - 1
  const dirty = step > 0 || ABILITY_IDS.some((k) => ticks[k].length)
  const back = () => (dirty ? setLeave(true) : onExit())
  const label = ABILITIES.find((x) => x.id === ability)?.label

  return (
    <>
      <Screen
        bg="plain"
        statusBar="light"
        header={<AppBar title={title} onBack={back} right={t('Question {n} of {total}', { n: step + 1, total: ABILITY_IDS.length })} />}
        footer={
          <EvalFooter
            prevDisabled={step === 0}
            onPrev={() => setStep(step - 1)}
            onNext={() => (last ? save('submit', () => onSubmit(ticks)) : setStep(step + 1))}
            nextLabel={last ? (submitLabel ?? t('Submit')) : t('Next')}
            loading={saving === 'submit'}
          />
        }
      >
        <div className="flex flex-col gap-4 px-4 pb-8 pt-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#ffd5b0]" aria-hidden>
            <div className="h-full origin-left rounded-full bg-brand-bright transition-[width] duration-500" style={{ width: `${((step + 1) / ABILITY_IDS.length) * 100}%` }} />
          </div>
          {step === 0 && intro}
          {notice}
          <div key={ability} className="animate-fade-up">
            <TickList
              ability={ability}
              statements={statements[ability]}
              value={ticks[ability]}
              onChange={(v) => setTicks({ ...ticks, [ability]: v })}
              prompt={promptFor ? promptFor(t(label)) : t('Tick every statement that is true for you.')}
            />
          </div>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Leave a statement unticked if it isn’t true yet. There are no wrong answers.')}</p>
          {last && <LockNotice>{t('Once you submit, your answers can’t be changed.')}</LockNotice>}
        </div>
      </Screen>
      <LeaveSheet open={leave} title={exitTitle} body={exitBody} onStay={() => setLeave(false)} onLeave={() => { setLeave(false); onExit() }} />
    </>
  )
}

/** Read-only tick summary for one record (my answers / peer reviews I gave). */
export function TickSummary({ statements, ticks }) {
  return (
    <div className="flex flex-col gap-6">
      {ABILITY_IDS.map((k) => (
        <TickList key={k} ability={k} statements={statements[k]} value={ticks?.[k] ?? []} readOnly />
      ))}
    </div>
  )
}

/** Centered success layout (kit S03-06 / S03-09). */
export function CenterMessage({ mark, title, body, children }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8 text-center">
      {mark}
      <h1 className="animate-fade-up text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{title}</h1>
      {body && <p className="max-w-[20rem] animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>}
      {children}
    </div>
  )
}

export function NextCard({ title, body }) {
  const t = useT()
  return (
    <div className="mt-2 flex animate-fade-up flex-col gap-1 self-stretch rounded-[18px] border border-brand-600 bg-[#fffaf5] p-4 text-left">
      <Eyebrow tone="brand">{t('Next step')}</Eyebrow>
      <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{title}</p>
      {body && <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>}
    </div>
  )
}

/** Leave guard for text forms. */
export function useLeaveGuard(dirty, onExit) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const exit = onExit ?? (() => navigate(-1))
  return {
    back: () => (dirty ? setOpen(true) : exit()),
    sheetProps: { open, onStay: () => setOpen(false), onLeave: () => { setOpen(false); exit() } },
  }
}
