/**
 * Service registry — the only way one micro-frontend exposes data or logic to another.
 * The owner registers in its routes.jsx (loaded eagerly by the shell); consumers call useService /
 * getService by name. No MFE imports another MFE's files.
 *
 *   // know-myself/routes.jsx
 *   provide('know-myself.live', (classId) => ({ live: getLive(classId), survey: … }))
 *   // students/data.js
 *   const km = getService('know-myself.live')?.(classId)
 *
 * Service names in use (keep this list current):
 *   know-myself.live         (classId) → { live, survey } | null     live Know Myself survey for a class
 *   classroom.live           (classId) → record | null               live Classroom Interaction for a class
 *   students.liveActivities  (classId, ms) → item[]                   every live activity for a class (cards)
 */
const services = {}

export function provide(name, fn) {
  services[name] = fn
}

/** Returns the registered function, or a no-op that returns `fallback` if the owner isn't loaded. */
export function getService(name, fallback = null) {
  return services[name] ?? (() => fallback)
}
