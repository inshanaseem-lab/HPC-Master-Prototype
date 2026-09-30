import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BottomActions, OutlineButton, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { GROUP_PROJECT } from '../../hpc/config.js'
import { EventNotice, LeaveSheet, LockNotice, ProvenanceChip, formatLong } from '../../hpc/components.jsx'
import { emit } from '../../hpc/store.js'
import { AppBar, Avatar, Badge, Card, ChevronRightIcon, FooterPair, SuccessMark } from './parts.jsx'
import { CenterMessage, NextCard, TextArea, TickRunner, useLeaveGuard, useSaver, useShake, withMs } from './MsParts.jsx'
import { firstNameOf, nameOf, readDraft, writeDraft, stamp } from './msLogic.js'

function LateNotice({ w }) {
  const t = useT()
  const d = useDate()
  if (w.state !== 'late') return null
  return <EventNotice tone="warning" title={t('Late window')}>{t('Submit by {date}.', { date: d(formatLong(w.lateUntil)) })}</EventNotice>
}

/* ------------------------------------------------------ S3 · Self-reflection */

export const S3Reflect = withMs(function S3Reflect({ a, p, me, base }) {
  const t = useT()
  const navigate = useNavigate()
  // Freeze at mount: submitting flips p.s3SelfDone true on the same tick, which would
  // otherwise redirect this very screen away before the intended next-screen navigate lands.
  const [allowed] = useState(() => p.s3Open && !p.s3SelfDone)
  if (!allowed) return <Navigate to={base} replace />
  return (
    <TickRunner
      title={t('Stage 3 · Self-reflection')}
      statements={GROUP_PROJECT.s3Self}
      notice={<LateNotice w={p.w3} />}
      intro={<p className="text-[0.9375rem] leading-[1.375rem] text-ink-2">{t('Think about your part in the final project.')}</p>}
      exitTitle={t('Leave self-reflection?')}
      exitBody={t('Your ticks won’t be saved. You’ll need to start this self-reflection again.')}
      onExit={() => navigate(base, { replace: true })}
      onSubmit={(ticks) => {
        navigate(`${base}/s3-reflected`, { replace: true })
        emit(a.id, 'B.S3.self_done', (x) => { x.learners[me].s3Self = { ticks, savedAt: stamp(), late: p.w3.state === 'late' } }, { by: me, target: me })
      }}
    />
  )
})

export const S3Reflected = withMs(function S3Reflected({ p, base }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  if (!p.s3SelfDone) return <Navigate to={base} replace />
  const until = d(formatLong(p.w3.state === 'late' ? p.w3.lateUntil : p.w3.due))
  return (
    <Screen bg="plain" statusBar="light" bodyClassName="flex flex-col"
      footer={<FooterPair
        left={<OutlineButton className="flex-1" onClick={() => navigate('/s/home', { replace: true })}>{t('I Will Do This Later')}</OutlineButton>}
        right={<PrimaryButton className="flex-1" onClick={() => navigate(`${base}/peers`, { replace: true })}>{t('Continue')}</PrimaryButton>} />}>
      <CenterMessage mark={<SuccessMark />} title={t('Self-reflection submitted')}
        body={t('You can review your group now, or come back any time before {date}.', { date: until })}>
        <NextCard title={t('Peer review')} body={t('Review {n} group members · about 2 min each', { n: p.peers.length })} />
      </CenterMessage>
    </Screen>
  )
})

/* ----------------------------------------------------------- S3 · Peers list */

export const Peers = withMs(function Peers({ p, base }) {
  const t = useT()
  const navigate = useNavigate()
  if (!p.s3SelfDone || !p.s3Open) return <Navigate to={base} replace />
  const next = p.peers.find((m) => !p.given.includes(m))
  const pct = p.peers.length ? (p.given.length / p.peers.length) * 100 : 0
  return (
    <Screen bg="plain" statusBar="light" header={<AppBar title={t('Peer Review')} onBack={() => navigate(base, { replace: true })} />}
      footer={<FooterPair
        left={<OutlineButton className="flex-1" onClick={() => navigate('/s/home')}>{t('I Will Do This Later')}</OutlineButton>}
        right={<PrimaryButton className="flex-1" onClick={() => navigate(next ? `${base}/peers/${next}` : `${base}/post`)}>{t('Continue')}</PrimaryButton>} />}>
      <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
        <div>
          <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Review your group')}</h2>
          <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Each review is saved when you finish it.')}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <p className="text-[0.875rem] font-semibold text-ink" aria-live="polite">{t('{k} of {n} reviewed', { k: p.given.length, n: p.peers.length })}</p>
            <p className="text-[0.8125rem] text-ink-muted">{t('about 2 min each')}</p>
          </div>
          <div aria-hidden className="h-1.5 overflow-hidden rounded-full bg-[#ffd5b0]">
            <div className="h-full origin-left animate-grow-x rounded-full bg-brand-bright transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <LateNotice w={p.w3} />
        <EventNotice tone="info">{t('You only see your own reviews. Your classmates’ teacher feedback and levels stay private.')}</EventNotice>
        <Card>
          <div className="stagger">
            {p.peers.map((m, i) => {
              const done = p.given.includes(m)
              const row = cx('flex w-full flex-wrap items-center gap-3 px-4 py-3.5 text-left', i < p.peers.length - 1 && 'border-b border-[#f1efec]')
              const body = (
                <>
                  <Avatar name={nameOf(m)} />
                  <span className="flex min-w-[min(8rem,100%)] flex-1 flex-col gap-0.5">
                    <span className="text-[0.875rem] font-semibold leading-5 text-ink">{nameOf(m)}</span>
                    <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('{n} questions', { n: 3 })}</span>
                  </span>
                </>
              )
              if (done) return <div key={m} className={row}>{body}<Badge tone="success" className="animate-check-pop">{t('Done')}</Badge></div>
              return (
                <button key={m} type="button" onClick={() => navigate(`${base}/peers/${m}`)} className={cx(row, 'tap-soft hover:bg-[#fffaf5]', i === 0 && 'rounded-t-2xl', i === p.peers.length - 1 && 'rounded-b-2xl')}>
                  {body}
                  {next === m && <Badge tone="warning">{t('Next')}</Badge>}
                  <span className="flex shrink-0 items-center gap-0.5 text-[0.8125rem] font-medium text-brand-700">{t('Start')}<ChevronRightIcon size={16} /></span>
                </button>
              )
            })}
          </div>
        </Card>
      </div>
    </Screen>
  )
})

/* ---------------------------------------------------------- S3 · Peer form */

function guardPeerForm(p, peerId, base) {
  if (!p.s3SelfDone || !p.s3Open) return base
  if (!p.peers.includes(peerId) || p.given.includes(peerId)) return `${base}/peers`
  return null
}

export const PeerForm = withMs(function PeerForm({ a, p, me, base }) {
  const t = useT()
  const navigate = useNavigate()
  const { peerId } = useParams()
  // Frozen per peerId: saving a review flips p.given for THIS peerId on the same tick (the shared
  // store's sync re-render can outrace the navigate to the "saved" screen), so re-deriving the
  // guard from a live `p` every render would kick this screen out right after its own submit.
  // Re-derive only when peerId itself changes (moving on to review the next member).
  const [frozen, setFrozen] = useState(() => ({ peerId, to: guardPeerForm(p, peerId, base) }))
  if (frozen.peerId !== peerId) {
    const to = guardPeerForm(p, peerId, base)
    setFrozen({ peerId, to })
    return null
  }
  if (frozen.to) return <Navigate to={frozen.to} replace />
  const name = firstNameOf(peerId)
  const position = p.given.length + 1
  return (
    <TickRunner
      key={peerId}
      title={t('Reviewing {name}', { name })}
      statements={GROUP_PROJECT.s3Peer}
      promptFor={() => t('Tick every statement that is true for {name}.', { name })}
      notice={<LateNotice w={p.w3} />}
      intro={
        <div className="flex items-center gap-3">
          <Avatar name={nameOf(peerId)} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-[0.875rem] font-semibold leading-5 text-ink">{nameOf(peerId)}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(p.g.name)} · {t('Member {n} of {total}', { n: position, total: p.peers.length })}</p>
          </div>
        </div>
      }
      submitLabel={t('Save review')}
      exitTitle={t('Leave this review?')}
      exitBody={t('Your answers for {name} won’t be saved. Reviews you finished are kept.', { name })}
      onExit={() => navigate(`${base}/peers`, { replace: true })}
      onSubmit={(ticks) => {
        const at = stamp()
        const all = p.peers.every((m) => m === peerId || p.given.includes(m))
        navigate(`${base}/peers/${peerId}/saved`, { replace: true })
        emit(a.id, 'B.S3.peer_saved', (x) => {
          x.learners[me].peerGiven = { ...(x.learners[me].peerGiven ?? {}), [peerId]: { ticks, savedAt: at } }
        }, { by: me, target: me })
        if (all) emit(a.id, 'B.S3.peer_done', null, { by: me, target: me })
      }}
    />
  )
})

export const PeerSaved = withMs(function PeerSaved({ p, base }) {
  const t = useT()
  const navigate = useNavigate()
  const { peerId } = useParams()
  if (!p.given.includes(peerId)) return <Navigate to={`${base}/peers`} replace />
  const next = p.peers.find((m) => !p.given.includes(m))
  return (
    <Screen bg="plain" statusBar="light" bodyClassName="flex flex-col"
      footer={<FooterPair
        left={<OutlineButton className="flex-1" onClick={() => navigate('/s/home', { replace: true })}>{t('I Will Do This Later')}</OutlineButton>}
        right={<PrimaryButton className="flex-1" onClick={() => navigate(next ? `${base}/peers/${next}` : `${base}/post`, { replace: true })}>{t('Continue')}</PrimaryButton>} />}>
      <CenterMessage mark={<SuccessMark />} title={t('Review saved for {name}', { name: firstNameOf(peerId) })}
        body={t('{k} of {n} reviewed', { k: p.given.length, n: p.peers.length })}>
        {next
          ? <NextCard title={t('Review {name}', { name: nameOf(next) })} body={t('{n} questions · about 2 min', { n: 3 })} />
          : <NextCard title={t('Post-project reflection')} body={t('The last step: look back on the whole project.')} />}
      </CenterMessage>
    </Screen>
  )
})

/* ------------------------------------------------ Page 8 · Post-project reflection */

export const Post = withMs(function Post({ a, p, me, base }) {
  const t = useT()
  const navigate = useNavigate()
  const prompts = GROUP_PROJECT.postReflection
  const [form, setForm] = useState(() => readDraft(a.id, me, 'post') ?? Object.fromEntries(prompts.map((q) => [q, ''])))
  const [initial] = useState(() => JSON.stringify(form))
  const [errors, setErrors] = useState({})
  const [saving, save] = useSaver()
  const [shake, doShake] = useShake()
  const exit = () => navigate(base, { replace: true })
  const { back, sheetProps } = useLeaveGuard(JSON.stringify(form) !== initial, exit)
  // Freeze at mount: submitting flips p.postDone true on the same tick, which would otherwise
  // redirect this very screen away before the intended next-screen navigate lands.
  const [allowed] = useState(() => p.peerDone && p.s3Open && !p.postDone)
  if (!allowed) return <Navigate to={base} replace />

  const submit = () => {
    const e = Object.fromEntries(prompts.filter((q) => !form[q]?.trim()).map((q) => [q, t('Write something here before you submit.')]))
    setErrors(e)
    if (Object.keys(e).length) { doShake(); return }
    save('submit', () => {
      navigate(`${base}/all-done`, { replace: true })
      emit(a.id, 'B.post_submitted', (x) => { x.learners[me].post = { answers: form, savedAt: stamp(), late: p.w3.state === 'late' } }, { by: me, target: me })
      writeDraft(a.id, me, 'post', null)
    })
  }

  return (
    <>
      <Screen bg="plain" statusBar="light" header={<AppBar title={t('Post-project reflection')} onBack={back} />}
        footer={<FooterPair
          left={<OutlineButton className="flex-1" disabled={Boolean(saving)} onClick={() => save('draft', () => writeDraft(a.id, me, 'post', form), t('Draft saved'))}>
            {saving === 'draft' ? <span className="inline-block size-5 animate-spin rounded-full border-2 border-brand-700/30 border-t-brand-700" /> : t('Save draft')}
          </OutlineButton>}
          right={<PrimaryButton className={cx('flex-1', shake && 'animate-shake')} loading={saving === 'submit'} onClick={submit}>{t('Submit')}</PrimaryButton>} />}>
        <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
          <div className="flex flex-col items-start gap-2">
            <ProvenanceChip kind="student" />
            <h2 className="text-[1.375rem] font-semibold leading-[1.75rem] text-ink">{t('Look back on the project')}</h2>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Your teacher reads this. Your last answer helps your teacher improve the project for next time.')}</p>
          </div>
          <LateNotice w={p.w3} />
          <div className="stagger flex flex-col gap-5">
            {prompts.map((q, i) => (
              <TextArea key={q} id={`post-${i}`} label={`${i + 1}. ${t(q)}`} value={form[q]} error={errors[q]} rows={3}
                onChange={(v) => { setForm({ ...form, [q]: v }); if (errors[q]) setErrors({ ...errors, [q]: undefined }) }} />
            ))}
          </div>
          <LockNotice>{t('Once you submit, your answers can’t be changed.')}</LockNotice>
        </div>
      </Screen>
      <LeaveSheet {...sheetProps} title={t('Leave the reflection?')} body={t('Changes you haven’t saved as a draft will be lost.')} />
    </>
  )
})

/* ----------------------------------------------------------------- All done */

export const AllDone = withMs(function AllDone({ a, p, base }) {
  const t = useT()
  const navigate = useNavigate()
  if (!p.postDone) return <Navigate to={base} replace />
  return (
    <Screen bg="plain" statusBar="light" bodyClassName="flex flex-col"
      footer={<BottomActions className="flex flex-col gap-3">
        <PrimaryButton onClick={() => navigate(base, { replace: true })}>{t('View My Responses')}</PrimaryButton>
        <OutlineButton onClick={() => navigate('/s/activities?tab=completed', { replace: true })}>{t('Back to My Activities')}</OutlineButton>
      </BottomActions>}>
      <CenterMessage mark={<SuccessMark />} title={t('All steps done')}
        body={t('Your reflections and {n} peer reviews are submitted. {title} moves to Completed.', { n: p.given.length, title: t(a.title) })} />
    </Screen>
  )
})
