import { useState } from 'react'
import { Screen, Spinner, cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { AppBar, ExitSheet, FooterPair } from './parts.jsx'

/**
 * Single-choice questionnaire (5.3 / 5.8 / 7.3 / 7.6): Previous / Next, "Question n of N",
 * progress bar, close X → exit warning (answers lost).
 *   questions: [{ q, hint?, options: [...] }]  (already translated)
 *   onSubmit(answers) → Promise-free; runner shows a ~600ms spinner first.
 */
export default function QuestionRunner({ title, right, intro, questions, exitTitle, exitBody, onExit, onSubmit }) {
  const t = useT()
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState(() => questions.map(() => null))
  const [exit, setExit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const q = questions[i]
  const last = i === questions.length - 1
  const chosen = answers[i]
  const started = answers.some((x) => x != null)

  const pick = (k) => setAnswers((prev) => prev.map((v, j) => (j === i ? k : v)))
  const next = () => {
    if (chosen == null) {
      setShake(true)
      setTimeout(() => setShake(false), 420)
      return
    }
    if (last) {
      setLoading(true)
      setTimeout(() => onSubmit(answers), 600)
      return
    }
    setDir(1)
    setI(i + 1)
  }
  const prev = () => { if (i > 0) { setDir(-1); setI(i - 1) } }
  const close = () => (started ? setExit(true) : onExit())

  const counter = right ?? t('Question {n} of {total}', { n: i + 1, total: questions.length })

  return (
    <>
    <Screen
      bg="plain"
      statusBar="light"
      header={
        <>
          <AppBar title={title} close onBack={close} right={counter} />
          <div className="h-1 shrink-0 bg-[#f1efec]" role="progressbar" aria-label={counter} aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={i + 1}>
            <div className="h-full rounded-r-full bg-brand transition-[width] duration-300 ease-out" style={{ width: `${((i + 1) / questions.length) * 100}%` }} />
          </div>
        </>
      }
      footer={
        <FooterPair
          left={
            <button
              type="button"
              onClick={prev}
              disabled={i === 0 || loading}
              className="tap min-h-12 flex-1 rounded-full border border-brand-700 bg-brand-50 px-3 text-[0.9375rem] font-medium text-brand-700 transition-opacity hover:bg-[#ffe8d4] disabled:opacity-40 disabled:active:scale-100"
            >
              {t('Previous')}
            </button>
          }
          right={
            <button
              type="button"
              onClick={next}
              disabled={loading}
              className={cx(
                'tap grid min-h-12 flex-1 place-items-center rounded-full border px-3 text-[0.9375rem] font-medium transition-colors',
                chosen == null ? 'border-[#d6d3cf] bg-[#d6d3cf] text-[#8f8c95]' : 'border-brand bg-brand text-white hover:bg-brand-hover',
              )}
            >
              {loading ? <Spinner /> : last ? t('Submit') : t('Next')}
            </button>
          }
        />
      }
    >
      <div key={i} className={cx('flex flex-col gap-5 px-4 pb-8 pt-4', dir > 0 ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
        {intro}
        <div>
          <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{q.q}</h2>
          {q.hint && <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{q.hint}</p>}
        </div>
        <div role="radiogroup" aria-label={q.q} className={cx('stagger flex flex-col gap-3', shake && 'animate-shake')}>
          {q.options.map((o, k) => {
            const on = chosen === k
            return (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => pick(k)}
                className={cx(
                  'tap-soft rounded-[10px] border p-4 text-left text-[0.9375rem] font-bold leading-[1.375rem] transition-colors',
                  on ? 'border-brand-600 bg-[#fffaf5] text-brand-600' : 'border-line bg-white text-ink hover:border-[#ffa554]',
                )}
              >
                {o}
              </button>
            )
          })}
        </div>
        {shake && <p role="alert" className="-mt-2 animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-[#b54a45]">{t('Choose an answer to continue')}</p>}
      </div>
    </Screen>
    <ExitSheet open={exit} title={exitTitle} body={exitBody} onStay={() => setExit(false)} onLeave={() => { setExit(false); onExit() }} />
    </>
  )
}
