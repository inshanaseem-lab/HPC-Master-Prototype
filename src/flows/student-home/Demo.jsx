import { useNavigate } from 'react-router-dom'
import { Screen } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { INITIAL_ACTIVITIES } from '../../student/data.js'
import { resetStudentState, setStudentState } from '../../student/store.js'
import { isDone } from './lib.js'
import { Card, Chevron, Overline, StudentAppBar } from './parts.jsx'

/** Fresh activity list with per-id patches applied. */
const withPatches = (patches = {}) => INITIAL_ACTIVITIES.map((a) => ({ ...a, ...(patches[a.id] ?? {}) }))

const FINISHED = {
  'gp-water': { state: 'done', submittedOn: '12 Sep' },
  'ci-plastic': { state: 'done', submittedOn: '13 Sep' },
  a4: { state: 'submitted', submittedOn: '10 Sep' },
  a5: { state: 'submitted', submittedOn: '10 Sep' },
  'pbi-energy': { state: 'done', submittedOn: '10 Sep' },
}

/** Reviewer tool: jump into every student state. */
const GROUPS_OF_STATES = [
  {
    title: 'Home',
    items: [
      { label: 'Home · default', code: '1.1', to: '/s/home', run: () => resetStudentState() },
      { label: 'Home · first day', code: '8.1', to: '/s/home', run: () => setStudentState({ activities: [], groupCreated: false }) },
      {
        label: 'Home · all caught up', code: '8.2', to: '/s/home',
        run: () => setStudentState({
          groupCreated: true,
          activities: withPatches({ ...FINISHED, 'gp-water': { state: 'waiting-teacher' }, 'ci-plastic': { state: 'waiting-teacher' } }),
        }),
      },
      { label: 'Home · no groups yet', code: '1.1', to: '/s/home', run: () => setStudentState({ activities: withPatches(), groupCreated: false }) },
      {
        label: 'Home · group project is live', code: '1.3', to: '/s/home',
        run: () => setStudentState({ groupCreated: true, activities: withPatches({ 'gp-water': { state: 'in-progress' }, 'ci-plastic': { state: 'before-class' } }) }),
      },
      {
        label: 'Home · reflect on Problem Based Enquiry', code: '1.3', to: '/s/home',
        run: () => setStudentState({ groupCreated: true, activities: withPatches({ 'pbi-energy': { state: 'submitted', files: ['clean-energy-plan.pdf'] } }) }),
      },
    ],
  },
  {
    title: 'My Activities',
    items: [
      { label: 'Everything finished', code: '12.3', to: '/s/activities?tab=live', run: () => setStudentState({ groupCreated: true, activities: withPatches(FINISHED) }) },
      {
        label: 'Live tab · empty', code: '8.3', to: '/s/activities?tab=live',
        run: () => setStudentState({ groupCreated: false, activities: withPatches().filter((a) => isDone(a)) }),
      },
      {
        label: 'Completed tab · empty', code: '8.4', to: '/s/activities?tab=completed',
        run: () => setStudentState({ groupCreated: true, activities: withPatches().filter((a) => !isDone(a)) }),
      },
      { label: 'Completed tab · missed item', code: '9.2', to: '/s/activities?tab=completed', run: () => setStudentState({ groupCreated: true, activities: withPatches({ 'pbi-energy': { state: 'missed' } }) }) },
    ],
  },
  {
    title: 'Deadlines and waiting',
    items: [
      {
        label: 'Late reflection window', code: '9.4', to: '/s/project/gp-water',
        run: () => setStudentState({ groupCreated: true, activities: withPatches({ 'gp-water': { state: 'recorded', late: true }, 'ci-plastic': { late: true } }) }),
      },
      {
        label: 'Reflection window closed', code: '9.5', to: '/s/project/gp-water',
        run: () => setStudentState({ groupCreated: true, activities: withPatches({ 'gp-water': { state: 'reflected', closed: true } }) }),
      },
      { label: 'Group project · waiting for teacher', code: '10.1', to: '/s/project/gp-water', run: () => setStudentState({ groupCreated: true, activities: withPatches({ 'gp-water': { state: 'waiting-teacher' } }) }) },
      { label: 'Classroom Interaction · waiting', code: '10.2', to: '/s/class/ci-plastic', run: () => setStudentState({ groupCreated: true, activities: withPatches({ 'ci-plastic': { state: 'waiting-teacher' } }) }) },
    ],
  },
  {
    title: 'Errors',
    items: [
      { label: 'No internet', code: '11.3', to: '/s/offline' },
      { label: 'Something went wrong', code: '11.5', to: '/s/error' },
      { label: 'Upload failed (add work)', code: '11.1', to: '/s/pbi/pbi-energy/add?fail=upload', run: () => resetStudentState() },
      { label: 'Submit failed (confirm)', code: '11.2', to: '/s/pbi/pbi-energy/add?fail=submit', run: () => resetStudentState() },
      { label: 'Handbook download failed', code: '11.4', to: '/s/pbi/pbi-energy?fail=handbook', run: () => resetStudentState() },
    ],
  },
]

export default function Demo() {
  const t = useT()
  const navigate = useNavigate()
  const { showToast } = useAppStore()
  const go = (item) => { item.run?.(); navigate(item.to) }
  const reset = () => { resetStudentState(); showToast(t('Demo data reset')) }

  return (
    <Screen bg="plain" statusBar="light" header={<StudentAppBar title={t('Demo states')} />}>
      <div className="flex flex-col gap-5 px-4 pb-10 pt-4">
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('For reviewers: pick a state to load sample data and open that screen.')}</p>
        {GROUPS_OF_STATES.map((g) => (
          <div key={g.title} className="flex flex-col gap-2">
            <Overline tone="brand">{t(g.title)}</Overline>
            <Card className="stagger overflow-hidden">
              {g.items.map((item, i) => (
                <button key={item.label} onClick={() => go(item)}
                  className={`tap-soft flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#fffaf5] ${i > 0 ? 'border-t border-[#f1efec]' : ''}`}>
                  <span className="w-10 shrink-0 text-[0.75rem] font-semibold text-brand-700">{item.code}</span>
                  <span className="min-w-0 flex-1 text-[0.875rem] font-medium leading-5 text-ink">{t(item.label)}</span>
                  <Chevron size={18} className="shrink-0 text-ink-muted" />
                </button>
              ))}
            </Card>
          </div>
        ))}
        <button onClick={reset} className="tap flex min-h-12 w-full items-center justify-center rounded-full border border-brand-700 bg-brand-50 text-[0.875rem] font-medium text-brand-700 hover:bg-[#ffe8d4]">
          {t('Reset demo data')}
        </button>
      </div>
    </Screen>
  )
}
