import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BottomActions, FilterChips, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import calendarIllustration from '../../assets/know-myself/calendar-illustration.png'
import chevronRightGrey from '../../assets/know-myself/chevron-right-grey.svg'
import check18 from '../../assets/know-myself/check-green-18.svg'
import check14 from '../../assets/know-myself/check-green-14.svg'
import { useDate, useT } from '../../i18n/index.js'
import { STUDENTS, fmtShort, getStudent } from './data.js'
import { SampleSheet } from './Activation.jsx'
import { KMAppBar, MaterialCard, MetaCells, SectionLabel, SegTabs, classTitle, useKnowMyself } from './parts.jsx'

function useRoster(cls) {
  const roster = STUDENTS.slice(0, cls.students || 40)
  const done = roster.filter((s) => s.submitted)
  const pending = roster.filter((s) => !s.submitted)
  return { roster, done, pending }
}

/** Counts up from 0 to `to` (stat numbers). */
function useCountUp(to, ms = 600) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / ms)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, ms])
  return n
}

function CountUp({ to, ms }) {
  return useCountUp(to, ms)
}

/** "12 of 40", counting up. */
function CountUpOf({ to, total }) {
  const t = useT()
  const n = useCountUp(to)
  return t('{n} of {total}', { n, total })
}

/* ------------------------------------------------------------ 263:21198 */

function Chip({ children, tone = 'green' }) {
  return (
    <span
      className={cx(
        'shrink-0 rounded-full px-2.5 py-[5px] text-[0.75rem] font-bold leading-4',
        tone === 'green' ? 'bg-[#d2efdb] text-[#1b6b34]' : 'bg-[#f1efec] text-ink-muted',
      )}
    >
      {children}
    </span>
  )
}

function ActivityCard({ avatar, label, title, status, stats, onClick }) {
  return (
    <button
      onClick={onClick}
      className="tap-soft flex w-full flex-col rounded-2xl border border-line bg-white p-3.5 text-left hover:shadow-card"
    >
      <div className="flex w-full flex-wrap items-center gap-3 pb-2">
        {avatar}
        <div className="min-w-[min(9rem,100%)] flex-1">
          <p className="break-words text-[0.75rem] font-bold uppercase leading-[1.375rem] tracking-[0.96px] text-brand-600">{label}</p>
          <p className="break-words pt-0.5 text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{title}</p>
        </div>
        <div className="ms-auto flex shrink-0 items-center gap-3">
          <Chip>{status}</Chip>
          <img alt="" width="18" height="18" src={chevronRightGrey} className="shrink-0" />
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-x-3 gap-y-2 border-t border-line pt-3">
        {stats.map(([value, caption, bold]) => (
          <div key={caption} className="min-w-[min(6rem,100%)] flex-1">
            <p className={cx('pt-1 text-[0.9375rem] leading-[1.375rem] text-ink', bold ? 'font-bold' : 'font-medium')}>{value}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{caption}</p>
          </div>
        ))}
      </div>
    </button>
  )
}

const Initials = ({ children }) => (
  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f1efec] text-[0.9375rem] font-bold leading-[1.375rem] text-ink-2">
    {children}
  </div>
)

export function ClassProgress() {
  const navigate = useNavigate()
  const t = useT()
  const d = useDate()
  const { classId, cls, survey, live } = useKnowMyself()
  const { roster, done } = useRoster(cls)
  const [tab, setTab] = useState('activities')
  const [filter, setFilter] = useState('all')
  const shown = roster.filter((s) => filter === 'all' || (filter === 'submitted' ? s.submitted : !s.submitted))
  const start = d(fmtShort(live?.startedAt) || '15 Aug 2026')
  const end = d(fmtShort(live?.deadline) || '15 Sep 2026')

  return (
    <Screen
      bg="plain"
      statusBar="dark"
      header={<KMAppBar title={classTitle(cls, t)} step="3/3" onBack={() => navigate('/home')} />}
    >
      <div className="flex flex-col gap-4 px-4 pb-24 pt-4">
        <div>
          <h1 className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Class Overview')}</h1>
          <div className="pt-0.5">
            <MetaCells items={[[<CountUp key="n" to={roster.length} />, t('Students')]]} />
          </div>
        </div>

        <SegTabs
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'activities', label: t('Activities') },
            { value: 'students', label: t('Student List') },
          ]}
        />

        {tab === 'activities' ? (
          <div key="a" className="stagger flex flex-col gap-3">
            <ActivityCard
              avatar={<Initials>TM</Initials>}
              label={t('Group Project')}
              title={t('Water in my Village')}
              status={t('LIVE')}
              stats={[[d('15 Aug 2026'), t('Start Date')], [d('15 Sep 2026'), t('End Date')], ['8', t('Groups Created'), true]]}
              onClick={() => navigate(`/group-project/${classId}/progress`)}
            />
            <ActivityCard
              avatar={
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f1efec]">
                  <img alt="" width="24" height="24" src={calendarIllustration} className="size-6 object-contain" />
                </div>
              }
              label={t('Section A')}
              title={t(survey.title).toUpperCase()}
              status={t('LIVE')}
              stats={[[start, t('Start Date'), true], [end, t('End Date'), true], [`${done.length}/${roster.length}`, t('Responses'), true]]}
              onClick={() => navigate(`/know-myself/${classId}/survey?s=${survey.id}`)}
            />
            <ActivityCard
              avatar={<Initials>TM</Initials>}
              label={t('Section C')}
              title={t('Water in my Village')}
              status={t('Completed')}
              stats={[[d('15 Aug 2026'), t('Start Date')], [d('15 Sep 2026'), t('End Date')], ['8', t('Groups Created'), true]]}
              onClick={() => navigate(`/classroom/${classId}/progress`)}
            />
          </div>
        ) : (
          <div key="s" className="flex flex-col gap-3">
            <FilterChips
              label={t('Filter students')}
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: t('All'), count: roster.length },
                { value: 'submitted', label: t('Submitted'), count: done.length },
                { value: 'not-submitted', label: t('Not submitted'), count: roster.length - done.length },
              ]}
            />
            <div key={filter} className="stagger flex flex-col gap-2">
            {shown.length === 0 && (
              <p className="animate-fade-up rounded-[10px] border border-dashed border-line bg-white px-4 py-6 text-center text-[0.8125rem] leading-5 text-ink-muted">
                {filter === 'submitted' ? t('No one has submitted yet.') : t('Everyone has submitted.')}
              </p>
            )}
            {shown.map((s) => (
              <button
                key={s.id}
                onClick={() =>
                  navigate(
                    s.submitted
                      ? `/know-myself/${classId}/response/${s.id}?s=${survey.id}`
                      : `/know-myself/${classId}/nudge?s=${survey.id}&tab=pending`,
                  )
                }
                className="tap-soft flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-line bg-white p-3.5 text-left hover:bg-[#fffdfb]"
              >
                <div className="min-w-[min(10rem,100%)] flex-1">
                  <p className="break-words text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{s.name}</p>
                  <p className="text-[0.75rem] leading-4 text-ink-muted">{s.apaar}</p>
                </div>
                <Chip tone={s.submitted ? 'green' : 'grey'}>{s.submitted ? t('Submitted') : t('Not submitted')}</Chip>
              </button>
            ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------ 263:20960 */

export function SurveyOverview() {
  const navigate = useNavigate()
  const { showToast } = useAppStore()
  const t = useT()
  const { classId, cls, survey, classSubtitle } = useKnowMyself()
  const { roster, done } = useRoster(cls)
  const [sample, setSample] = useState(false)
  const pct = roster.length ? (done.length / roster.length) * 100 : 0

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<KMAppBar heading title={t(survey.title)} subtitle={classSubtitle} step="1 / 3" />}
      footer={
        <BottomActions>
          <PrimaryButton className="font-bold" onClick={() => navigate(`/know-myself/${classId}/nudge?s=${survey.id}`)}>
            {t('View Submissions')}
          </PrimaryButton>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-4 p-4">
        <button
          onClick={() => navigate(`/know-myself/${classId}/nudge?s=${survey.id}`)}
          className="tap-soft rounded-[10px] border border-line bg-white p-4 text-left hover:shadow-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <SectionLabel>{t('Track Progress')}</SectionLabel>
            <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">
              <CountUpOf to={done.length} total={roster.length} />
            </p>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#f1efec]">
            <div className="animate-grow-x h-full origin-left rounded-full bg-[#1b6b34]" style={{ width: `${pct}%` }} />
          </div>
          <p className="pt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {t('View submissions by learners and nudge those who haven’t submitted')}
          </p>
        </button>

        <div className="rounded-[10px] border border-line bg-[#faf8f6] p-4">
          <SectionLabel>{t('Why this matters')}</SectionLabel>
          <p className="pt-2 text-[1rem] font-medium leading-6 text-ink">{t(survey.why)}</p>
        </div>
        <MetaCells items={[[survey.id, t('Section')], [survey.questions, t('Questions')], [t(survey.competency), t('Competency')]]} />

        <MaterialCard
          variant="outline"
          title={t('Discussion guide')}
          desc={t('PDF · 2 pages · supplied by the state admin')}
          action={t('Download')}
          onAction={() => showToast(t('Discussion guide downloaded'))}
        />
        <MaterialCard
          variant="outline"
          title={t('Activity Sample')}
          desc={t('View the questions learner’s will be asked')}
          action={t('View')}
          onAction={() => setSample(true)}
        />
      </div>
      <SampleSheet open={sample} onClose={() => setSample(false)} survey={survey} />
    </Screen>
  )
}

/* ------------------------------------------------ 263:21042 / 263:21122 */

export function Nudge() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { showToast } = useAppStore()
  const t = useT()
  const { classId, cls, survey, classSubtitle } = useKnowMyself()
  const { done, pending } = useRoster(cls)
  const tab = params.get('tab') === 'pending' ? 'pending' : 'completed'
  const setTab = (v) => {
    const next = new URLSearchParams(params)
    next.set('tab', v)
    setParams(next, { replace: true })
  }

  const [selected, setSelected] = useState(() => new Set(pending.map((s) => s.id)))
  const [reminded, setReminded] = useState(() => new Set())
  const [sending, setSending] = useState(false)
  const toSend = [...selected].filter((id) => !reminded.has(id))
  const allReminded = pending.length > 0 && pending.every((s) => reminded.has(s.id))

  const toggle = (id) => {
    if (reminded.has(id)) return
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const send = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setReminded((prev) => new Set([...prev, ...toSend]))
      showToast(t(toSend.length === 1 ? 'Reminder sent to {n} student' : 'Reminder sent to {n} students', { n: toSend.length }))
    }, 650)
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<KMAppBar title={t(survey.title)} subtitle={classSubtitle} step="1 / 3" />}
      footer={
        tab === 'pending' && pending.length > 0 ? (
          <BottomActions className="animate-fade-up">
            <PrimaryButton className="font-bold" disabled={toSend.length === 0} loading={sending} onClick={send}>
              {allReminded
                ? t('Reminder sent')
                : t(toSend.length === 1 ? 'Send nudge to {n} student' : 'Send nudge to {n} students', { n: toSend.length })}
            </PrimaryButton>
          </BottomActions>
        ) : null
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div key={tab} className="animate-fade-up">
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">
            {tab === 'completed'
              ? t('{n} students have responded', { n: done.length })
              : t("{n} students haven't finished", { n: pending.length })}
          </h1>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {tab === 'completed'
              ? t('View responses submitted by the learners')
              : t('A reminder goes straight to the learner — nothing is marked or scored.')}
          </p>
        </div>

        <SegTabs
          size="sm"
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'completed', label: t('Completed') },
            { value: 'pending', label: t('Pending') },
          ]}
        />

        {tab === 'pending' && pending.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-1">
            <SectionLabel className="text-ink-muted">
              {reminded.size > 0 ? t('{n} reminded', { n: reminded.size }) : t('{n} selected', { n: selected.size })}
            </SectionLabel>
            <button
              onClick={() => {
                const open = pending.filter((s) => !reminded.has(s.id)).map((s) => s.id)
                const allOn = open.every((id) => selected.has(id))
                setSelected(new Set(allOn ? [...reminded] : [...reminded, ...open]))
              }}
              className="tap min-h-11 rounded-full px-3 py-2 text-[0.8125rem] font-semibold text-brand-700 hover:bg-brand-50"
            >
              {pending.filter((s) => !reminded.has(s.id)).every((s) => selected.has(s.id)) ? t('Clear all') : t('Select all')}
            </button>
          </div>
        )}

        {tab === 'completed' ? (
          <div key="c" className="stagger flex flex-col gap-3 pt-7">
            {done.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/know-myself/${classId}/response/${s.id}?s=${survey.id}`)}
                className="tap-soft flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-[10px] border border-line bg-white p-3.5 text-left hover:bg-[#fffdfb]"
              >
                <p className="min-w-[min(8rem,100%)] flex-1 break-words text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{s.name}</p>
                <span className="shrink-0 text-[0.8125rem] font-bold leading-4 tracking-[1.04px] text-[#1b6b34]">{t('View')}</span>
              </button>
            ))}
          </div>
        ) : (
          <div key="p" className="stagger flex flex-col gap-3">
            {pending.map((s) => {
              const isSent = reminded.has(s.id)
              const on = selected.has(s.id)
              return (
                <button
                  key={s.id}
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => toggle(s.id)}
                  className={cx(
                    'tap-soft flex flex-wrap items-center justify-between gap-3 rounded-[10px] border p-3.5 text-left transition-colors duration-200',
                    isSent ? 'border-line bg-white' : on ? 'border-brand bg-[#fffaf5]' : 'border-line bg-white hover:bg-[#fffdfb]',
                  )}
                >
                  <p className="min-w-[min(8rem,100%)] flex-1 break-words text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{s.name}</p>
                  {isSent ? (
                    <span className="animate-fade-in flex shrink-0 items-center gap-1 text-[0.75rem] font-bold leading-4 text-[#1b6b34]">
                      <img alt="" width="14" height="14" src={check14} /> {t('Reminded')}
                    </span>
                  ) : (
                    <span
                      className={cx(
                        'grid size-5 shrink-0 place-items-center rounded-[6px] border transition-colors duration-200',
                        on ? 'border-brand bg-brand' : 'border-[#c9c5c0] bg-white',
                      )}
                    >
                      {on && (
                        <svg key="c" className="animate-check-pop" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6.2 5 8.5l4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------ 263:24710 */

export function StudentResponse() {
  const { studentId } = useParams()
  const t = useT()
  const { survey } = useKnowMyself()
  const student = getStudent(studentId)
  const total = survey.sample.length

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={
        <KMAppBar
          title={student.name}
          subtitle={student.apaar}
          subtitleClassName="!text-[0.8125rem] !font-normal !text-ink-2"
        />
      }
    >
      <div className="flex flex-col gap-4 p-4 pb-8">
        <div>
          <SectionLabel>{t('Submitted')}</SectionLabel>
          <h1 className="pt-1 text-[1.375rem] font-semibold leading-7 text-ink">
            {survey.id} · {t(survey.title)}
          </h1>
        </div>

        <div className="flex items-center gap-3 rounded-[10px] border border-line bg-white p-4">
          <div className="animate-pop-in grid size-10 shrink-0 place-items-center rounded-full bg-[#eaf6ec]">
            <img alt="" width="18" height="18" src={check18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{t('Submission received')}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
              {t('{n} of {total} questions answered', { n: total, total })}
            </p>
          </div>
        </div>

        <div className="stagger flex flex-col gap-3">
          {survey.sample.map((item, i) => (
            <div key={i} className="rounded-[10px] border border-line bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-ink-muted">{t('Question {n}', { n: i + 1 })}</p>
                <img alt="" width="14" height="14" src={check14} />
              </div>
              <p className="pt-2 text-[1rem] font-medium leading-6 text-ink">{t(item.q)}</p>
              <p className="pb-1 pt-2 text-[0.75rem] font-bold uppercase leading-4 tracking-[0.8px] text-ink-muted">{t('Your answer')}</p>
              <span className="inline-block rounded-[14px] bg-brand-50 px-2.5 py-[5px] text-[0.75rem] font-bold leading-4 text-brand-700">
                {t(item.a)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
