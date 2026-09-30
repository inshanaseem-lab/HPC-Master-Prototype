import { getTeacherActions } from '../../hpc/registry.js'
import { groupOf } from '../../hpc/store.js'
import { getService } from '../../platform/services.js'

// Data owned by other micro-frontends, read through the service registry (no cross-MFE imports)
const getLive = (classId) => getService('know-myself.getLive')(classId)
const getSurvey = (id) => getService('know-myself.getSurvey')(id)
const getClassroomLive = (classId) => getService('classroom.getLive')(classId)

/**
 * Teacher action items for Today's Focus (max 2 on home) and the All action items screen (kit T01-02).
 * Items: { key, title: [english, vars], sub: [english, vars], path }. Callers translate with t().
 *
 * 1. Every live multi-stage activity (Part B / Part C) → getTeacherActions(activity) from src/hpc/registry.js.
 *    When a flow hasn't registered actions yet, a fallback item is derived from the shared record.
 * 2. Flow-local activities: live Know Myself survey (nudge), live Classroom Interaction (evaluate).
 */
export function buildActionItems(ms, classes) {
  const ids = new Set(classes.map((c) => c.id))
  const byId = Object.fromEntries(classes.map((c) => [c.id, c]))
  const label = (id) => { const c = byId[id]; return c ? `${c.grade} ${c.section}` : id }
  const items = []

  const multi = Object.values(ms?.activities ?? {}).filter((a) => a.status === 'live' && ids.has(a.classId))
  // Kit order: Group Project first, then Problem Based Enquiry
  multi.sort((x, y) => x.type.localeCompare(y.type))
  for (const a of multi) {
    const registered = getTeacherActions(a)
    if (registered.length) {
      registered.forEach((r, i) => items.push({
        key: `${a.id}-${i}`,
        title: [r.title, { ...(r.vars ?? {}), ...(r.titleVars ?? {}), class: label(a.classId), title: r.vars?.title ?? a.title }],
        sub: r.sub ? [r.sub, { ...(r.vars ?? {}), ...(r.subVars ?? {}), n: r.count ?? r.vars?.n }] : null,
        path: r.path,
      }))
      continue
    }
    if (a.type === 'B') {
      const groups = Object.values(a.groups ?? {})
      const stage = a.currentStage
      const missing = groups.filter((g) => !(stage === 'S1' ? g.planning?.submittedAt : stage === 'S2' ? g.draft?.recordedAt : g.final?.recordedAt))
      const toAssess = Object.entries(a.learners ?? {}).filter(([id]) => {
        const g = groupOf(a, id)
        return g?.planning?.submittedAt && !a.learners[id].s1Teacher
      }).length
      if (missing.length) {
        items.push({
          key: `${a.id}-sub`,
          title: ['Complete Submissions for Group Project for {class}', { class: label(a.classId) }],
          sub: ['{n} of {total} groups still need their submission recorded.', { n: missing.length, total: groups.length }],
          path: `/group-project/${a.classId}/progress`,
        })
      }
      if (toAssess) {
        items.push({
          key: `${a.id}-eval`,
          title: ['Evaluate Group Project for {class}', { class: label(a.classId) }],
          sub: ['{n} learners are ready to be evaluated.', { n: toAssess }],
          path: `/group-project/${a.classId}/progress`,
        })
      }
    } else if (a.type === 'C') {
      const ready = Object.values(a.learners ?? {}).filter((l) => l.plan?.submittedAt && !l.s1Teacher).length
      items.push({
        key: `${a.id}-eval`,
        title: ['Evaluate Problem Based Enquiry for {class}', { class: label(a.classId) }],
        sub: ready ? ['{n} student submissions are ready to be evaluated.', { n: ready }] : ['Evaluate the student submissions on the activity'],
        path: `/pbi/${a.classId}/progress`,
      })
    }
  }

  for (const c of classes) {
    const ci = getClassroomLive(c.id)
    if (ci) {
      items.push({
        key: `ci-${c.id}`,
        title: ['Evaluate Classroom Interaction for {class}', { class: label(c.id) }],
        sub: ['Mark the students you observed in class and evaluate them.'],
        path: `/classroom/${c.id}/progress`,
      })
    }
    const km = getLive(c.id)
    if (km) {
      const s = getSurvey(km.surveyId)
      items.push({
        key: `km-${c.id}`,
        title: ['Nudge learners on {survey} for {class}', { survey: `${s.id} · ${s.title}`, class: label(c.id) }],
        sub: ['Remind learners who haven’t submitted yet.'],
        path: `/know-myself/${c.id}/progress`,
      })
    }
  }
  return items
}

/** Translate an item's [key, vars] pair; nested `survey`/`title` vars are translated too. */
export function tr(t, pair) {
  if (!pair) return ''
  const [key, vars] = pair
  if (!vars) return t(key)
  const v = { ...vars }
  if (typeof v.title === 'string') v.title = t(v.title)
  if (typeof v.survey === 'string') {
    const [code, ...rest] = v.survey.split(' · ')
    v.survey = rest.length ? `${code} · ${t(rest.join(' · '))}` : t(v.survey)
  }
  return t(key, v)
}
