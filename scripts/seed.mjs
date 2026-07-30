// Re-run the DB reset + seed (2 users, 5 events) without a full setup.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const backend = join(here, '..', 'backend')
const isWin = process.platform === 'win32'
const venvPy = join(backend, 'venv', isWin ? 'Scripts' : 'bin', isWin ? 'python.exe' : 'python')

const py = existsSync(venvPy) ? venvPy : 'python'
const r = spawnSync(py, ['seed_events.py'], { cwd: backend, stdio: 'inherit' })
process.exit(r.status ?? 0)
