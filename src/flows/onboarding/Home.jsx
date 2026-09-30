import { useNavigate } from 'react-router-dom'
import { OutlineButton, Screen } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import parakh from '../../assets/common/parakh.png'
import userIcon from '../../assets/common/user.svg'
import tileActivity from '../../assets/onboarding/tile-activity.png'
import tileHpc from '../../assets/onboarding/tile-hpc.png'
import arrowRightBlack from '../../assets/onboarding/arrow-right-black.svg'
import pencil from '../../assets/onboarding/pencil.svg'
import hpEmblem from '../../assets/common/hp-emblem.png'
import { cardFill, classTitle } from './data.js'
import { useT } from '../../i18n/index.js'
import { useMultiStage } from '../../hpc/store.js'
import { buildActionItems, tr } from './actions.js'

const FOCUS_LIMIT = 2

function SectionLabel({ children }) {
  return <p className="text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600">{children}</p>
}

const Divider = ({ tone = '#969490' }) => <div className="h-px w-full border-t" style={{ borderColor: tone }} />

function GreetingHeader() {
  const navigate = useNavigate()
  const { teacher } = useAppStore()
  const t = useT()
  // Wrapping header: logo, emblem and profile button always share the first row. When the row is
  // too narrow for the greeting (small phones, large OS text) the greeting drops to its own full-width
  // row below; names wrap, never truncate. The container query picks the one-row layout only when
  // there is room (≈7.5rem of greeting + the fixed 52/74/44px images and gaps).
  return (
    <div className="shrink-0 [container-type:inline-size]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 p-4">
        <img alt="PARAKH" src={parakh} width="52" height="52" className="order-1 size-[52px] shrink-0 object-contain" />
        <div className="order-4 min-w-0 basis-full [@container(min-width:calc(7.5rem_+_240px))]:order-2 [@container(min-width:calc(7.5rem_+_240px))]:flex-1 [@container(min-width:calc(7.5rem_+_240px))]:basis-0">
          <h1 className="flex flex-col">
            <span className="text-[1rem] leading-5 text-slate-500">{t('Welcome back')}</span>
            <span className="break-words text-[1.125rem] font-semibold leading-6 text-slate-900">{teacher.name}</span>
          </h1>
          <p className="break-words text-[0.75rem] leading-5 text-slate-500">{t('Teacher code {code}', { code: teacher.code })}</p>
        </div>
        <img alt={t('Himachal Pradesh Government emblem')} src={hpEmblem} width="74" height="52" className="order-2 ml-auto h-[52px] w-auto shrink-0 object-contain [@container(min-width:calc(7.5rem_+_240px))]:order-3 [@container(min-width:calc(7.5rem_+_240px))]:ml-0" />
        <button
          aria-label={t('My profile')}
          onClick={() => navigate('/profile')}
          className="tap order-3 grid size-11 shrink-0 place-items-center rounded-[10px] border border-brand bg-white transition-colors hover:bg-brand-50 [@container(min-width:calc(7.5rem_+_240px))]:order-4"
        >
          <img alt="" width="24" height="24" src={userIcon} />
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------ empty state (263:18752) */
function EmptyHome() {
  const navigate = useNavigate()
  const t = useT()
  return (
    <div className="stagger flex flex-col gap-5">
      <SectionLabel>{t('Quick Actions')}</SectionLabel>
      <div className="flex flex-col gap-[14px] rounded-3xl border border-cream-border bg-cream p-4 shadow-card">
        <div className="flex flex-col gap-2">
          <h2 className="text-[1.25rem] font-semibold leading-7 text-ink">{t('Let’s set up your HPC workspace')}</h2>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-2">
            {t('Select the classes for Holistic Progress Card evaluation. Your students, activities, and Live HPC will be ready here.')}
          </p>
        </div>
        <OutlineButton onClick={() => navigate('/classes/manage')}>
          <span className="text-[1.25rem] font-semibold leading-6">+</span>
          {t('Add classes')}
        </OutlineButton>
        <p className="text-center text-[0.8125rem] leading-[1.1875rem] text-ink-2">{t('Welcome! Let’s add your classes')}</p>
      </div>
      <Divider tone="#e4e1dd" />
    </div>
  )
}

/* ------------------------------------------------ populated (263:16483 / 263:17739 / 263:16596) */
function QuickTile({ title, desc, img, imgClass, tone, onClick }) {
  const primary = tone === 'primary'
  return (
    <button
      onClick={onClick}
      className={
        'tap-soft relative flex min-w-[8rem] flex-1 flex-col gap-3 overflow-hidden rounded-2xl border border-[#ffa554] p-4 text-left hover:shadow-card ' +
        (primary ? 'bg-brand hover:bg-brand-hover' : 'bg-white hover:bg-cream')
      }
    >
      <img alt="" src={img} className={'pointer-events-none absolute ' + imgClass} />
      <p className={'relative text-[0.875rem] font-bold leading-6 ' + (primary ? 'text-white' : 'text-black')}>{title}</p>
      <div className="relative mt-auto flex items-end justify-between gap-2">
        <p className={'text-[0.75rem] leading-[1.125rem] ' + (primary ? 'max-w-[6.25rem] text-white' : 'max-w-[5rem] text-ink-muted')}>{desc}</p>
        <span className={'grid size-[26px] shrink-0 place-items-center rounded-full ' + (primary ? 'bg-white' : 'bg-brand')}>
          <img alt="" width="16" height="16" src={arrowRightBlack} />
        </span>
      </div>
    </button>
  )
}

/** Kit T01-01 class card: fill by grade, white badge with the grade in kit red, "Class 11 B - Humanities". */
function ClassCard({ cls }) {
  const navigate = useNavigate()
  const t = useT()
  return (
    <button
      onClick={() => navigate(`/class/${cls.id}`)}
      className="tap-soft flex flex-col gap-[10px] overflow-hidden rounded-[18px] p-4 text-left hover:shadow-card hover:brightness-[1.02]"
      style={{ backgroundColor: cardFill(cls) }}
    >
      <span className="grid min-h-[54px] w-full place-items-center rounded-2xl py-2 border border-[#e1e1e1] bg-white text-[0.9375rem] font-bold leading-5 text-danger">
        {cls.grade} {cls.section}
      </span>
      <span className="flex flex-col gap-0.5 leading-5">
        <span className="text-[0.875rem] font-bold text-[#20231f]">{classTitle(cls, t)}</span>
        <span className="text-[0.8125rem] text-[#111310]">{t(cls.students === 1 ? '{n} student' : '{n} students', { n: cls.students })}</span>
        <span className="text-[0.8125rem] font-medium text-[#40443e]">{t('Track class activities & live HPC')}</span>
      </span>
    </button>
  )
}

/** Kit T01-01/T01-02 action item card. */
export function ActionCard({ item, tabIndex }) {
  const navigate = useNavigate()
  const t = useT()
  return (
    <button
      tabIndex={tabIndex}
      onClick={() => navigate(item.path)}
      className="tap-soft flex w-full items-center gap-3 rounded-[18px] border border-[#ff9a4a] bg-white p-4 text-left hover:bg-cream hover:shadow-card"
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[0.9375rem] font-bold leading-[1.375rem] text-[#20231f]">{tr(t, item.title)}</span>
        {item.sub && <span className="text-[0.8125rem] leading-5 text-ink-muted">{tr(t, item.sub)}</span>}
      </span>
      <ChevronRight />
    </button>
  )
}
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-700" aria-hidden><path d="m9 6 6 6-6 6" /></svg>
)

function PopulatedHome({ classes }) {
  const navigate = useNavigate()
  const t = useT()
  const ms = useMultiStage()
  const items = buildActionItems(ms, classes)
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <SectionLabel>{t('Today’s focus')}</SectionLabel>
        {items.length === 0 ? (
          <div className="animate-fade-up rounded-[18px] border border-dashed border-[#cdcac5] bg-[#f1efec] p-4">
            <p className="text-[0.875rem] font-semibold leading-5 text-ink">{t('You’re all caught up')}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('New submissions and evaluations will show up here.')}</p>
          </div>
        ) : (
          <div className="stagger flex flex-col gap-3">
            {items.slice(0, FOCUS_LIMIT).map((it) => <ActionCard key={it.key} item={it} />)}
          </div>
        )}
        {items.length > FOCUS_LIMIT && (
          <button onClick={() => navigate('/action-items')} className="tap -mr-2 min-h-11 self-end rounded-full px-3 py-1.5 text-[0.875rem] font-semibold text-brand-700 hover:bg-brand-50">
            {t('View all ({n})', { n: items.length })}
          </button>
        )}
      </div>
      <Divider />
      <SectionLabel>{t('Quick Actions')}</SectionLabel>
      <div className="stagger flex flex-wrap gap-5">
        <QuickTile
          tone="primary"
          title={t('Start an Activity')}
          desc={t('Individual, classroom or group projects')}
          img={tileActivity}
          imgClass="right-[11px] top-[36px] size-[58px] object-cover"
          onClick={() => navigate('/activity/start')}
        />
        <QuickTile
          title={t('View Student’s HPC')}
          desc={t('Jump to any student’s profile')}
          img={tileHpc}
          imgClass="right-[9px] top-[26px] size-[62px] object-contain"
          onClick={() => navigate('/students')}
        />
      </div>
      <Divider />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Your Classes')}</h2>
        <button
          onClick={() => navigate('/classes/manage')}
          className="tap flex min-h-11 items-center gap-1 rounded-full border border-brand-700 bg-brand-50 px-[14px] py-2 text-[0.75rem] font-medium leading-[1.375rem] text-brand-700 transition-colors hover:bg-[#ffe8d4]"
        >
          <img alt="" width="16" height="16" src={pencil} />
          {t('Edit classes')}
        </button>
      </div>
      <div className="stagger grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] items-start gap-3">
        {classes.map((c) => <ClassCard key={c.id} cls={c} />)}
      </div>
    </div>
  )
}

/* ------------------------------------------------ /home */
export default function HomeScreen() {
  const { classes } = useAppStore()
  return (
    <Screen bg="gradient" statusBar="light" header={<GreetingHeader />}>
      <div className="px-4 pb-24 pt-4">
        {classes.length === 0 ? <EmptyHome /> : <PopulatedHome classes={classes} />}
      </div>
    </Screen>
  )
}
