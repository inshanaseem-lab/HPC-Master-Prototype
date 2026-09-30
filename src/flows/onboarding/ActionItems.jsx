import { Screen, TopAppBar } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { useMultiStage } from '../../hpc/store.js'
import { buildActionItems } from './actions.js'
import { ActionCard } from './Home.jsx'

/** /action-items — kit T01-02 "Action items · N waiting on you". */
export default function ActionItemsScreen() {
  const t = useT()
  const { classes } = useAppStore()
  const ms = useMultiStage()
  const items = buildActionItems(ms, classes)
  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={
        <TopAppBar
          title={t('Action items')}
          subtitle={<span className="font-semibold text-brand-600">{t('{n} waiting on you', { n: items.length })}</span>}
          className="border-b border-line"
        />
      }
    >
      <div className="stagger flex flex-col gap-4 p-4 pb-10">
        {items.map((it) => <ActionCard key={it.key} item={it} />)}
        {items.length === 0 && (
          <div className="animate-fade-up rounded-[18px] border border-dashed border-[#cdcac5] bg-[#f1efec] p-4 text-center">
            <p className="text-[0.875rem] font-semibold leading-5 text-ink">{t('You’re all caught up')}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('New submissions and evaluations will show up here.')}</p>
          </div>
        )}
      </div>
    </Screen>
  )
}
