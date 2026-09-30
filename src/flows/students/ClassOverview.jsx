import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FilterChips, Screen, TopAppBar, cx } from '../../components/ui.jsx'
import { DEFAULT_CLASSES, useAppStore } from '../../store/AppStore.jsx'
import { classLabel, hasSubmitted, liveActivitiesFor, studentsInClass } from './data.js'
import { classTitle, translateShort } from './parts.jsx'
import { useMultiStage } from '../../hpc/store.js'
import rowChevron from '../../assets/students/row-chevron.svg'
import timeManagement from '../../assets/students/time-management.png'
import { useDate, useT } from '../../i18n/index.js'

/** Figma 263:17498 (live activities) · 263:17602 (student list) · 263:17690 (no live activity) */
export default function ClassOverview() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { classes } = useAppStore()
  const t = useT()
  const d = useDate()
  const list = classes.length ? classes : DEFAULT_CLASSES
  const idx = Math.max(0, list.findIndex((c) => c.id === classId))
  const cls = list.find((c) => c.id === classId) ?? DEFAULT_CLASSES.find((c) => c.id === classId)
  const label = classLabel(classId)
  const ms = useMultiStage()
  const activities = liveActivitiesFor(classId, ms)
  const allStudents = studentsInClass(classId)
  const [tab, setTab] = useState(params.get('tab') === 'students' ? 'students' : 'live')
  const [filter, setFilter] = useState('all')

  // Student List status = the current stage of the class's live multi-stage activity (soonest
  // deadline first), otherwise the first live activity (mock: first 12 learners submitted).
  const statusFor = activities.filter((a) => a.multiStage)
    .sort((x, y) => (x.multiStage.stageDates?.[x.multiStage.currentStage] ?? '').localeCompare(y.multiStage.stageDates?.[y.multiStage.currentStage] ?? ''))[0] ?? activities[0]
  const withStatus = allStudents.map((s, i) => ({
    ...s,
    submitted: statusFor ? (statusFor.multiStage ? hasSubmitted(statusFor.multiStage, s.learnerId) : i < 12) : false,
  }))
  const submittedCount = withStatus.filter((s) => s.submitted).length
  const students = withStatus.filter((s) => filter === 'all' || (filter === 'submitted' ? s.submitted : !s.submitted))

  const switchTab = (t) => {
    setTab(t)
    setParams(t === 'students' ? { tab: 'students' } : {}, { replace: true })
  }
  const startActivity = () => navigate(`/activity/${classId}/type`)

  return (
    <Screen
      bg="plain"
      header={
        <TopAppBar
          title={cls ? classTitle(cls, t) : t('Class {label}', { label })}
          className="border-b border-line"
          right={<span className="text-[1rem] leading-6 text-ink">{idx + 1}/{list.length}</span>}
        />
      }
      bodyClassName="flex flex-col"
    >
      <div className="flex flex-1 flex-col gap-4 px-4 pb-24 pt-4">
        <div className="flex flex-col gap-3">
          <div className="flex min-h-9 flex-wrap items-center justify-between gap-2">
            <p className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Class Overview')}</p>
            {tab === 'live' && activities.length > 0 && (
              <button
                onClick={startActivity}
                className="tap min-h-11 animate-fade-in rounded-full bg-brand px-3.5 py-2 text-[0.75rem] font-medium leading-[1.375rem] text-white hover:bg-brand-hover"
              >
                {t('Start an Activity')}
              </button>
            )}
          </div>
          <div className="flex min-h-[68px] flex-col items-center justify-center rounded-[10px] border border-line bg-white px-2 py-3">
            <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{cls?.students ?? allStudents.length}</p>
            <p className="pt-1 text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-ink-muted">{t('Students')}</p>
          </div>
        </div>

        {/* Segmented tabs with sliding pill */}
        <div role="tablist" className="relative flex rounded-full bg-[#ece1d9] p-1">
          <span
            aria-hidden
            className={cx(
              'absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.06)]',
              'transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]',
              tab === 'students' ? 'translate-x-full' : 'translate-x-0',
            )}
          />
          {[
            ['live', t('Live Activities')],
            ['students', t('Student List')],
          ].map(([k, tabLabel]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => switchTab(k)}
              className={cx(
                'tap relative z-10 min-h-11 min-w-0 flex-1 rounded-full px-3 py-2.5 text-[0.875rem] leading-5 transition-colors duration-200',
                tab === k ? 'font-semibold text-slate-900' : 'font-medium text-ink-muted hover:text-ink-2',
              )}
            >
              {tabLabel}
            </button>
          ))}
        </div>

        {tab === 'live' && activities.length > 0 && (
          <div key="live" className="stagger flex flex-col gap-3">
            {activities.map((a) => (
              <button
                key={a.id}
                onClick={() => navigate(`/${a.kind}/${classId}/progress`)}
                className="tap-soft flex w-full flex-col rounded-2xl border border-line bg-white p-3.5 text-left hover:border-cream-border hover:shadow-card"
              >
                <div className="flex w-full flex-wrap items-center gap-3">
                  {a.image ? (
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f1efec]">
                      <img alt="" src={timeManagement} className="size-6 object-cover" />
                    </span>
                  ) : (
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f1efec] text-[0.9375rem] font-bold leading-[1.375rem] text-ink-2">
                      {a.badge}
                    </span>
                  )}
                  <div className="min-w-[8rem] flex-1 pb-2">
                    <p className="break-words text-[0.75rem] font-bold uppercase leading-[1.375rem] tracking-[0.96px] text-brand-600">{t(a.label)}</p>
                    <p className="break-words pt-0.5 text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{a.multiStage ? t(a.title) : translateShort(t, a.short ?? a.title)}</p>
                  </div>
                  <span className="relative flex shrink-0 items-center rounded-full bg-[#d2efdb] px-2.5 py-[5px] text-[0.75rem] font-bold leading-4 text-[#1b6b34]">
                    <span className="absolute -left-0.5 -top-0.5 size-2 animate-ping rounded-full bg-[#1b6b34]/40" />
                    {t('LIVE')}
                  </span>
                  <img alt="" width="18" height="18" src={rowChevron} className="shrink-0" />
                </div>
                <div className="flex w-full flex-wrap gap-x-3 border-t border-line pt-3">
                  <div className="min-w-[7rem] flex-1">
                    <p className="pt-1 text-[0.9375rem] font-medium leading-[1.375rem] text-ink">{d(a.start)}</p>
                    <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Start Date')}</p>
                  </div>
                  <div className="min-w-[7rem] flex-1">
                    <p className="pt-1 text-[0.9375rem] font-medium leading-[1.375rem] text-ink">{d(a.end)}</p>
                    <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('End Date')}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {tab === 'live' && activities.length === 0 && (
          <div key="empty" className="stagger flex flex-1 flex-col items-center justify-center gap-6 p-4 text-center">
            <p className="text-[0.8125rem] font-medium leading-[1.1875rem] text-ink-2">{t('No activities are live for class {label}', { label })}</p>
            <button
              onClick={startActivity}
              className="tap rounded-full border border-brand bg-brand px-10 py-3 text-[0.9375rem] font-bold leading-[1.375rem] text-white hover:bg-brand-hover hover:shadow-[0_6px_16px_rgba(255,121,0,0.28)]"
            >
              {t('Start New Activity')}
            </button>
          </div>
        )}

        {tab === 'students' && (
          <div key="students" className="flex flex-col gap-3">
            <FilterChips
              label={t('Filter students')}
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: t('All'), count: withStatus.length },
                { value: 'submitted', label: t('Submitted'), count: submittedCount },
                { value: 'not-submitted', label: t('Not submitted'), count: withStatus.length - submittedCount },
              ]}
            />
            <p className="text-[0.75rem] leading-4 text-ink-muted">
              {statusFor
                ? t('Status for {title}', { title: statusFor.multiStage ? `${t(statusFor.title)} · ${t('Stage {n}', { n: statusFor.multiStage.currentStage.replace('S', '') })}` : translateShort(t, statusFor.short ?? statusFor.title) })
                : t('No activity is live, so nobody has anything to submit yet.')}
            </p>
            <div key={filter} className="stagger flex flex-col gap-3">
              {students.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/students/${s.id}`)}
                  className="tap-soft flex w-full flex-wrap items-center gap-3 rounded-2xl border border-line bg-white p-3.5 text-left hover:border-cream-border hover:shadow-card"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f1efec] text-[0.9375rem] font-bold leading-[1.375rem] text-ink-2">
                    {s.initials}
                  </span>
                  <div className="min-w-[8rem] flex-1">
                    <p className="break-words text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{s.name}</p>
                    <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student ID.')} : {s.id}</p>
                  </div>
                  <span className={cx('shrink-0 rounded-full px-2.5 py-[5px] text-[0.75rem] font-bold leading-4', s.submitted ? 'bg-[#d2efdb] text-[#1b6b34]' : 'bg-[#f1efec] text-ink-2')}>
                    {s.submitted ? t('Submitted') : t('Not submitted')}
                  </span>
                  <img alt="" width="18" height="18" src={rowChevron} className="shrink-0" />
                </button>
              ))}
              {allStudents.length === 0 && (
                <p className="py-10 text-center text-[0.8125rem] font-medium text-ink-2">{t('No students added to class {label} yet', { label })}</p>
              )}
              {allStudents.length > 0 && students.length === 0 && (
                <p className="animate-fade-up rounded-[10px] border border-dashed border-line bg-white px-4 py-6 text-center text-[0.8125rem] leading-5 text-ink-muted">
                  {filter === 'submitted' ? t('No one has submitted yet.') : t('Everyone has submitted.')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
