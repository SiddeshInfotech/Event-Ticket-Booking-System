import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, getUser, isLoggedIn, API_BASE } from './api'

const CATEGORY_IMG = {
  music: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070',
  sports: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070',
  arts: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&h=400&fit=crop',
  comedy: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070',
  theater: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
  default: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070',
}

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [booking, setBooking] = useState(null)
  const [bookingLoading, setBookingLoading] = useState(false)

  const user = getUser()

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login')
      return
    }
    let active = true
    api.getEvent(id)
      .then((res) => { if (active) setEvent(res.data.event) })
      .catch((err) => { if (active) setError(err.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id, navigate])

  const bookNow = async () => {
    setBookingLoading(true)
    try {
      const res = await api.bookTicket({
        event_id: Number(id),
        number_of_tickets: qty,
        total_price: qty * (event?.price || 0),
      })
      setBooking(res.data)
    } catch (err) {
      alert(err.message)
    } finally {
      setBookingLoading(false)
    }
  }

  const remove = async () => {
    if (!window.confirm('Delete this event?')) return
    try {
      await api.deleteEvent(id)
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div style={styles.center}>Loading…</div>
  if (error) return <div style={styles.center}>{error} <Link style={styles.link} to="/">← Back</Link></div>
  if (!event) return null

  const cat = (event.category || '').toLowerCase()
  const img = event.banner_image
    ? (event.banner_image.startsWith('http') ? event.banner_image : API_BASE + event.banner_image)
    : (CATEGORY_IMG[cat] || CATEGORY_IMG.default)

  const isOwner = user?.role === 'organizer' && user?.user_id === event.organizer_id

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <Link to="/" style={styles.back}>← Back To Events</Link>

        <div style={styles.hero}>
          <img src={img} alt={event.title} style={styles.heroImg} />
          <div style={styles.heroOverlay}>
            <span style={styles.badge}>{event.category}</span>
            <h1 style={styles.h1}>{event.title}</h1>
          </div>
        </div>

        <div style={styles.grid}>
          <Info label="Date" value={event.date} />
          <Info label="Time" value={event.start_time} />
          <Info label="Availability" value={`${event.available_tickets} seats left`} />
          <Info label="Category" value={event.category} />
          <Info label="Venue" value={event.location} />
          <Info label="Status" value={event.status} />
        </div>

        <div style={styles.about}>
          <h2 style={styles.h2}>About this event</h2>
          <p style={{ color: '#c7c7d1', lineHeight: 1.6 }}>{event.description}</p>
        </div>

        <div style={styles.ticket}>
          <div>
            <h2 style={{ margin: 0, fontSize: 28 }}>₹{event.price}</h2>
            <p style={{ margin: 0, color: '#9a9aad' }}>per ticket</p>
          </div>
          {booking ? (
            <div style={styles.booked}>
              ✅ Booked #{booking.booking_id} — {booking.number_of_tickets} ticket(s), ₹{booking.total_price} ({booking.booking_status})
              <div style={{ marginTop: 6 }}>
                <button style={styles.linkBtn} onClick={() => navigate('/bookings')}>View My Bookings →</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={styles.qtyBox}>
                <button type="button" style={styles.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span style={{ minWidth: 24, textAlign: 'center' }}>{qty}</span>
                <button type="button" style={styles.qtyBtn} onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button style={styles.buy} onClick={bookNow} disabled={bookingLoading}>
                {bookingLoading ? 'Booking…' : `Book — ₹${(qty * event.price).toFixed(2)}`}
              </button>
            </div>
          )}
        </div>

        {isOwner && (
          <div style={styles.ownerRow}>
            <button style={styles.edit} onClick={() => navigate(`/edit/${event.event_id}`)}>Edit Event</button>
            <button style={styles.del} onClick={remove}>Delete Event</button>
          </div>
        )}
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div style={styles.info}>
      <p style={{ margin: 0, color: '#9a9aad', fontSize: 12, textTransform: 'uppercase' }}>{label}</p>
      <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{value}</p>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0d0d14', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px 0' },
  wrap: { maxWidth: 900, margin: '0 auto', padding: '0 20px' },
  center: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d14', color: '#fff', gap: 10 },
  back: { color: '#8b5cf6', textDecoration: 'none', display: 'inline-block', marginBottom: 16 },
  link: { color: '#8b5cf6' },
  hero: { position: 'relative', borderRadius: 16, overflow: 'hidden' },
  heroImg: { width: '100%', height: 320, objectFit: 'cover', display: 'block' },
  heroOverlay: { position: 'absolute', left: 0, bottom: 0, right: 0, padding: 24, background: 'linear-gradient(transparent, rgba(0,0,0,.85))' },
  badge: { background: '#8b5cf6', padding: '4px 12px', borderRadius: 20, fontSize: 12, textTransform: 'capitalize' },
  h1: { margin: '10px 0 0', fontSize: 30 },
  h2: { fontSize: 20 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, margin: '24px 0' },
  info: { background: '#16161f', padding: 16, borderRadius: 12 },
  about: { background: '#16161f', padding: 20, borderRadius: 12, marginBottom: 20 },
  ticket: { background: '#16161f', padding: 20, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  buy: { background: '#8b5cf6', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' },
  qtyBox: { display: 'flex', alignItems: 'center', gap: 10, background: '#0d0d14', borderRadius: 10, padding: '6px 10px' },
  qtyBtn: { background: '#2a2a38', color: '#fff', border: 'none', width: 28, height: 28, borderRadius: 8, fontSize: 18, cursor: 'pointer', lineHeight: 1 },
  booked: { background: '#14261a', color: '#8effb0', padding: '12px 16px', borderRadius: 10, fontSize: 14, textAlign: 'right' },
  linkBtn: { background: 'none', border: 'none', color: '#8b5cf6', cursor: 'pointer', fontWeight: 600, padding: 0 },
  ownerRow: { display: 'flex', gap: 12, marginTop: 20 },
  edit: { flex: 1, background: '#2a2a38', color: '#fff', border: 'none', padding: '12px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' },
  del: { flex: 1, background: '#3b1a1a', color: '#ff9b9b', border: 'none', padding: '12px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' },
}
