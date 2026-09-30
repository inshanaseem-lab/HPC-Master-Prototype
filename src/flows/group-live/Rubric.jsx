import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ABILITIES, GROUP_PROJECT, LEVELS } from '../../hpc/config.js'
import { EventNotice, LeaveSheet, LevelBadge, LockNotice, ProvenanceChip } from '../../hpc/components.jsx'
import { emit, saveWithGuard, useDraft } from './lib.js'
import { AppBar, Card, NoActivityRedirect, SectionLabel, areaCls, useBPage, useClassName } from './parts.jsx'

/**
 * Stage 3 rubric (Page 5): the teacher writes a 3 × 3 descriptor grid (ability × level), once per
 * activity, optionally shared with learners in advance. Emits 'B.S3.rubric_saved'.
 * Extra record fields: rubricShared (bool), rubricSavedAt (ISO).
 */
export default function Rubric() {
  const { classId, a, base } = useBPage()
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const { name: cls } = useClassName(classId)
  const init = { grid: structuredClone(a?.rubricS3 ?? GROUP_PROJECT.s3RubricTemplate), share: true }
  const [form, setForm, clearDraft, dirty] = useDraft(`${a?.id}:rubric`, init)
  const [errors, setErrors] = useState(false)
  const [shake, setShake] = useState(0)
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState(false)

  if (!a) return <NoActivityRedirect classId={classId} />
  const saved = !!a.rubricSavedAt
  const back = () => navigate(`${base}?stage=S3`)
  const grid = saved ? a.rubricS3 : form.grid
  const missing = ABILITIES.flatMap((ab) => LEVELS.filter((l) => !grid[ab.id]?.[l.id]?.trim()).map((l) => `${ab.id}.${l.id}`))

  const save = () => {
    if (missing.length) { setErrors(true); setShake((n) => n + 1); return }
    saveWithGuard({
      setLoading, showToast, t,
      run: () => {
        emit(a.id, 'B.S3.rubric_saved', (x) => {
          x.rubricS3 = Object.fromEntries(ABILITIES.map((ab) => [ab.id, Object.fromEntries(LEVELS.map((l) => [l.id, form.grid[ab.id][l.id].trim()]))]))
          x.rubricShared = form.share
          x.rubricSavedAt = new Date().toISOString()
        })
        clearDraft()
        showToast(form.share ? t('Rubric saved and shared with learners') : t('Rubric saved'))
      },
    })
  }

  return (
    <Screen
      bg="plain"
      header={<AppBar title={t('Stage 3 rubric')} subtitle={cls} onBack={() => (!saved && dirty ? setLeave(true) : back())} />}
      footer={!saved && (
        <BottomActions>
          <PrimaryButton className="font-semibold" loading={loading} onClick={save}>{t('Save rubric')}</PrimaryButton>
        </BottomActions>
      )}
    >
      <div className="flex flex-col gap-4 p-4 pb-8">
        <div className="animate-fade-in">
          <h2 className="text-[1.375rem] font-semibold leading-7 text-ink">{t(a.title)}</h2>
          <p className="pt-1 text-[0.875rem] leading-5 text-ink-muted">
            {t('Describe what Beginner, Proficient and Advanced look like for this project. In Stage 3 you pick one level per ability for each learner.')}
          </p>
        </div>

        {saved ? (
          <>
            <LockNotice>{t('The rubric is saved once per project and can’t be edited.')}</LockNotice>
            <EventNotice tone={a.rubricShared ? 'success' : 'info'} title={a.rubricShared ? t('Shared with learners') : t('Not shared with learners')}>
              {a.rubricShared ? t('Learners can read these descriptors before Stage 3.') : t('Learners see only their level after you assess them.')}
            </EventNotice>
          </>
        ) : errors && missing.length > 0 && (
          <p role="alert" className="rounded-xl bg-danger-50 px-3 py-2.5 text-[0.8125rem] leading-[1.1875rem] text-danger">{t('Fill in all 9 descriptors ({n} left).', { n: missing.length })}</p>
        )}

        <div key={shake} className={cx('stagger flex flex-col gap-4', shake > 0 && missing.length > 0 && 'animate-shake')}>
          {ABILITIES.map((ab) => (
            <Card key={ab.id} className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <SectionLabel>{t(ab.label)}</SectionLabel>
                <ProvenanceChip kind="teacher" />
              </div>
              {LEVELS.map((l) => {
                const v = grid[ab.id]?.[l.id] ?? ''
                const bad = errors && !v.trim()
                return (
                  <div key={l.id}>
                    <div className="flex flex-wrap items-center justify-between gap-x-2 pb-1.5">
                      <LevelBadge level={l.id} />
                      <span className="text-[0.75rem] text-ink-muted">{t('{n} marks', { n: l.value })}</span>
                    </div>
                    {saved ? (
                      <p className="rounded-xl bg-surface p-3 text-[0.875rem] leading-5 text-ink-2">{v}</p>
                    ) : (
                      <>
                        <textarea rows={2} value={v} aria-label={`${t(ab.label)} · ${t(l.label)}`} aria-invalid={bad}
                          placeholder={t('What does {level} {ability} look like in this project?', { level: t(l.label), ability: t(ab.label) })}
                          onChange={(e) => setForm((f) => ({ ...f, grid: { ...f.grid, [ab.id]: { ...f.grid[ab.id], [l.id]: e.target.value } } }))}
                          className={cx(areaCls, 'text-[0.9375rem]', bad ? 'border-danger' : 'border-line')} />
                        {bad && <p role="alert" className="pt-1 text-[0.75rem] text-danger">{t('Required')}</p>}
                      </>
                    )}
                  </div>
                )
              })}
            </Card>
          ))}
        </div>

        {!saved && (
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white p-4">
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] font-semibold text-ink">{t('Share with learners in advance')}</span>
              <span className="block pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Learners can read the descriptors before they make their final output.')}</span>
            </span>
            <input type="checkbox" role="switch" className="peer sr-only" checked={form.share} onChange={(e) => setForm((f) => ({ ...f, share: e.target.checked }))} />
            <span aria-hidden className={cx('relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-bright', form.share ? 'bg-brand' : 'bg-[#cfcac4]')}>
              <span className={cx('absolute top-1 size-5 rounded-full bg-white shadow transition-transform duration-200', form.share ? 'translate-x-6' : 'translate-x-1')} />
            </span>
          </label>
        )}
      </div>

      <LeaveSheet open={leave} title={t('Leave the rubric?')} body={t('The descriptors you wrote will be lost.')} onStay={() => setLeave(false)} onLeave={() => { clearDraft(); setLeave(false); back() }} />
    </Screen>
  )
}
