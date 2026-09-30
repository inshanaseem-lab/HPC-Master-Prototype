// Fails if a micro-frontend imports another micro-frontend's files (see PLAN.md → Architecture).
// Folders listed together in SAME_MFE are one micro-frontend split across folders.
import fs from 'node:fs'
import path from 'node:path'

const FLOWS = 'src/flows'
const SAME_MFE = [['group-setup', 'group-live']]
const mfeOf = (folder) => (SAME_MFE.find((g) => g.includes(folder)) ?? [folder]).join('+')

const bad = []
for (const folder of fs.readdirSync(FLOWS)) {
  const dir = path.join(FLOWS, folder)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const file of fs.readdirSync(dir, { recursive: true })) {
    if (!/\.(jsx?|mjs)$/.test(file)) continue
    const src = fs.readFileSync(path.join(dir, file), 'utf8')
    for (const m of src.matchAll(/from\s+'\.\.\/([\w-]+)\//g)) {
      const target = m[1]
      if (fs.existsSync(path.join(FLOWS, target)) && mfeOf(target) !== mfeOf(folder)) bad.push(`${folder}/${file} → ${target}`)
    }
  }
}
if (bad.length) {
  console.error(`Cross-micro-frontend imports (use src/platform/services.js or move shared code to the platform):\n  ${bad.join('\n  ')}`)
  process.exit(1)
}
console.log('MFE boundaries OK')
