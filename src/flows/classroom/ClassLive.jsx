import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FilterChips, Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { Header, MetaCells, SegmentedTabs, classTitle, useDates } from './parts.jsx'
import { TOPICS, getStudents, RESPONDED_COUNT } from './data.js'
import { useClassroom } from './store.js'
import chevronRight from '../../assets/classroom/chevron-right.svg'
import timeMgmt from '../../assets/classroom/time-management.png'

function ActivityCard({ label, title, avatar, start, end, onClick }) {
  const t = useT()
  return (
    <button onClick={onClick} className="tap-soft w-full rounded-2xl border border-line bg-white p-3.5 text-left hover:border-cream-border hover:shadow-card">
      <div className="flex flex-wrap items-center gap-3 pb-2">
        {avatar}
        <div className="min-w-[min(9rem,100%)] flex-1">
          <p className="break-words text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600">{label}</p>
          <p className="break-words pt-0.5 text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{title}</p>
        </div>
        <div className="ms-auto flex shrink-0 items-center gap-3">
          <span className="rounded-full bg-[#d2efdb] px-2.5 py-[5px] text-[0.75rem] font-bold leading-4 text-[#1b6b34]">{t('LIVE')}</span>
          <img alt="" width="18" height="18" src={chevronRight} className="shrink-0" />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-2 border-t border-line pt-3">
        <div className="min-w-[min(6rem,100%)] flex-1">
          <p className="pt-1 text-[0.9375rem] font-medium leading-[1.375rem] text-ink">{start}</p>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Start Date')}</p>
        </div>
        <div className="min-w-[min(6rem,100%)] flex-1">
          <p className="pt-1 text-[0.9375rem] font-medium leading-[1.375rem] text-ink">{end}</p>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('End Date')}</p>
        </div>
      </div>
    </button>
  )
}

const Initials = ({ children }) => (
  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f1efec] text-[0.9375rem] font-bold leading-[1.375rem] text-ink-2">{children}</span>
)

/** Figma 346:4896 — class overview with live activities (progress tracking entry). */
export default function ClassLive() {
  const navigate = useNavigate()
  const t = useT()
  const d = useDate()
  const { short } = useDates()
  const { classId, cls, ci } = useClassroom()
  const [tab, setTab] = useState('activities')
  const [filter, setFilter] = useState('all')
  const students = useMemo(
    () => getStudents(classId, cls.students ?? 40).map((s, i) => ({ ...s, submitted: i < RESPONDED_COUNT })),
    [classId, cls.students],
  )
  const submittedCount = students.filter((s) => s.submitted).length
  const shown = students.filter((s) => filter === 'all' || (filter === 'submitted' ? s.submitted : !s.submitted))
  const topic = TOPICS.find((t) => t.id === ci.topicId) || TOPICS[1]
  const ciTitle = ci.live ? topic.name : 'Himachal Dam'

  return (
    <Screen bg="plain" header={<Header title={classTitle(cls, t)} step="3/3" />}>
      <div className="flex flex-col gap-4 px-4 pb-6 pt-4">
        <div>
          <h1 className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Class Overview')}</h1>
          <div className="pt-0.5">
            <MetaCells cells={[{ value: cls.students ?? 40, label: t('Students') }]} />
          </div>
        </div>
        <SegmentedTabs
          tabs={[{ id: 'activities', label: t('Activities') }, { id: 'students', label: t('Student List') }]}
          value={tab}
          onChange={setTab}
          className="[&>button]:py-2.5 [&>button]:text-[0.875rem]"
        />

        {tab === 'activities' ? (
          <div key="a" className="stagger flex flex-col gap-3">
            <ActivityCard
              label={t('Problem Based Enquiry')}
              title={t('Water in my Village')}
              avatar={<Initials>TM</Initials>}
              start={d('15 Aug 2026')}
              end={d('15 Sep 2026')}
              onClick={() => navigate(`/pbi/${classId}/progress`)}
            />
            <ActivityCard
              label={t('Section A')}
              title={t('TIME MANAGEMENT')}
              avatar={<span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full"><img alt="" width="36" height="32" src={timeMgmt} className="h-[80%] w-[89%] object-contain" /></span>}
              start={d('15 Aug 2026')}
              end={d('15 Sep 2026')}
              onClick={() => navigate(`/know-myself/${classId}/progress`)}
            />
            <ActivityCard
              label={t('Classroom Interaction')}
              title={t(ciTitle)}
              avatar={<Initials>{ciTitle.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}</Initials>}
              start={d('15 Aug 2026')}
              end={ci.live ? short(ci.deadline) : d('15 Sep 2026')}
              onClick={() => navigate(`/classroom/${classId}/overview`)}
            />
          </div>
        ) : (
          <div key="s" className="flex flex-col gap-3">
            <FilterChips
              label={t('Filter students')}
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: t('All'), count: students.length },
                { value: 'submitted', label: t('Submitted'), count: submittedCount },
                { value: 'not-submitted', label: t('Not submitted'), count: students.length - submittedCount },
              ]}
            />
            <div key={filter} className="stagger flex flex-col gap-2">
              {shown.length === 0 && (
                <p className="animate-fade-up rounded-[10px] border border-dashed border-line bg-white px-4 py-6 text-center text-[0.8125rem] leading-5 text-ink-muted">
                  {filter === 'submitted' ? t('No one has submitted yet.') : t('Everyone has submitted.')}
                </p>
              )}
              {shown.map((s) => (
                <div key={s.id} className="flex flex-wrap items-center gap-3 rounded-[10px] border border-line bg-white p-3.5">
                  <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-[0.75rem] font-bold tracking-[0.96px] text-brand-700">{s.initials}</span>
                  <div className="min-w-[min(8rem,100%)] flex-1">
                    <p className="break-words text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{s.name}</p>
                    <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student ID {id}', { id: s.studentId })}</p>
                  </div>
                  <span className={cx('shrink-0 rounded-full px-2.5 py-[5px] text-[0.75rem] font-bold leading-4', s.submitted ? 'bg-[#d2efdb] text-[#1b6b34]' : 'bg-[#f1efec] text-ink-2')}>
                    {s.submitted ? t('Submitted') : t('Not submitted')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
