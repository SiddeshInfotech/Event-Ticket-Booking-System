import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api, getUser, isLoggedIn } from './api'

const EMPTY = {
  title: '', description: '', category: '', location: '',
  date: '', start_time: '', price: '', available_tickets: '', status: 'active',
  banner_image: '',
}

export default function EventForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const user = getUser()

  useEffect(() => {
    if (!isLoggedIn()) { navigate('/login'); return }
    if (user?.role !== 'organizer') { setError('Only organizers can create or manage events.'); return }
    if (isEdit) {
      api.getEvent(id)
        .then((res) => {
          const e = res.data.event
          setForm({
            title: e.title || '', description: e.description || '', category: e.category || '',
            location: e.location || '', date: e.date || '', start_time: (e.start_time || '').slice(0, 5),
            price: e.price ?? '', available_tickets: e.available_tickets ?? '', status: e.status || 'active',
            banner_image: e.banner_image || '',
          })
        })
        .catch((err) => setError(err.message))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const payload = {
      ...form,
      price: parseFloat(form.price),
      available_tickets: parseInt(form.available_tickets, 10),
    }
    try {
      if (isEdit) await api.updateEvent(id, payload)
      else await api.createEvent(payload)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const remove = async () => {
    if (!window.confirm('Delete this event?')) return
    try {
      await api.deleteEvent(id)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={submit}>
        <h2 style={{ marginTop: 0 }}>{isEdit ? 'Edit Event' : 'Create Event'}</h2>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>Title</label>
        <input style={styles.input} value={form.title} onChange={set('title')} required />

        <label style={styles.label}>Description</label>
        <textarea style={{ ...styles.input, minHeight: 80 }} value={form.description} onChange={set('description')} required />

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Category</label>
            <input style={styles.input} placeholder="music / sports / arts…" value={form.category} onChange={set('category')} required />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Location / Venue</label>
            <input style={styles.input} value={form.location} onChange={set('location')} required />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Date</label>
            <input style={styles.input} type="date" value={form.date} onChange={set('date')} required />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Start Time</label>
            <input style={styles.input} type="time" value={form.start_time} onChange={set('start_time')} required />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Price (₹)</label>
            <input style={styles.input} type="number" min="0" step="0.01" value={form.price} onChange={set('price')} required />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Available Tickets</label>
            <input style={styles.input} type="number" min="0" value={form.available_tickets} onChange={set('available_tickets')} required />
          </div>
        </div>

        <label style={styles.label}>Status</label>
        <select style={styles.input} value={form.status} onChange={set('status')}>
          <option value="active">Active (published)</option>
          <option value="draft">Draft</option>
        </select>

        <label style={styles.label}>Banner Image URL (optional)</label>
        <input style={styles.input} placeholder="https://…  (leave blank to use a category placeholder)" value={form.banner_image} onChange={set('banner_image')} />
        {form.banner_image
          ? <img src={form.banner_image} alt="preview" style={styles.preview} onError={(e) => { e.target.style.display = 'none' }} onLoad={(e) => { e.target.style.display = 'block' }} />
          : null}

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Saving…' : isEdit ? 'Update Event' : 'Create Event'}
          </button>
          {isEdit && <button style={styles.del} type="button" onClick={remove}>Delete</button>}
          <button style={styles.cancel} type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0d0d14', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' },
  card: { maxWidth: 620, margin: '0 auto', background: '#16161f', padding: 28, borderRadius: 16, display: 'flex', flexDirection: 'column' },
  label: { fontSize: 12, color: '#9a9aad', textTransform: 'uppercase', margin: '12px 0 4px' },
  input: { padding: '11px 13px', borderRadius: 10, border: '1px solid #2a2a38', background: '#0d0d14', color: '#fff', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' },
  row: { display: 'flex', gap: 12 },
  col: { flex: 1 },
  button: { background: '#8b5cf6', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', flex: 1 },
  del: { background: '#3b1a1a', color: '#ff9b9b', border: 'none', padding: '12px 20px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' },
  cancel: { background: '#2a2a38', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' },
  error: { background: '#3b1a1a', color: '#ff9b9b', padding: '10px 12px', borderRadius: 8, fontSize: 13, marginBottom: 8 },
  preview: { width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, marginTop: 10, border: '1px solid #2a2a38' },
}
