import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cx } from '../../components/ui.jsx'
import arrowLeft from '../../assets/students/arrow-left.svg'
import chevronUp from '../../assets/students/chevron-up.svg'
import targetGroup from '../../assets/students/target-group.svg'
import targetVector from '../../assets/students/target-vector.svg'
import targetGroup1 from '../../assets/students/target-group1.svg'
import targetGroup2 from '../../assets/students/target-group2.svg'
import targetVector1 from '../../assets/students/target-vector1.svg'
import { useT } from '../../i18n/index.js'

/** White 64px nav with a centred bold title (View Student's HPC screens). */
/** `title` should already be translated; defaults to t('View Student’s HPC'). */
export function HpcNav({ title, onBack }) {
  const navigate = useNavigate()
  const t = useT()
  return (
    // Grows with the text (large OS font / Hindi): the title wraps instead of truncating.
    <div className="relative z-10 flex min-h-16 shrink-0 items-center gap-1 border-b border-[#e6ddd6] bg-white px-2 py-2">
      <button
        aria-label={t('Back')}
        onClick={onBack ?? (() => navigate(-1))}
        className="tap grid size-11 shrink-0 place-items-center rounded-lg hover:bg-black/5"
      >
        <img alt="" width="24" height="24" src={arrowLeft} />
      </button>
      <h1 className="min-w-0 flex-1 break-words text-center text-[1.125rem] font-bold leading-6 text-[#211a17]">{title ?? t('View Student’s HPC')}</h1>
      <span aria-hidden="true" className="w-11 shrink-0" />
    </div>
  )
}

/** Smooth height collapse using the grid-rows trick. */
export function Collapse({ open, children, className }) {
  return (
    <div
      className={cx(
        'grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className={cx('min-h-0 overflow-hidden', className)}>{children}</div>
    </div>
  )
}

/** chevron-up asset; rotates 180° when collapsed. */
export function Chevron({ open }) {
  return (
    <img
      alt=""
      width="24"
      height="24"
      src={chevronUp}
      className={cx('shrink-0 transition-transform duration-300', open ? 'rotate-0' : 'rotate-180')}
    />
  )
}

export function Badge({ children, tone = 'green', className }) {
  const tones = {
    green: 'bg-[#dcfce7] text-[#166534] text-[0.8125rem] leading-5 font-medium',
    grey: 'bg-[#e2e8f0] text-[#334155] text-[0.75rem] leading-4 font-normal',
    muted: 'bg-[#f5f5f5] text-[#334155] text-[0.75rem] leading-4 font-normal',
  }
  return <span className={cx('inline-flex min-h-5 shrink-0 items-center rounded px-2 py-0.5', tones[tone], className)}>{children}</span>
}

export function SectionTitle({ children, badge, small }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
      <h3 className={cx('text-[#1a1c1e]', small ? 'text-[0.875rem] font-semibold leading-5' : 'text-[1.125rem] font-bold leading-7')}>{children}</h3>
      {badge && <Badge>{badge}</Badge>}
    </div>
  )
}

export function Card({ children, className, as: As = 'div', ...props }) {
  return (
    <As className={cx('rounded-[20px] border border-[#e2e8f0] bg-white', className)} {...props}>
      {children}
    </As>
  )
}

/** Counts from 0 up to `value` on mount. */
export function CountUp({ value, suffix = '', duration = 700 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return <>{n}{suffix}</>
}

/** 3D target illustration, composed from its Figma vector groups (38×38). */
export function TargetIcon() {
  const layers = [
    [targetGroup, '4.13% 0 4.13% 16.09%'],
    [targetVector, '48.1% 23.35% 12.32% 22.57%'],
    [targetGroup1, '32.17% 64.15% 50% 0'],
    [targetGroup2, '50% 64.15% 32.18% 0'],
    [targetVector1, '47.27% 46.46% 47.27% 0'],
  ]
  return (
    <div className="relative size-[38px] shrink-0 overflow-hidden">
      {layers.map(([src, inset]) => (
        <div key={inset} className="absolute" style={{ inset }}>
          <img alt="" src={src} className="absolute inset-0 block size-full max-w-none" />
        </div>
      ))}
    </div>
  )
}

export const Dot = ({ className }) => <span className={cx('inline-block size-1 shrink-0 rounded-full bg-[#94a3b8]', className)} />

/** "Class 11 B - Humanities" (own copy — MFEs don't import each other). */
export const classTitle = (c, t = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k])) => {
  const base = t('Class {grade} {section}', { grade: c.grade, section: c.section })
  return c.stream ? `${base} - ${t(c.stream)}` : base
}

/** Translate "A4 · Plans after school" keeping the code. */
export function translateShort(t, s) {
  const [code, ...rest] = String(s).split(' · ')
  return rest.length ? `${code} · ${t(rest.join(' · '))}` : t(s)
}
