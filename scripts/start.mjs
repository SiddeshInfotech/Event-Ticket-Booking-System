// One-command dev runner: starts Flask backend (:5000) and Vite frontend (:5173) together.
import { spawn, spawnSync } from 'node:child_process'
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

if (!existsSync(venvPy)) {
  console.error('✗ Backend not set up yet. Run:  npm run setup')
  process.exit(1)
}

const children = []

function launch(name, cmd, args, cwd, color, opts = {}) {
  const child = spawn(cmd, args, { cwd, ...opts })
  children.push(child)
  const prefix = `${color}[${name}]\x1b[0m`
  const pipe = (stream, out) => {
    let buf = ''
    stream.on('data', (d) => {
      buf += d.toString()
      let i
      while ((i = buf.indexOf('\n')) >= 0) {
        out.write(`${prefix} ${buf.slice(0, i)}\n`)
        buf = buf.slice(i + 1)
      }
    })
  }
  pipe(child.stdout, process.stdout)
  pipe(child.stderr, process.stderr)
  child.on('exit', (code) => {
    process.stdout.write(`${prefix} exited (${code})\n`)
    shutdown()
  })
}

let down = false
function shutdown() {
  if (down) return
  down = true
  for (const c of children) {
    if (c.pid && !c.killed) {
      if (isWin) spawnSync('taskkill', ['/pid', String(c.pid), '/T', '/F'], { stdio: 'ignore' })
      else c.kill('SIGTERM')
    }
  }
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

console.log('Starting backend (http://localhost:5000) and frontend (http://localhost:5173)...')
console.log('Press Ctrl+C to stop both.\n')
launch('backend', venvPy, ['run.py'], backend, '\x1b[36m')                 // cyan
launch('frontend', npm, ['run', 'dev'], frontend, '\x1b[35m',{shell:true})     //magenta