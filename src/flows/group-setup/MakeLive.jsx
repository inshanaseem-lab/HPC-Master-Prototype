import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useDate, useT } from '../../i18n/index.js'
import { COMPETENCIES, CURRICULAR_GOALS, GROUP_PROJECT } from '../../hpc/config.js'
import { CalendarSheet, DEMO_TODAY, EventNotice, Icons, formatLong } from '../../hpc/components.jsx'
import { createActivity } from '../../hpc/store.js'
import { emit, rosterFor, saveWithGuard, useBActivity } from '../group-live/lib.js'
import { GPHeader, SectionLabel, groupLabel, useClassInfo } from './parts.jsx'
import { useGroupSetup } from './store.js'
import calendarIcon from '../../assets/group-setup/calendar.svg'

const STAGES = GROUP_PROJECT.stages
const DAY = 24 * 60 * 60 * 1000
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
// Plan / Observe / Final split of the days between today and the deadline
const SPLIT = [0.3, 0.7, 1]

/** Auto-split the run-up to `deadline` into 3 stage end-dates (30% / 40% / 30%), from `start`. */
export function splitStages(start, deadline) {
  const s = new Date(start + 'T00:00')
  const dl = new Date(deadline + 'T00:00')
  const totalDays = Math.max(3, Math.round((dl - s) / DAY))
  const cuts = SPLIT.map((f) => Math.min(totalDays, Math.max(1, Math.round(totalDays * f))))
  // keep them strictly increasing even for very short windows
  for (let i = 1; i < cuts.length; i += 1) if (cuts[i] <= cuts[i - 1]) cuts[i] = cuts[i - 1] + 1
  cuts[cuts.length - 1] = totalDays
  return Object.fromEntries(STAGES.map((st, i) => [st.id, iso(new Date(s.getTime() + cuts[i] * DAY))]))
}

/** Validation for the three stage dates: all set, strictly increasing, and not after the deadline. */
export function dateErrors(dates, deadline) {
  const e = {}
  STAGES.forEach((s, i) => {
    if (!dates[s.id]) e[s.id] = 'required'
    else if (i > 0 && dates[STAGES[i - 1].id] && dates[s.id] <= dates[STAGES[i - 1].id]) e[s.id] = 'order'
    else if (deadline && dates[s.id] > deadline) e[s.id] = 'order'
  })
  return e
}

/**
 * Group Project · 3/3 · Stage timeline + review before live (kit T05-13, T04-10 calendar).
 * Make live → createActivity(…, 'B.live'). For 9A the demo record 'gp-water' is replaced in place.
 */
export default function MakeLive() {
  const navigate = useNavigate()
  const t = useT()
  const d = useDate()
  const { showToast } = useAppStore()
  const { classId, cls, name } = useClassInfo()
  const [draft, update] = useGroupSetup(classId)
  const live = useBActivity(classId)
  const [cal, setCal] = useState(null)
  const [tried, setTried] = useState(false)
  const [shake, setShake] = useState(0)
  const [loading, setLoading] = useState(false)

  if (!draft.groups.length) return <Navigate to={`/group-project/${classId}/groups`} replace />

  const dates = draft.stageDates
  const deadline = draft.deadline ?? dates.S3 ?? ''
  const errs = dateErrors(dates, deadline)
  const orderErr = Object.values(errs).includes('order')
  const showErr = (id) => (tried || errs[id] === 'order') && errs[id]
  // Auto-split Plan → Observe → Final (30/40/30) from today whenever the deadline changes;
  // a stage the teacher has already hand-edited (`stageDatesCustom`) keeps its date.
  const setDeadline = (v) => update((x) => {
    const auto = splitStages(DEMO_TODAY, v)
    const custom = x.stageDatesCustom ?? {}
    return { ...x, deadline: v, stageDates: Object.fromEntries(STAGES.map((s) => [s.id, custom[s.id] ? x.stageDates[s.id] : auto[s.id]])) }
  })
  const setStageDate = (id, v) => update((x) => ({ ...x, stageDates: { ...x.stageDates, [id]: v }, stageDatesCustom: { ...x.stageDatesCustom, [id]: true } }))
  const onCalSet = (v) => { if (cal === 'deadline') setDeadline(v); else setStageDate(cal, v); setCal(null) }
  const calBounds = (() => {
    if (cal === 'deadline') return { min: DEMO_TODAY, max: undefined }
    if (!cal) return {}
    const i = STAGES.findIndex((x) => x.id === cal)
    return { min: (i > 0 && dates[STAGES[i - 1].id]) || DEMO_TODAY, max: (i < STAGES.length - 1 && dates[STAGES[i + 1].id]) || deadline || undefined }
  })()
  const s = draft.setup
  const smallest = Math.min(...draft.groups.map((g) => g.studentIds.length))
  const label = (list, key) => list.find((x) => x.code === key)?.code ?? key

  const checks = [
    { label: t('Details reviewed · {title}', { title: draft.title }), done: !!draft.title, edit: `/group-project/${classId}?setup=1` },
    { label: t('Discussion held with learners'), done: !!draft.discussed },
    { label: draft.groups.length === 1 ? t('1 group created') : t('{n} groups created', { n: draft.groups.length }), done: smallest >= GROUP_PROJECT.minGroupSize, edit: `/group-project/${classId}/groups/manage?tab=view` },
    { label: !deadline ? t('Deadline not set yet') : t('Deadline {date}', { date: d(formatLong(deadline)) }), done: !!deadline },
    { label: t('3 stages scheduled'), done: !Object.keys(errs).length },
  ]
  const summary = [
    [t('Subject(s)'), s.subjects.map((x) => t(x)).join(', ')],
    [t('Curricular goal(s)'), s.goals.map((x) => label(CURRICULAR_GOALS, x)).join(', ')],
    [t('Competency(-ies)'), s.competencies.map((x) => label(COMPETENCIES, x)).join(', ')],
    [t('Pedagogies'), s.pedagogies.map((x) => (x === 'Any other' && s.pedagogyOther ? s.pedagogyOther : t(x))).join(', ')],
    [t('Project prompt'), s.prompt],
    [t('Planned final output'), s.output],
  ]

  const makeLive = () => {
    setTried(true)
    if (Object.keys(errs).length || checks.some((c) => !c.done)) { setShake((n) => n + 1); return }
    saveWithGuard({
      setLoading, showToast, t,
      run: () => {
        const roster = rosterFor(classId, cls.students)
        const groups = Object.fromEntries(draft.groups.map((g, i) => {
          const id = `G${i + 1}`
          return [id, { id, name: g.name, members: g.studentIds, planning: null, draft: null, final: null }]
        }))
        const id = classId === '9A' ? 'gp-water' : `gp-${classId}-${Date.now().toString(36)}`
        if (live && live.id !== id && live.status === 'live') emit(live.id, 'B.closed', (x) => { x.status = 'closed' })
        createActivity({
          id, type: 'B', classId, title: draft.title.trim(), status: 'live',
          setup: { ...s, pedagogies: s.pedagogies.map((x) => (x === 'Any other' && s.pedagogyOther ? `Any other: ${s.pedagogyOther.trim()}` : x)) },
          stageDates: { ...dates }, currentStage: 'S1',
          rubricS3: structuredClone(GROUP_PROJECT.s3RubricTemplate),
          groups,
          learners: Object.fromEntries(draft.groups.flatMap((g) => g.studentIds).map((m) => [m, {}])),
          ...(classId === '9A' ? {} : { roster: roster.map(({ id: rid, name: n }) => ({ id: rid, name: n })) }),
          events: [],
        }, 'B.live')
        navigate(`/group-project/${classId}/success`, { replace: true })
      },
    })
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<GPHeader step="3 / 3" />}
      footer={
        <BottomActions>
          <PrimaryButton className="font-bold" loading={loading} onClick={makeLive}>{t('Make Project live')}</PrimaryButton>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-5 p-4 pb-8">
        <div>
          <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Make Group Project live for {cls}', { cls: name })}</h2>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('{n} students will get this in their to-do list straight away.', { n: cls.students })}</p>
        </div>

        {live?.status === 'live' && (
          <EventNotice tone="warning" title={t('A Group Project is already live for this class')}>
            {t('Making this live replaces “{title}” and resets its progress.', { title: t(live.title) })}
          </EventNotice>
        )}

        <div>
          <SectionLabel>{t('Submission deadline · Required')}</SectionLabel>
          <button type="button" onClick={() => setCal('deadline')} aria-label={`${t('Submission deadline · Required')}: ${deadline ? d(formatLong(deadline)) : t('Select a date')}`}
            className="tap-soft mt-1 flex w-full items-center gap-3 rounded-xl border border-line bg-white p-3.5 text-left transition-colors hover:border-cream-border">
            <span className={cx('min-w-0 flex-1 text-[1rem] leading-6', deadline ? 'text-ink' : 'text-[#77737c]')}>{deadline ? d(formatLong(deadline)) : t('Select a date')}</span>
            <img alt="" width="20" height="20" src={calendarIcon} />
          </button>
        </div>

        <div key={shake} className={cx('rounded-2xl border border-line bg-white p-4', shake > 0 && Object.keys(errs).length > 0 && 'animate-shake')}>
          <div className="flex flex-wrap items-center gap-2">
            <SectionLabel>{t('Stage-wise dates')}</SectionLabel>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[0.75rem] font-bold uppercase tracking-[0.6px] text-brand-700">{t('New')}</span>
          </div>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('We’ve split the time until the deadline into 3 stages. Tap a date to change it.')}</p>

          <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-[#f1efec]" aria-hidden>
            {STAGES.map((st, i) => (
              <div key={st.id} className={cx('h-full origin-left animate-grow-x transition-colors', i === 0 ? 'bg-ink' : i === 1 ? 'bg-brand' : 'bg-[#ffd5b0]')} style={{ width: `${100 / STAGES.length}%`, animationDelay: `${i * 80}ms` }} />
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-3">
            {STAGES.map((st, i) => {
              const e = showErr(st.id)
              return (
                <div key={st.id}>
                  <button type="button" onClick={() => setCal(st.id)} aria-invalid={!!e}
                    className={cx('tap-soft flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors', e ? 'border-danger' : 'border-line hover:border-cream-border')}>
                    <span aria-hidden className={cx('grid size-6 shrink-0 place-items-center rounded-full text-[0.75rem] font-bold text-white', i === 0 ? 'bg-ink' : i === 1 ? 'bg-brand' : 'bg-[#e5b98a]')}>{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.875rem] font-semibold leading-5 text-ink">{t(st.name)}</span>
                      <span className={cx('block text-[0.8125rem] leading-[1.1875rem]', dates[st.id] ? 'text-ink-muted' : 'text-[#77737c]')}>{dates[st.id] ? d(formatLong(dates[st.id])) : t('Select a date')}</span>
                    </span>
                    <img alt="" width="18" height="18" src={calendarIcon} />
                  </button>
                  {e && (
                    <p role="alert" className="animate-fade-in pt-1.5 text-[0.75rem] leading-4 text-danger">
                      {e === 'required' ? t('Pick a date for {stage}.', { stage: t(st.name) }) : t('{stage} must be after {prev} and on or before the deadline.', { stage: t(st.name), prev: i > 0 ? t(STAGES[i - 1].name) : t('today') })}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
          {orderErr && <span className="sr-only">{t('Stage dates must be in order.')}</span>}
        </div>

        <div className="rounded-2xl border border-line bg-white p-4">
          <SectionLabel>{t('Check before you confirm')}</SectionLabel>
          <ul className="flex flex-col gap-1 pt-2">
            {checks.map((c) => (
              <li key={c.label} className="flex items-center gap-3 py-0.5">
                <span aria-hidden className={cx('grid size-6 shrink-0 place-items-center rounded-full text-white transition-colors duration-200', c.done ? 'animate-check-pop bg-[#1e6b3a]' : 'border-2 border-line bg-white')}>
                  {c.done && <Icons.check width="14" height="14" />}
                </span>
                <p className={cx('min-w-0 flex-1 text-[0.875rem] leading-5', c.done ? 'text-ink-2' : 'text-ink-muted')}>
                  <span className="sr-only">{c.done ? t('Done') : t('Not done')}: </span>{c.label}
                </p>
                {c.edit && <button onClick={() => navigate(c.edit)} aria-label={`${t('Edit')} · ${c.label}`} className="tap min-h-11 min-w-11 shrink-0 rounded-full px-2.5 text-[0.8125rem] font-semibold text-brand-600 hover:bg-brand-50">{t('Edit')}</button>}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4">
          <SectionLabel>{t('Project summary')}</SectionLabel>
          <p className="pt-2 text-[1.0625rem] font-semibold leading-6 text-ink">{draft.title}</p>
          {summary.map(([k, v]) => (
            <div key={k} className="flex flex-wrap gap-x-3 gap-y-0.5 border-t border-[#f1efec] py-2.5 first-of-type:border-t-0">
              <p className="w-28 shrink-0 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{k}</p>
              <p className="min-w-[min(10rem,100%)] flex-1 break-words text-[0.8125rem] font-semibold leading-[1.1875rem] text-ink">{v || '—'}</p>
            </div>
          ))}
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 border-t border-[#f1efec] py-2.5">
            <p className="w-28 shrink-0 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Groups')}</p>
            <p className="min-w-[min(10rem,100%)] flex-1 text-[0.8125rem] font-semibold leading-[1.1875rem] text-ink">
              {draft.groups.map((g) => `${groupLabel(t, g.name)} (${g.studentIds.length})`).join(' · ')}
            </p>
          </div>
        </div>
      </div>

      <CalendarSheet
        open={!!cal}
        title={cal === 'deadline' ? t('Submission deadline · Required') : cal ? t('{name} ends on', { name: t(STAGES.find((x) => x.id === cal).name) }) : ''}
        value={cal === 'deadline' ? deadline : cal ? dates[cal] : ''}
        min={calBounds.min}
        max={calBounds.max}
        onClose={() => setCal(null)}
        onSet={onCalSet}
      />
    </Screen>
  )
}
