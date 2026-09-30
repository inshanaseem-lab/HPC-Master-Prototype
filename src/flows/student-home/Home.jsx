import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeIndicator, Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { STUDENT } from '../../student/data.js'
import { useStudentState } from '../../student/store.js'
import parakh from '../../assets/common/parakh.png'
import hpEmblem from '../../assets/common/hp-emblem.png'
import { useMultiStage } from '../../hpc/store.js'
import illusHpc from '../../assets/common/illus-view-hpc.png'
import illusActivity from '../../assets/common/illus-start-activity.png'
import { focusCards, finishedLiveOnes, groupCards, isUrgent, liveActivities, pathFor, withSteps } from './lib.js'
import { ArrowRight, CheckVerified, Chevron, Overline, SmallButton, UserIcon, useOnline } from './parts.jsx'
import { OfflinePanel } from './StatusScreens.jsx'

const FOCUS_LIMIT = 2
const GROUP_TINTS = ['#cbecf2', '#ffc1d6', '#e3dcff', '#d9f2dc']

/** 1.1 Home — with 8.1 first day, 8.2 all caught up and 12.x "all done" states derived from activity state. */
export default function Home() {
  const t = useT()
  const navigate = useNavigate()
  const online = useOnline()
  const { activities: raw, groupCreated } = useStudentState()
  const ms = useMultiStage()
  const activities = withSteps(raw, ms)

  const live = liveActivities(activities)
  const cards = focusCards(activities)
  const groups = groupCreated ? groupCards(activities) : []
  const firstDay = activities.length === 0
  const [showAll, setShowAll] = useState(false)
  const extra = cards.slice(FOCUS_LIMIT)

  return (
    <div className="relative h-full w-full">
    <Screen bg="gradient" statusBar="light" className="[&>div:first-child]:!bg-[#ffeee2]" footer={<div className="pb-2"><HomeIndicator /></div>}>
      {/* Header */}
      {/* Wrapping header: logo, emblem and profile stay on row 1; the greeting drops to its own
          full-width row when there is no room (small phones, large OS text). Names never truncate. */}
      <div className="[container-type:inline-size]">
        <div className="flex min-h-[96px] flex-wrap items-center gap-x-3 gap-y-2 p-4">
          <img src={parakh} alt="PARAKH" width="52" height="52" className="order-1 size-[52px] shrink-0 object-contain" />
          <div className="order-4 flex min-w-0 basis-full flex-col [@container(min-width:calc(7.5rem_+_240px))]:order-2 [@container(min-width:calc(7.5rem_+_240px))]:flex-1 [@container(min-width:calc(7.5rem_+_240px))]:basis-0">
            <h1 className="flex flex-col">
              <span className="text-[1rem] leading-[1.375rem] text-slate-500">{firstDay ? t('Welcome') : t('Welcome back')}</span>
              <span className="break-words text-[1.125rem] font-semibold leading-6 text-ink">{STUDENT.name}</span>
            </h1>
            <span className="break-words text-[0.8125rem] leading-[1.1875rem] text-slate-500">
              {t('Class {grade} {section} · Student ID {id}', { grade: STUDENT.grade, section: STUDENT.section, id: STUDENT.idMasked })}
            </span>
          </div>
          <img src={hpEmblem} alt={t('Himachal Pradesh Government emblem')} width="74" height="52" className="order-2 ml-auto h-[52px] w-auto shrink-0 object-contain [@container(min-width:calc(7.5rem_+_240px))]:order-3 [@container(min-width:calc(7.5rem_+_240px))]:ml-0" />
          <button
            aria-label={t('My profile')}
            onClick={() => navigate('/s/profile')}
            className="tap order-3 grid size-11 shrink-0 place-items-center rounded-[10px] bg-white text-brand-700 shadow-[inset_0_0_0_1px_#ff7900] hover:bg-brand-50 [@container(min-width:calc(7.5rem_+_240px))]:order-4"
          >
            <UserIcon size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4 pb-10 pt-4">
        {/* Today's Focus */}
        <div className="flex items-center gap-2">
          <Overline tone="brand">{t('Today’s Focus')}</Overline>
          {cards.length > 0 && live.length > 0 && (
            <span key={cards.length} className="grid min-h-5 min-w-5 animate-pop-in place-items-center rounded-full bg-brand px-1.5 text-[0.75rem] font-semibold leading-none text-white">
              {cards.length}
            </span>
          )}
        </div>
        {firstDay || (live.length === 0 && !finishedLiveOnes(activities)) ? (
          <FocusEmpty title={t('Nothing here yet')} body={t('When your teacher makes an activity live, it will show up here.')} />
        ) : live.length === 0 ? (
          <div className="flex animate-fade-up items-center gap-3 rounded-[18px] bg-[#e6f2ea] p-4">
            <span className="grid size-10 shrink-0 animate-pop-in place-items-center rounded-full bg-white text-[#1b6b34]"><CheckVerified size={22} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.875rem] font-semibold leading-5 text-ink">{t('All done for now')}</p>
              <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-2">{t('You’ve finished every live activity. New ones will show up here.')}</p>
            </div>
          </div>
        ) : cards.length === 0 ? (
          <FocusEmpty title={t('You’re all caught up')} body={t('No next steps right now. New activities and steps will show up here.')} />
        ) : (
          <div className="flex flex-col">
            <div className="stagger flex flex-col gap-3">
              {cards.slice(0, FOCUS_LIMIT).map((c) => <FocusCard key={`${c.a.id}-${c.key}`} c={c} />)}
            </div>
            {extra.length > 0 && (
              <>
                {/* Extra cards: height + opacity transition, staggered fade-in when expanding */}
                <div
                  className={cx('grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out', showAll ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0')}
                  aria-hidden={!showAll}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="flex flex-col gap-3">
                      {extra.map((c, i) => (
                        <div key={`${c.a.id}-${c.key}`} className={showAll ? 'animate-fade-up' : ''} style={showAll ? { animationDelay: `${i * 50}ms` } : undefined}>
                          <FocusCard c={c} tabIndex={showAll ? 0 : -1} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                  className="tap mt-3 flex min-h-11 items-center justify-center gap-1.5 self-center rounded-full px-4 py-2 text-[0.8125rem] font-medium text-brand-700 transition-colors hover:bg-brand-50"
                >
                  {showAll ? t('Show less') : t('View all ({n})', { n: cards.length })}
                  <Chevron size={16} className={cx('transition-transform duration-300', showAll ? '-rotate-90' : 'rotate-90')} />
                </button>
              </>
            )}
          </div>
        )}

        <div className="h-px bg-line" />

        {/* Quick Actions */}
        <Overline tone="brand">{t('Quick Actions')}</Overline>
        <div className="flex flex-wrap gap-5">
          <QuickAction
            primary
            title={t('View My HPC')}
            body={t('Your Live Holistic Progress Card')}
            img={illusHpc}
            imgSize={58}
            imgTop={37}
            onClick={() => navigate('/s/hpc')}
          />
          <QuickAction
            title={t('My Activities')}
            body={t('Live and completed activities')}
            img={illusActivity}
            imgSize={62}
            imgTop={27}
            onClick={() => navigate('/s/activities?tab=live')}
          />
        </div>

        {/* My Groups — only once a group exists */}
        {groups.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="h-px bg-line" />
            <h2 className="text-[1.125rem] font-semibold leading-6 text-ink">{t('My Groups')}</h2>
            <div className="stagger grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3">
              {groups.map(({ group, activity }, i) => (
                <button
                  key={group.id}
                  onClick={() => navigate(`/s/group/${group.id}`)}
                  className="tap-soft flex min-h-[180px] flex-col gap-2.5 rounded-[18px] p-4 text-left shadow-[inset_0_0_0_1px_#e5e6e1] hover:shadow-[inset_0_0_0_1px_#e5e6e1,0_6px_14px_rgba(0,0,0,0.08)]"
                  style={{ backgroundColor: GROUP_TINTS[i % GROUP_TINTS.length] }}
                >
                  <span className="grid size-[54px] place-items-center rounded-2xl bg-white text-[0.875rem] font-semibold text-[#b54a45] shadow-[inset_0_0_0_1px_#e1e1e1]">
                    {group.id}
                  </span>
                  <span className="flex flex-col gap-0.5 text-[0.875rem] leading-5 text-[#20231f]">
                    <span className="font-bold">{t(group.name)}</span>
                    <span>{t(activity.title)}</span>
                    <span>{t('{n} members', { n: group.members.length })}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </Screen>
      {/* 11.3 — shown automatically when the device goes offline */}
      {!online && (
        <div className="absolute inset-0 z-30 animate-fade-in">
          <OfflinePanel />
        </div>
      )}
    </div>
  )
}

/** One Today's Focus card — tap anywhere (or Start) to open the activity at its next step. */
function FocusCard({ c, tabIndex = 0 }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const title = c.code
    ? t(c.title[0], { title: `${c.code} · ${t(c.a.title)}` })
    : t(c.title[0], c.title[1] && { ...c.title[1], title: t(c.title[1].title) })
  const sub = t(c.sub[0], c.sub[1] && { ...c.sub[1], title: t(c.sub[1].title) })
  const open = () => navigate(pathFor(c.a))
  return (
    // The Start button is the single keyboard/screen-reader control; the card is a larger tap target.
    <div
      onClick={open}
      className="tap-soft flex cursor-pointer flex-wrap items-center gap-3 rounded-[18px] border border-[#e5e6e1] bg-white p-4 hover:border-[#ffc999] hover:shadow-card"
    >
      <div className="flex min-w-[10rem] flex-1 flex-col gap-0.5">
        <p className="text-[0.875rem] font-semibold leading-5 text-[#20231f]">{title}</p>
        <p className="text-[0.8125rem] leading-5 text-[#6d726b]">{sub}</p>
        <p className={cx('text-[0.75rem] font-semibold leading-[1.125rem]', isUrgent(c.a) ? 'text-danger' : 'text-ink-muted')}>
          {c.a.late ? t('Deadline passed · reflection still open') : t('Due {date}', { date: d(c.a.due) })}
        </p>
      </div>
      <SmallButton tabIndex={tabIndex} onClick={(e) => { e.stopPropagation(); open() }}>{t(c.cta)}</SmallButton>
    </div>
  )
}

function FocusEmpty({ title, body }) {
  return (
    <div className="flex animate-fade-up flex-col gap-0.5 rounded-[18px] border border-dashed border-[#cdcac5] bg-[#f1efec] p-4">
      <p className="text-[0.875rem] font-semibold leading-5 text-ink">{title}</p>
      <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>
    </div>
  )
}

function QuickAction({ primary, title, body, img, imgSize, imgTop, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'tap-soft group relative flex min-h-[124px] min-w-[8rem] flex-1 flex-col gap-3 overflow-hidden rounded-2xl border border-[#ffa554] p-4 text-left hover:shadow-[0_8px_18px_rgba(255,121,0,0.22)]',
        primary ? 'bg-brand' : 'bg-white',
      )}
    >
      <img src={img} alt="" width={imgSize} height={imgSize} className="pointer-events-none absolute right-2.5 object-contain transition-transform duration-300 group-hover:scale-105"
        style={{ top: imgTop, width: imgSize, height: imgSize }} />
      <span className={cx('relative text-[0.875rem] font-bold leading-6', primary ? 'text-white' : 'text-black')}>{title}</span>
      <span className="relative mt-auto flex items-end justify-between gap-2">
        <span className={cx('max-w-[6.25rem] text-[0.75rem] leading-[1.125rem]', primary ? 'text-white' : 'text-ink-muted')}>{body}</span>
        <span className={cx('grid size-[26px] shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5', primary ? 'bg-white text-black' : 'bg-brand text-white')}>
          <ArrowRight size={16} />
        </span>
      </span>
    </button>
  )
}
