import { useCallback } from 'react'
import { useAppStore } from '../store/AppStore.jsx'

/**
 * Tiny i18n layer. Strings are keyed by their English text:
 *   const t = useT()
 *   t('Start an Activity')                 → 'गतिविधि शुरू करें' in Hindi mode
 *   t('{n} students have responded', { n }) → placeholders are filled in both languages
 * Hindi dictionaries live in src/i18n/hi/<flow>.js (default export: { english: hindi }).
 * Missing keys fall back to English; in dev they are collected on window.__missingHi.
 */
const modules = import.meta.glob('./hi/*.js', { eager: true })
// Sorted by path so zz-overrides.js (canonical wording for shared terms) is applied last
export const HI = Object.assign(
  {},
  ...Object.keys(modules).sort().map((k) => modules[k].default ?? {}),
)

function fill(s, vars) {
  return vars ? s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`)) : s
}

export function translate(lang, en, vars) {
  if (en == null) return en
  if (lang !== 'hi') return fill(en, vars)
  const hit = HI[en]
  if (hit == null && import.meta.env.DEV && typeof window !== 'undefined') {
    ;(window.__missingHi ??= new Set()).add(en)
  }
  return fill(hit ?? en, vars)
}

export function useT() {
  const { language } = useAppStore()
  return useCallback((en, vars) => translate(language, en, vars), [language])
}

/** Hindi month names for dates like "15 Aug 2026" → "15 अग॰ 2026". */
const MONTHS = { Jan: 'जन॰', Feb: 'फ़र॰', Mar: 'मार्च', Apr: 'अप्रैल', May: 'मई', Jun: 'जून', Jul: 'जुल॰', Aug: 'अग॰', Sep: 'सित॰', Sept: 'सित॰', Oct: 'अक्टू॰', Nov: 'नव॰', Dec: 'दिस॰' }
export function useDate() {
  const { language } = useAppStore()
  return useCallback(
    (s) => (language === 'hi' && typeof s === 'string' ? s.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)\b/g, (m) => MONTHS[m]) : s),
    [language],
  )
}
