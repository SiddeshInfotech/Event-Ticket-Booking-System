import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.css'
import { api, getUser, isLoggedIn, clearAuth, API_BASE } from './api'

const CATEGORY_IMG = {
  music: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070',
  sports: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070',
  arts: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&h=400&fit=crop',
  comedy: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070',
  theater: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
  default: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070',
}

function Homepage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPage, setCurrentPage] = useState('home') // 'home' | 'bookings' | 'profile'

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const user = getUser()
  const userType = user ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'Guest'

  const [profile, setProfile] = useState({
    name: user?.username || 'Guest',
    email: user?.email || '',
    phone: '+1 555-0101',
  })

  // ---- Load events from backend ----
  useEffect(() => {
    if (!isLoggedIn()) {
      setLoading(false)
      setError('Please log in to view events.')
      return
    }
    let active = true
    api.getEvents()
      .then((res) => { if (active) setEvents(res.data.events) })
      .catch((err) => { if (active) setError(err.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const goHome = () => { setCurrentPage('home'); window.scrollTo(0, 0) }
  const goToBookings = () => { setCurrentPage('bookings'); loadBookings() }
  const goToProfile = () => setCurrentPage('profile')

  const handleSave = () => { setIsEditing(false); alert('Profile Updated Successfully!') }

  const logout = () => {
    api.logout().catch(() => {})
    clearAuth()
    navigate('/login')
  }

  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [bookingsError, setBookingsError] = useState('')

  const loadBookings = () => {
    setBookingsLoading(true)
    setBookingsError('')
    api.getMyBookings()
      .then((res) => setBookings(res.data.bookings))
      .catch((err) => setBookingsError(err.message))
      .finally(() => setBookingsLoading(false))
  }

  const cancelBooking = async (bid) => {
    if (!window.confirm('Cancel this booking?')) return
    try {
      await api.cancelBooking(bid)
      setBookings((prev) => prev.filter((b) => b.booking_id !== bid))
    } catch (err) {
      alert(err.message)
    }
  }

  const filteredEvents = events.filter(event => {
    const cat = (event.category || '').toLowerCase()
    const matchesFilter = activeFilter === 'all' || cat === activeFilter
    const matchesSearch = (event.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div>
      <input type="radio" name="filter" id="all" checked={activeFilter === 'all'} onChange={() => setActiveFilter('all')} readOnly />
      <input type="radio" name="filter" id="music" checked={activeFilter === 'music'} onChange={() => setActiveFilter('music')} readOnly />
      <input type="radio" name="filter" id="sports" checked={activeFilter === 'sports'} onChange={() => setActiveFilter('sports')} readOnly />
      <input type="radio" name="filter" id="arts" checked={activeFilter === 'arts'} onChange={() => setActiveFilter('arts')} readOnly />
      <input type="radio" name="filter" id="comedy" checked={activeFilter === 'comedy'} onChange={() => setActiveFilter('comedy')} readOnly />
      <input type="radio" name="filter" id="theater" checked={activeFilter === 'theater'} onChange={() => setActiveFilter('theater')} readOnly />

      {/* HEADER */}
      <header>
        <div className="logo" onClick={goHome}>
          <div className="logo-dot"></div> EventFlow
        </div>

        <div className="right-section">
          {currentPage === 'home' && (
            <div className="search-box">
              <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              <input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
          )}

          {user?.role === 'organizer' && (
            <button className="edit-btn" style={{ marginRight: 8 }} onClick={() => navigate('/create')}>+ Create Event</button>
          )}

          {/* USER BOX */}
          <div className="user-box" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="avatar-small">{(user?.username || 'G').slice(0, 2).toUpperCase()}</div>
            <span>{userType}</span>
            <svg className="arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            {showUserMenu && (
              <div className="dropdown">
                {isLoggedIn()
                  ? <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); logout() }}>Sign Out</a>
                  : <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/login') }}>Log In</a>}
              </div>
            )}
          </div>

          {/* ICONS */}
          <div className="header-icons">
            <a href="#" onClick={(e) => {e.preventDefault(); goHome()}} title="Home"><svg className="icon" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></a>
            <a href="#" onClick={(e) => {e.preventDefault(); goToBookings()}} title="My Bookings"><svg className="icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg></a>
            <a href="#" onClick={(e) => {e.preventDefault(); goToProfile()}} title="Profile"><svg className="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></a>
            <a href="#" onClick={(e) => {e.preventDefault(); logout()}} title="Sign Out"><svg className="icon" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg></a>
            <a href="#" onClick={(e) => {e.preventDefault(); setShowMainMenu(!showMainMenu)}} title="Menu"><svg className="icon" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg></a>

            {showMainMenu && (
              <div className="dropdown menu-dropdown">
                <a href="#" onClick={() => goHome()}>Home</a>
                <a href="#" onClick={() => goToBookings()}>My Bookings</a>
                <a href="#" onClick={() => goToProfile()}>Profile</a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PAGE 1: HOME */}
      {currentPage === 'home' && (
        <div>
          <div className="hero" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070')`}}>
            <div className="hero-content">
              <div className="purple-line"></div>
              <h1>Find your next<br/><span className="purple">unforgettable</span> experience</h1>
              <p>Concerts, sports, tech talks, art galleries — discover and book with confidence.</p>
            </div>

            <div className="categories">
              <label className="cat-label" htmlFor="all">All</label>
              <label className="cat-label" htmlFor="music">Music</label>
              <label className="cat-label" htmlFor="sports">Sports</label>
              <label className="cat-label" htmlFor="arts">Arts</label>
              <label className="cat-label" htmlFor="comedy">Comedy</label>
              <label className="cat-label" htmlFor="theater">Theater</label>
            </div>
          </div>

          <section className="featured">
            <h2>Featured Events</h2>

            {loading && <p style={{ color: '#9a9aad' }}>Loading events…</p>}
            {error && (
              <p style={{ color: '#ff9b9b' }}>
                {error} {!isLoggedIn() && <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login') }} style={{ color: '#8b5cf6' }}>Go to login →</a>}
              </p>
            )}
            {!loading && !error && filteredEvents.length === 0 && (
              <p style={{ color: '#9a9aad' }}>No events found.</p>
            )}

            <div className="event-grid">
              {filteredEvents.map(event => {
                const cat = (event.category || '').toLowerCase()
                const img = event.banner_image
                  ? (event.banner_image.startsWith('http') ? event.banner_image : API_BASE + event.banner_image)
                  : (CATEGORY_IMG[cat] || CATEGORY_IMG.default)
                return (
                  <div key={event.event_id} className="event-card" data-cat={cat}
                       style={{ cursor: 'pointer' }} onClick={() => navigate(`/events/${event.event_id}`)}>
                    <img src={img} alt={event.title}/>
                    <div className="event-info">
                      <h3>{event.title}</h3>
                      <div className="event-detail">📅 {event.date} · {event.start_time}</div>
                      <div className="event-detail">📍 {event.location}</div>
                      <div className="price">₹ {event.price}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      )}

      {/* PAGE 2: BOOKINGS (live from /my-bookings — backend returns mock data) */}
      {currentPage === 'bookings' && (
        <section className="page-section">
          <h2>My Bookings</h2>
          {bookingsLoading && <p style={{ color: '#9a9aad' }}>Loading bookings…</p>}
          {bookingsError && <p style={{ color: '#ff9b9b' }}>{bookingsError}</p>}
          {!bookingsLoading && !bookingsError && bookings.length === 0 && (
            <p style={{ color: '#9a9aad' }}>No bookings yet.</p>
          )}
          {bookings.map(booking => (
            <div key={booking.booking_id} className="booking-card-new">
              <div className="booking-left">
                <h3>Booking #{booking.booking_id}</h3>
                <p>Event ID: {booking.event_id}</p>
                <p>{booking.number_of_tickets} ticket(s)</p>
                <p>Status: {booking.booking_status}</p>
              </div>
              <div className="booking-right">
                <p className="price-yellow">₹ {booking.total_price}</p>
                <button className="edit-btn" style={{ marginTop: 8 }} onClick={() => cancelBooking(booking.booking_id)}>Cancel Booking</button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* PAGE 3: PROFILE */}
      {currentPage === 'profile' && (
        <section className="page-section">
          <h2>My Profile</h2>
          <div className="profile-card-new">
            <div className="profile-header">
              <div className="avatar-box">{(profile.name || 'G').slice(0, 2).toUpperCase()}</div>
              <div>
                <h3>{profile.name}</h3>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className="personal-info">
              <div className="info-header">
                <h4>Personal Information</h4>
                {!isEditing ?
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button> :
                  <button className="save-btn" onClick={handleSave}>Save</button>
                }
              </div>

              <label>full name</label>
              <input type="text" value={profile.name} disabled={!isEditing} onChange={(e) => setProfile({...profile, name: e.target.value})} />

              <label>Email address</label>
              <input type="email" value={profile.email} disabled={!isEditing} onChange={(e) => setProfile({...profile, email: e.target.value})} />

              <label>Phone number</label>
              <input type="text" value={profile.phone} disabled={!isEditing} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      {currentPage === 'home' && (
        <footer>
          <div className="brand"><div className="logo-dot"></div> EventFlow</div>
          <p className="footer-desc">Your trusted platform to discover and book the best events around you.</p>
          <div className="footer-grid">
            <div><h4>Explore</h4><a href="#" onClick={goHome}>Home</a></div>
            <div><h4>Company</h4><a href="#">About Us</a><a href="#">Contact</a></div>
            <div><h4>Support</h4><a href="#">Help Center</a><a href="#">Privacy Policy</a></div>
          </div>
          <p className="copyright">© 2026 EventFlow. All rights reserved.</p>
        </footer>
      )}
    </div>
  )
}

export default Homepage
