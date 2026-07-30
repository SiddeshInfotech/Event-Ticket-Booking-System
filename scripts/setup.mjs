// One-command clean setup: backend venv + deps, DB reset + seed, frontend deps.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const backend = join(root, 'backend')
const frontend = join(root, 'frontend')
const isWin = process.platform === 'win32'
const venvPy = join(backend, 'venv', isWin ? 'Scripts' : 'bin', isWin ? 'python.exe' : 'python')
const npm = isWin ? 'npm.cmd' : 'npm'

function run(cmd, args, cwd, opts = {}) {
  console.log(`\n▶ ${cmd} ${args.join(' ')}`)
  const r = spawnSync(cmd, args, { cwd, stdio: 'inherit', ...opts })
  if (r.error) { console.error(`✗ ${r.error.message}`); process.exit(1) }
  if (r.status !== 0) { console.error(`✗ Failed (exit ${r.status})`); process.exit(r.status ?? 1) }
}

function findPython() {
  for (const c of ['python', 'python3', 'py']) {
    const r = spawnSync(c, ['--version'], { stdio: 'ignore' })
    if (r.status === 0) return c
  }
  console.error('✗ Python not found. Install Python 3.10+ and retry.')
  process.exit(1)
}

console.log('=== EventFlow: clean setup ===')

// 1. Backend virtual environment
if (!existsSync(venvPy)) {
  console.log('Creating Python virtual environment...')
  run(findPython(), ['-m', 'venv', 'venv'], backend)
}

// 2. Backend dependencies
run(venvPy, ['-m', 'pip', 'install', '--upgrade', 'pip', '--quiet'], backend)
run(venvPy, ['-m', 'pip', 'install', '-r', 'requirements.txt', '--quiet'], backend)

// 3. Reset database + seed 2 users and 5 events
run(venvPy, ['seed_events.py'], backend)

// 4. Frontend dependencies
run(npm, ['install'], frontend, { shell: true })

console.log('\n✅ Setup complete!  Start everything with:  npm start')
console.log('   organizer login -> snehalchaudhari552@gmail.com / 123')
console.log('   user login      -> komalchaudhari552@gmail.com / 123')
