/**
 * Lets the multi-stage flows tell the home screens what to show, without the home screens
 * knowing about stage logic.
 *
 *   registerStudentStep('B', (activity, learnerId) => ({ next, due, path, focus }))
 *   registerTeacherActions('B', (activity) => [{ title, sub, path, count }])
 *
 * Returned strings are ENGLISH keys; callers translate them with t(). `focus` (optional)
 * is { title, sub, vars } for a student Today's Focus card, only when a named event just unlocked
 * something for the learner (pack §2 triggers).
 */
const studentSteps = {}
const teacherActions = {}

export function registerStudentStep(type, fn) { studentSteps[type] = fn }
export function registerTeacherActions(type, fn) { teacherActions[type] = fn }

export function getStudentStep(activity, learnerId) {
  return activity && studentSteps[activity.type] ? studentSteps[activity.type](activity, learnerId) : null
}
export function getTeacherActions(activity) {
  return activity && teacherActions[activity.type] ? teacherActions[activity.type](activity) : []
}
