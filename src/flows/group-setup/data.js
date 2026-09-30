import { GROUP_PROJECT } from '../../hpc/config.js'

export const MATERIALS = [
  { id: 'handbook', title: 'Teacher handbook', meta: 'PDF · how to run all three stages' },
  { id: 'worksheet', title: 'Student Worksheet', meta: 'PDF · print or share in class' },
]

export const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

export const MIN_GROUP = GROUP_PROJECT.minGroupSize
export const MAX_GROUP = 10
