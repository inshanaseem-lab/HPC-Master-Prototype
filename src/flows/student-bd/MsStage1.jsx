import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BottomActions, Modal, OutlineButton, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { GROUP_PROJECT, OPEN_QUESTIONS } from '../../hpc/config.js'
import { EventNotice, LeaveSheet, LockNotice, OpenQuestion, ProvenanceChip, formatLong } from '../../hpc/components.jsx'
import { emit } from '../../hpc/store.js'
import { AppBar, Avatar, Card, Eyebrow, FooterPair, SuccessMark } from './parts.jsx'
import { CenterMessage, NextCard, RowsField, TextArea, TickRunner, useLeaveGuard, useSaver, useShake, withMs } from './MsParts.jsx'
import { nameOf, readDraft, shortOf, unpackFilled, writeDraft, stamp } from './msLogic.js'

const UNPACK_FIELDS = [
  ['questions', GROUP_PROJECT.unpacking[0], 'What questions will help your group understand the project?'],
  ['know', GROUP_PROJECT.unpacking[1], 'Write what you already know about the topic.'],
  ['need', GROUP_PROJECT.unpacking[2], 'Write what you still need to learn or find out.'],
]
const PLAN = Object.fromEntries(GROUP_PROJECT.planning.map((f) => [f.id, f]))
const ROLE_IDEAS = ['Leader', 'Note-taker', 'Photographer', 'Map maker', 'Presenter', 'Researcher']

/* ---------------------------------------------- S1 · Page 1 Unpacking (individual) */

export const Unpack = withMs(function Unpack({ a, p, me, base }) {
  const t = useT()
  const navigate = useNavigate()
  const saved = p.L.unpacking?.submittedAt ? p.L.unpacking : null
  const [form, setForm] = useState(() => saved ?? readDraft(a.id, me, 'unpacking') ?? { questions: '', know: '', need: '' })
  const [initial] = useState(() => JSON.stringify(form))
  const [errors, setErrors] = useState({})
  const [saving, save] = useSaver()
  const [shake, doShake] = useShake()
  const dirty = !saved && JSON.stringify(form) !== initial
  const exit = () => navigate(base, { replace: true })
  const { back, sheetProps } = useLeaveGuard(dirty, exit)
  const readOnly = Boolean(saved)
  const groupAlreadySubmitted = p.s1Submitted && !saved

  const validate = () => {
    const e = Object.fromEntries(UNPACK_FIELDS.filter(([k]) => !form[k]?.trim()).map(([k]) => [k, t('Write something here before you continue.')]))
    setErrors(e)
    if (Object.keys(e).length) doShake()
    return !Object.keys(e).length
  }
  const saveDraft = () => save('draft', () => writeDraft(a.id, me, 'unpacking', form), t('Draft saved'))
  const next = () => {
    if (!validate()) return
    if (groupAlreadySubmitted) {
      save('submit', () => {
        emit(a.id, 'B.S1.unpacking_submitted', (x) => { x.learners[me].unpacking = { ...form, submittedAt: stamp() } }, { by: me, target: me })
        navigate(`${base}/s1-submitted`, { replace: true })
      })
      return
    }
    save('next', () => { writeDraft(a.id, me, 'unpacking', form); navigate(`${base}/plan`, { replace: true }) })
  }

  return (
    <>
      <Screen
        bg="plain"
        statusBar="light"
        header={<AppBar title={t('Stage 1 · Unpacking')} onBack={back} right={t('Page {n} of {total}', { n: 1, total: 2 })} />}
        footer={readOnly ? null : (
          <FooterPair
            left={<OutlineButton className="flex-1" onClick={saveDraft} disabled={Boolean(saving)}>{saving === 'draft' ? <span className="inline-block size-5 animate-spin rounded-full border-2 border-brand-700/30 border-t-brand-700" /> : t('Save draft')}</OutlineButton>}
            right={<PrimaryButton className={cx('flex-1', shake && 'animate-shake')} loading={saving === 'next' || saving === 'submit'} onClick={next}>{groupAlreadySubmitted ? t('Submit') : t('Save and continue')}</PrimaryButton>}
          />
        )}
      >
        <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
          <div className="flex flex-col items-start gap-2">
            <ProvenanceChip kind="student">{t('Only you fill this')}</ProvenanceChip>
            <h2 className="text-[1.375rem] font-semibold leading-[1.75rem] text-ink">{t('Unpack the project')}</h2>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Think on your own first. Your group plans together on the next page.')}</p>
          </div>
          <Card className="gap-1.5 p-4">
            <Eyebrow tone="brand">{t('Project prompt')}</Eyebrow>
            <p className="text-[0.9375rem] leading-[1.375rem] text-ink">{t(a.setup?.prompt ?? a.title)}</p>
          </Card>
          {readOnly && <LockNotice>{t('Submitted with your group’s Stage 1. It can’t be edited now.')}</LockNotice>}
          {groupAlreadySubmitted && <EventNotice tone="info" title={t('Your group has submitted Stage 1')}>{t('Add your own unpacking so your teacher can assess you.')}</EventNotice>}
          <div className="stagger flex flex-col gap-5">
            {UNPACK_FIELDS.map(([k, label, hint]) => (
              <TextArea key={k} id={`unpack-${k}`} label={t(label)} hint={t(hint)} value={form[k]} readOnly={readOnly} error={errors[k]} rows={4}
                onChange={(v) => { setForm({ ...form, [k]: v }); if (errors[k]) setErrors({ ...errors, [k]: undefined }) }} />
            ))}
          </div>
        </div>
      </Screen>
      <LeaveSheet {...sheetProps} title={t('Leave unpacking?')} body={t('Changes you haven’t saved as a draft will be lost.')} />
    </>
  )
})

/* ------------------------------------------ S1 · Page 2 Planning (shared by the group) */

const emptyPlan = (members) => ({
  schedule: Array(PLAN.schedule.rows.min).fill(''),
  resources: Array(PLAN.resources.rows.min).fill(''),
  roles: Object.fromEntries(members.map((m) => [m, ''])),
  barriers: Array(PLAN.barriers.rows.min).fill(''),
})

export const Plan = withMs(function Plan({ a, p, me, base }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const g = p.g
  const submitted = g?.planning?.submittedAt ? g.planning : null
  const source = submitted ?? g?.planningDraft ?? null
  const [form, setForm] = useState(() => ({ ...emptyPlan(g?.members ?? []), ...(source ?? {}) }))
  const [initial] = useState(() => JSON.stringify(form))
  const [errors, setErrors] = useState({})
  const [confirm, setConfirm] = useState(false)
  const [saving, save] = useSaver()
  const [shake, doShake] = useShake()
  const dirty = !submitted && JSON.stringify(form) !== initial
  const exit = () => navigate(base, { replace: true })
  const { back, sheetProps } = useLeaveGuard(dirty, exit)
  if (!g) return <Navigate to={base} replace />
  const readOnly = Boolean(submitted)
  const editedBy = source?.editedBy
  const upd = (k) => (v) => { setForm({ ...form, [k]: v }); if (errors[k]) setErrors({ ...errors, [k]: undefined }) }

  const clean = (f) => ({
    schedule: f.schedule.map((x) => x.trim()).filter(Boolean),
    resources: f.resources.map((x) => x.trim()).filter(Boolean),
    roles: Object.fromEntries(g.members.map((m) => [m, (f.roles?.[m] ?? '').trim()])),
    barriers: f.barriers.map((x) => x.trim()).filter(Boolean),
  })
  const validate = () => {
    const c = clean(form)
    const e = {}
    for (const k of ['schedule', 'resources', 'barriers']) {
      if (c[k].length < PLAN[k].rows.min) e[k] = t('Fill in at least {n}.', { n: PLAN[k].rows.min })
    }
    if (g.members.some((m) => !c.roles[m])) e.roles = t('Give every group member a role.')
    if (!p.unpackReady && !p.unpackDone) e.unpack = true
    setErrors(e)
    if (Object.keys(e).length) doShake()
    return !Object.keys(e).length
  }
  const saveDraft = () => save('draft', () => {
    emit(a.id, 'B.S1.planning_saved', (x) => { x.groups[g.id].planningDraft = { ...form, editedBy: me, editedAt: stamp() } }, { by: me, target: g.id })
  }, t('Draft saved for your group'))
  const submit = () => save('submit', () => {
    const now = stamp()
    const unpack = readDraft(a.id, me, 'unpacking')
    emit(a.id, 'B.S1.submitted', (x) => {
      x.groups[g.id].planning = { ...clean(form), editedBy: me, editedAt: now, submittedAt: now }
      delete x.groups[g.id].planningDraft
      if (unpackFilled(unpack) && !x.learners[me].unpacking?.submittedAt) x.learners[me].unpacking = { ...unpack, submittedAt: now }
    }, { by: me, target: g.id })
    setConfirm(false)
    navigate(`${base}/s1-submitted`, { replace: true })
  })

  return (
    <>
      <Screen
        bg="plain"
        statusBar="light"
        header={<AppBar title={t('Stage 1 · Group plan')} onBack={back} right={t('Page {n} of {total}', { n: 2, total: 2 })} />}
        footer={readOnly ? null : (
          <FooterPair
            left={<OutlineButton className="flex-1" onClick={saveDraft} disabled={Boolean(saving)}>{saving === 'draft' ? <span className="inline-block size-5 animate-spin rounded-full border-2 border-brand-700/30 border-t-brand-700" /> : t('Save draft')}</OutlineButton>}
            right={<PrimaryButton className={cx('flex-1', shake && 'animate-shake')} onClick={() => validate() && setConfirm(true)}>{t('Submit Stage 1')}</PrimaryButton>}
          />
        )}
      >
        <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <ProvenanceChip kind="group" />
              <OpenQuestion code="OQ-SEC-10" text={OPEN_QUESTIONS['OQ-SEC-10']} />
            </div>
            <h2 className="text-[1.375rem] font-semibold leading-[1.75rem] text-ink">{t('Plan with {group}', { group: t(g.name) })}</h2>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
              {t('Any member of your group can edit this plan. One submission counts for everyone.')}
            </p>
            {editedBy && (
              <p className="text-[0.8125rem] font-medium leading-[1.1875rem] text-ink-2">
                {t('Last edited by {name} · {date}', { name: editedBy === me ? t('you') : nameOf(editedBy), date: d(shortOf(source.editedAt)) })}
              </p>
            )}
          </div>
          {readOnly && <LockNotice>{t('Submitted on {date}. Your teacher is assessing Stage 1, so the plan can’t be edited.', { date: d(shortOf(submitted.submittedAt)) })}</LockNotice>}
          {errors.unpack && (
            <EventNotice tone="danger" title={t('Finish your unpacking first')}>
              <button type="button" onClick={() => navigate(`${base}/unpack`)} className="tap min-h-11 font-semibold text-danger underline">{t('Go to Page 1 · Unpacking')}</button>
            </EventNotice>
          )}

          <Card className="p-4">
            <RowsField label={t(PLAN.schedule.label)} min={PLAN.schedule.rows.min} max={PLAN.schedule.rows.max} numbered readOnly={readOnly}
              placeholder={t('What will the group do?')} value={form.schedule} onChange={upd('schedule')} error={errors.schedule} />
          </Card>
          <Card className="p-4">
            <RowsField label={t(PLAN.resources.label)} min={PLAN.resources.rows.min} max={PLAN.resources.rows.max} readOnly={readOnly}
              placeholder={t('e.g. chart paper, phone camera')} value={form.resources} onChange={upd('resources')} error={errors.resources} />
          </Card>
          <Card className="p-4">
            <fieldset className="flex min-w-0 flex-col gap-3">
              <legend className="pb-1.5 text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(PLAN.roles.label)}</legend>
              <p className="-mt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('One role for each member. Share work fairly among everyone.')}</p>
              {g.members.map((m) => {
                const v = form.roles?.[m] ?? ''
                return (
                  <div key={m} className="flex flex-col gap-2 rounded-xl border border-[#f1efec] p-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={nameOf(m)} className="size-9 text-[0.8125rem]" />
                      <span className="text-[0.875rem] font-semibold text-ink">{m === me ? t('{name} (You)', { name: nameOf(m) }) : nameOf(m)}</span>
                    </div>
                    <input value={v} readOnly={readOnly} placeholder={readOnly ? '' : t('Role')} aria-label={t('Role for {name}', { name: nameOf(m) })}
                      onChange={(e) => upd('roles')({ ...form.roles, [m]: e.target.value })}
                      className={cx('h-12 rounded-xl border bg-white px-3.5 text-[0.9375rem] text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-bright/30', errors.roles && !v.trim() ? 'border-danger' : 'border-line', readOnly && 'bg-surface')} />
                    {!readOnly && (
                      <div className="flex flex-wrap gap-1.5">
                        {ROLE_IDEAS.map((r) => (
                          <button key={r} type="button" onClick={() => upd('roles')({ ...form.roles, [m]: t(r) })}
                            aria-pressed={v === t(r)}
                            className={cx('tap min-h-11 rounded-full border px-3 py-1.5 text-[0.75rem] font-medium', v === t(r) ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-2 hover:bg-cream')}>
                            {t(r)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
              {errors.roles && <p className="animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-danger">{errors.roles}</p>}
            </fieldset>
          </Card>
          <Card className="p-4">
            <RowsField label={t(PLAN.barriers.label)} min={PLAN.barriers.rows.min} max={PLAN.barriers.rows.max} readOnly={readOnly}
              placeholder={t('What could slow your group down?')} value={form.barriers} onChange={upd('barriers')} error={errors.barriers} />
          </Card>
        </div>
      </Screen>
      <LeaveSheet {...sheetProps} title={t('Leave the group plan?')} body={t('Changes you haven’t saved as a draft will be lost.')} />
      <Modal open={confirm} onClose={() => setConfirm(false)} className="max-w-[21rem] p-5">
        <h2 className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Submit Stage 1 for {group}?', { group: t(g.name) })}</h2>
        <p className="pt-2 text-[0.875rem] leading-5 text-ink-muted">{t('Your group plan and your unpacking go to your teacher. They can’t be edited after this.')}</p>
        <div className="flex flex-col gap-2.5 pt-4">
          <PrimaryButton loading={saving === 'submit'} onClick={submit}>{t('Submit')}</PrimaryButton>
          <OutlineButton onClick={() => setConfirm(false)}>{t('Not yet')}</OutlineButton>
        </div>
      </Modal>
    </>
  )
})

/* -------------------------------------------- S1 submitted → Waiting for your teacher */

export const S1Submitted = withMs(function S1Submitted({ a, p, base }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  if (!p.s1Submitted) return <Navigate to={base} replace />
  return (
    <Screen bg="plain" statusBar="light" bodyClassName="flex flex-col"
      footer={<BottomActions><PrimaryButton onClick={() => navigate(base, { replace: true })}>{t('Back to project')}</PrimaryButton></BottomActions>}>
      <CenterMessage mark={<SuccessMark />} title={t('Stage 1 submitted')}
        body={t('Your group’s plan was sent to {teacher} on {date}.', { teacher: a.teacher ?? 'Anjali Sharma', date: d(shortOf(p.g.planning.submittedAt)) })}>
        <div className="mt-2 flex animate-fade-up flex-col gap-1.5 self-stretch rounded-[18px] border border-dashed border-[#cdcac5] bg-[#f1efec] p-4 text-left">
          <Eyebrow>{t('Next step')}</Eyebrow>
          <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t('Waiting for your teacher')}</p>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Your teacher assesses Stage 1. Your self-reflection opens after that — we’ll show it on your home screen.')}</p>
        </div>
      </CenterMessage>
    </Screen>
  )
})

/* ----------------------------------------------------- S1 · Self-reflection (5 per ability) */

export const S1Reflect = withMs(function S1Reflect({ a, p, me, base }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  // Freeze the access check at mount: submitting this form flips p.s1SelfOpen to false on the
  // same tick (the shared store's sync re-render can outrace the navigate to the next screen),
  // so re-deriving the guard from a live `p` every render would kick this screen out of itself.
  const [allowed] = useState(() => p.s1SelfOpen)
  if (!allowed) return <Navigate to={base} replace />
  return (
    <TickRunner
      title={t('Stage 1 · Self-reflection')}
      statements={GROUP_PROJECT.s1Self}
      notice={p.w1.state === 'late' ? <EventNotice tone="warning" title={t('Late window')}>{t('Submit by {date}.', { date: d(formatLong(p.w1.lateUntil)) })}</EventNotice> : null}
      intro={<p className="text-[0.9375rem] leading-[1.375rem] text-ink-2">{t('Think about how you planned the project with your group.')}</p>}
      exitTitle={t('Leave self-reflection?')}
      exitBody={t('Your ticks won’t be saved. You’ll need to start this self-reflection again.')}
      onExit={() => navigate(base, { replace: true })}
      onSubmit={(ticks) => {
        // navigate first: emit() re-renders this guarded screen synchronously, and its
        // "already done" redirect would otherwise race the intended next-screen navigation
        navigate(`${base}/s1-reflected`, { replace: true })
        emit(a.id, 'B.S1.self_done', (x) => { x.learners[me].s1Self = { ticks, savedAt: stamp(), late: p.w1.state === 'late' } }, { by: me, target: me })
      }}
    />
  )
})

export const S1Reflected = withMs(function S1Reflected({ p, base }) {
  const t = useT()
  const navigate = useNavigate()
  if (!p.s1SelfDone) return <Navigate to={base} replace />
  return (
    <Screen bg="plain" statusBar="light" bodyClassName="flex flex-col"
      footer={<BottomActions><PrimaryButton onClick={() => navigate(base, { replace: true })}>{t('Back to project')}</PrimaryButton></BottomActions>}>
      <CenterMessage mark={<SuccessMark />} title={t('Self-reflection submitted')} body={t('Stage 1 is complete for you.')}>
        <NextCard title={t('Stage 2 · Draft')} body={t('Keep working with your group. Your teacher records and assesses your draft.')} />
      </CenterMessage>
    </Screen>
  )
})
