import { useNavigate, useSearchParams } from 'react-router-dom'
import { Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { GROUPS } from '../../student/data.js'
import { useStudentState } from '../../student/store.js'
import { completedActivities, finishedLiveOnes, isUrgent, liveActivities, nextStep, pathFor, withSteps } from './lib.js'
import { useMultiStage } from '../../hpc/store.js'
import { ArrowRight, CheckVerified, ClipboardIcon, EmptyBox, SectionBadge, SmallButton, StudentAppBar, Tag } from './parts.jsx'

/** 3.1 Live tab / 3.2 Completed tab, with 8.3 / 8.4 empty states, 9.2 missed items and 12.3 everything finished. */
export default function Activities() {
  const t = useT()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'completed' ? 'completed' : 'live'
  const { activities: raw } = useStudentState()
  const ms = useMultiStage()
  const activities = withSteps(raw, ms)
  const live = liveActivities(activities)
  const completed = completedActivities(activities)
  const setTab = (id) => setParams({ tab: id }, { replace: true })

  const tabs = [
    { id: 'live', label: t('Live ({n})', { n: live.length }) },
    { id: 'completed', label: t('Completed ({n})', { n: completed.length }) },
  ]
  const idx = tab === 'live' ? 0 : 1

  return (
    <Screen bg="plain" statusBar="light" header={<StudentAppBar title={t('My Activities')} />}>
      <div className="flex flex-col gap-4 px-4 pb-8 pt-4">
        {/* Segmented tabs with sliding indicator */}
        <div role="tablist" className="relative flex rounded-full bg-[#f1efec] p-1">
          <span aria-hidden className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.05)] transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${idx * 100}%)` }} />
          {tabs.map((tb) => (
            <button key={tb.id} role="tab" aria-selected={tab === tb.id} onClick={() => setTab(tb.id)}
              className={cx('tap relative z-10 min-h-11 min-w-0 flex-1 rounded-full px-2 py-2 text-center text-[0.8125rem] leading-5 transition-colors',
                tab === tb.id ? 'font-semibold text-ink' : 'text-ink-muted hover:text-ink')}>
              {tb.label}
            </button>
          ))}
        </div>

        <div key={tab} className="animate-fade-up">
          {tab === 'live' ? (
            live.length === 0 ? (
              finishedLiveOnes(activities) ? (
                <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#e6f2ea] px-5 py-8 text-center">
                  <span className="mb-1 grid size-12 animate-pop-in place-items-center rounded-full bg-white text-[#1b6b34]"><CheckVerified size={24} /></span>
                  <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t('All done for now')}</p>
                  <p className="max-w-[17.5rem] text-[0.8125rem] leading-[1.1875rem] text-ink-2">{t('You’ve finished every live activity. New ones will show up here.')}</p>
                  <div className="pt-2"><SmallButton variant="outline" onClick={() => setTab('completed')}>{t('View Completed')}</SmallButton></div>
                </div>
              ) : (
                <EmptyBox icon={<ClipboardIcon size={24} />} title={t('No live activities')}
                  body={t('Your teachers haven’t made any activity live. You’ll see new ones here and on your home screen.')}
                  action={completed.length > 0 && <SmallButton variant="outline" onClick={() => setTab('completed')}>{t('View Completed')}</SmallButton>} />
              )
            ) : (
              <div className="stagger flex flex-col gap-3">
                {live.map((a) => <LiveCard key={a.id} a={a} onOpen={() => navigate(pathFor(a))} />)}
              </div>
            )
          ) : completed.length === 0 ? (
            <EmptyBox icon={<ClipboardIcon size={24} />} title={t('No completed activities yet')} body={t('Activities move here once you finish all your steps.')} />
          ) : (
            <div className="stagger flex flex-col gap-3">
              {completed.map((a) => <CompletedCard key={a.id} a={a} onOpen={() => navigate(pathFor(a))} />)}
            </div>
          )}
        </div>
      </div>
    </Screen>
  )
}

export const titleOf = (t, a) => (a.code ? `${a.code} · ${t(a.title)}` : t(a.title))

/** Second line under the title on a Live card. */
function liveMeta(t, a) {
  const group = a.groupId && GROUPS[a.groupId] ? t(GROUPS[a.groupId].name) : null
  switch (a.section) {
    case 'A': return t('{n} questions · about {m} min', { n: a.questions ?? 6, m: a.minutes ?? 8 })
    case 'B': {
      const status = {
        'in-progress': t('working on the project'), 'waiting-teacher': t('waiting for your teacher to record the submission'),
        recorded: t('submission recorded'), reflected: t('self-reflection done'),
      }[a.state]
      return [group, status].filter(Boolean).join(' · ')
    }
    case 'C': return [a.individual ? t('Individual') : group, a.state === 'draft' && t('draft saved'), a.state === 'submitted' && t('work submitted')].filter(Boolean).join(' · ')
    case 'D': return [a.type && t(a.type), a.side && t(a.side)].filter(Boolean).join(' · ') || group
    default: return ''
  }
}

function LiveCard({ a, onOpen }) {
  const t = useT()
  const d = useDate()
  return (
    <button onClick={onOpen}
      className="tap-soft group flex w-full flex-col gap-2 rounded-2xl border border-[#e5e6e1] bg-white p-4 text-left hover:border-[#ffc999] hover:shadow-card">
      <span className="flex w-full items-center justify-between gap-2">
        <span className="flex flex-wrap gap-1.5">
          <SectionBadge section={a.section} />
          {a.late && <Tag tone="warning">{t('Late')}</Tag>}
        </span>
        <ArrowRight size={18} className="shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
      <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{titleOf(t, a)}</span>
      <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{liveMeta(t, a)}</span>
      <span className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[#f1efec] pt-2">
        <span className="text-[0.8125rem] font-medium leading-[1.1875rem] text-brand-600">{t(nextStep(a))}</span>
        <span className={cx('text-[0.75rem] font-semibold leading-[1.125rem]', isUrgent(a) ? 'text-danger' : 'text-ink-muted')}>
          {a.late ? t('Deadline passed') : t('Due {date}', { date: d(a.due) })}
        </span>
      </span>
    </button>
  )
}

function CompletedCard({ a, onOpen }) {
  const t = useT()
  const d = useDate()
  const missed = a.state === 'missed'
  const meta = missed
    ? t('Deadline was {date}', { date: d(a.due) })
    : a.closed && a.state !== 'done'
      ? t('Reflection window closed')
      : a.submittedOn ? t('Submitted on {date}', { date: d(a.submittedOn) }) : t('Completed')
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5e6e1] bg-white px-4 py-3.5">
      <div className="flex min-w-[10rem] flex-1 flex-col gap-0.5">
        <span className="flex flex-wrap gap-1.5">
          <SectionBadge section={a.section} />
          {missed && <Tag tone="error">{t('Missed')}</Tag>}
        </span>
        <span className="pt-1 text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{titleOf(t, a)}</span>
        <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{meta}</span>
      </div>
      <SmallButton variant="outline" onClick={onOpen}>{t('View')}</SmallButton>
    </div>
  )
}
