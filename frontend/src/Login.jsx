import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setAuth } from './api'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        await api.register({
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        })
        // auto-login after successful registration
      }
      const res = await api.login({ email: form.email, password: form.password })
      const { token, user } = res.data
      setAuth(token, user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={submit}>
        <div style={styles.brand}>
          <span style={styles.dot} /> EventFlow
        </div>
        <h2 style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>

        {mode === 'register' && (
          <input style={styles.input} placeholder="Username" value={form.username} onChange={set('username')} required />
        )}
        <input style={styles.input} type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
        <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={set('password')} required />

        {mode === 'register' && (
          <select style={styles.input} value={form.role} onChange={set('role')}>
            <option value="user">User (book tickets)</option>
            <option value="organizer">Organizer (manage events)</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Register & Log In'}
        </button>

        <p style={styles.switch}>
          {mode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
          <span style={styles.link} onClick={() => { setError(''); setMode(mode === 'login' ? 'register' : 'login') }}>
            {mode === 'login' ? 'Register' : 'Log in'}
          </span>
        </p>
      </form>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d14', color: '#fff', fontFamily: 'system-ui, sans-serif' },
  card: { width: 360, background: '#16161f', padding: 32, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 10px 40px rgba(0,0,0,.5)' },
  brand: { display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 20 },
  dot: { width: 12, height: 12, borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' },
  title: { margin: '4px 0 8px', fontSize: 22 },
  input: { padding: '12px 14px', borderRadius: 10, border: '1px solid #2a2a38', background: '#0d0d14', color: '#fff', fontSize: 14, outline: 'none' },
  button: { padding: '12px 14px', borderRadius: 10, border: 'none', background: '#8b5cf6', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 15 },
  error: { background: '#3b1a1a', color: '#ff9b9b', padding: '10px 12px', borderRadius: 8, fontSize: 13 },
  switch: { textAlign: 'center', fontSize: 13, color: '#9a9aad', margin: 0 },
  link: { color: '#8b5cf6', cursor: 'pointer', fontWeight: 600 },
}
