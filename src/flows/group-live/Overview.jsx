import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BottomActions, OutlineButton, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ABILITIES, LEVELS, OPEN_QUESTIONS, bandFor } from '../../hpc/config.js'
import { AssessorTable, EventNotice, LeaveSheet, LevelBadge, LockNotice, OpenQuestion, ProvenanceChip } from '../../hpc/components.jsx'
import { MAX, emit, groupOf, nameOf, overviewScores, postSubmitted, saveWithGuard } from './lib.js'
import { AppBar, Card, NoActivityRedirect, SectionLabel, StateScreen, groupLabel, useBPage } from './parts.jsx'

export const OQ_PEER = 'How several peer reviews combine into one peer score is not defined; this shows the rounded average.'

/**
 * Overview (Page 7) for one learner: teacher / learner / peer scores stay separate (AssessorTable,
 * bands from config), then the teacher PICKS the final level per ability (OQ-FINAL).
 * Emits 'B.overview_saved'.
 */
export default function Overview() {
  const { classId, learnerId, a, base } = useBPage()
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const [final, setFinal] = useState({})
  const [error, setError] = useState(0)
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState(false)

  if (!a) return <NoActivityRedirect classId={classId} />
  const l = a.learners?.[learnerId]
  const group = groupOf(a, learnerId)
  if (!l || !group) return <Navigate to={base} replace />
  const name = nameOf(a, learnerId)
  const back = () => navigate(`${base}?stage=overview`)

  if (!l.s3Teacher?.savedAt) {
    return <StateScreen title={t('Overview')} subtitle={name} heading={t('Assess Stage 3 first')}
      body={t('The Overview brings together all three stages. It opens once you save {name}’s Stage 3 assessment.', { name })}
      action={t('Go to Stage 3')} onAction={() => navigate(`${base}/s3/${learnerId}`)} />
  }

  const { scores, reviews } = overviewScores(a, learnerId)
  const saved = l.overview?.savedAt
  const unbanded = ABILITIES.some((ab) => bandFor('B', 'teacher', scores.teacher[ab.id]).id === 'unbanded')
  const bands = (ab) => ['teacher', 'learner', 'peer'].map((k) => [k, scores[k][ab] == null ? null : bandFor('B', k, scores[k][ab]).id])
  const missing = ABILITIES.filter((ab) => !final[ab.id])
  const dirty = Object.keys(final).length > 0

  const save = () => {
    if (missing.length) { setError((n) => n + 1); return }
    saveWithGuard({
      setLoading, showToast, t,
      run: () => {
        emit(a.id, 'B.overview_saved', (x) => { x.learners[learnerId].overview = { final, savedAt: new Date().toISOString() } }, { target: learnerId })
        showToast(t('Overview saved for {name}', { name }))
      },
    })
  }

  const sources = [
    ['teacher', t('Stage 1 ticks + Stage 2 ticks + Stage 3 level (5 / 10 / 15)')],
    ['student', l.s1Self?.savedAt || l.s3Self?.savedAt
      ? t('Stage 1 self-reflection {a} · Stage 3 self-reflection {b}', { a: l.s1Self?.savedAt ? '✓' : '—', b: l.s3Self?.savedAt ? '✓' : '—' })
      : t('No self-reflection submitted yet')],
    ['peer', reviews ? t('{n} peer reviews received', { n: reviews }) : t('No peer reviews received yet')],
  ]

  return (
    <Screen
      bg="plain"
      header={<AppBar title={t('Overview · {name}', { name })} subtitle={groupLabel(t, group.name)} onBack={() => (!saved && dirty ? setLeave(true) : back())} />}
      footer={
        <BottomActions>
          {saved ? (
            <PrimaryButton onClick={() => navigate(`${base}/post/${learnerId}`)}>{t('Post-project · final comments')}</PrimaryButton>
          ) : (
            <PrimaryButton className="font-semibold" loading={loading} onClick={save}>{t('Save final levels')}</PrimaryButton>
          )}
        </BottomActions>
      }
    >
      <div className="flex flex-col gap-4 p-4 pb-8">
        {saved && <LockNotice>{t('Final levels saved. They can’t be edited.')}</LockNotice>}

        <Card className="flex flex-col gap-2">
          <SectionLabel>{t('Where the scores come from')}</SectionLabel>
          {sources.map(([k, text]) => (
            <div key={k} className="flex flex-wrap items-start gap-2">
              <ProvenanceChip kind={k} className="shrink-0">{t(k === 'teacher' ? 'Teacher' : k === 'student' ? 'Learner' : 'Peer')}</ProvenanceChip>
              <p className="min-w-[min(10rem,100%)] flex-1 pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-2">{text}</p>
            </div>
          ))}
        </Card>

        {/* Scrolls sideways on narrow screens / large text instead of clipping the scores */}
        <div role="region" aria-label={t('Scores by assessor and ability')} tabIndex={0} className="overflow-x-auto rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-bright">
          <AssessorTable instrument="B" scores={scores} max={MAX} className="w-max min-w-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          {unbanded && <OpenQuestion code="OQ-SEC-4" text={OPEN_QUESTIONS['OQ-SEC-4']} />}
          {reviews > 0 && <OpenQuestion code="OQ-PEER" text={OQ_PEER} />}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <h2 className="text-[1.125rem] font-semibold text-ink">{t('Final level')}</h2>
          <OpenQuestion code="OQ-FINAL" text={OPEN_QUESTIONS['OQ-FINAL']} />
        </div>
        <p className="-mt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('The app does not calculate the final level. Look at the three assessors and pick one for each ability.')}</p>

        {error > 0 && missing.length > 0 && !saved && <p role="alert" className="rounded-xl bg-danger-50 px-3 py-2.5 text-[0.8125rem] text-danger">{t('Pick a final level for every ability.')}</p>}

        <div key={error} className={cx('stagger flex flex-col gap-3', error > 0 && missing.length > 0 && 'animate-shake')}>
          {ABILITIES.map((ab) => {
            const chosen = saved ? l.overview.final?.[ab.id] : final[ab.id]
            return (
              <Card key={ab.id} className={cx(error > 0 && !chosen && !saved && 'border-danger')}>
                <SectionLabel>{t(ab.label)}</SectionLabel>
                <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2 text-[0.75rem] text-ink-muted">
                  {bands(ab.id).map(([k, lv]) => (
                    <span key={k} className="inline-flex items-center gap-1">
                      {t(k === 'teacher' ? 'Teacher' : k === 'learner' ? 'Learner' : 'Peer')}:
                      {lv ? <LevelBadge level={lv} className="!leading-5" /> : <span>—</span>}
                    </span>
                  ))}
                </div>
                {saved ? (
                  <div className="flex flex-wrap items-center gap-2 pt-3"><span className="text-[0.8125rem] text-ink-2">{t('Final')}:</span><LevelBadge level={chosen} /><ProvenanceChip kind="teacher" /></div>
                ) : (
                  <div role="radiogroup" aria-label={t('Final level for {ability}', { ability: t(ab.label) })} className="grid grid-cols-[repeat(auto-fit,minmax(min(5.5rem,100%),1fr))] gap-2 pt-3">
                    {LEVELS.map((lv) => {
                      const on = chosen === lv.id
                      return (
                        <button key={lv.id} type="button" role="radio" aria-checked={on} onClick={() => setFinal((f) => ({ ...f, [ab.id]: lv.id }))}
                          className={cx('tap-soft flex min-h-12 items-center justify-center rounded-xl border px-1 transition-colors', on ? 'border-brand-600 bg-[#fffaf5] ring-2 ring-brand-bright/40' : 'border-line bg-white hover:bg-cream')}>
                          <LevelBadge level={lv.id} />
                        </button>
                      )
                    })}
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {saved && postSubmitted(l.post) && <EventNotice tone="info" title={t('{name} submitted the post-project reflection', { name })}>{t('Read it and add your final comments.')}</EventNotice>}
        {!saved && <OutlineButton onClick={() => navigate(`${base}/post/${learnerId}`)}>{t('Post-project · final comments')}</OutlineButton>}
      </div>

      <LeaveSheet open={leave} title={t('Leave the Overview?')} body={t('The final levels you picked will be lost.')} onStay={() => setLeave(false)} onLeave={() => { setLeave(false); back() }} />
    </Screen>
  )
}
