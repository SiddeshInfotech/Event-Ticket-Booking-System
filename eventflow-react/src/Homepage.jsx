import React, { useState } from 'react'
import './Homepage.css'

function Homepage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [userType, setUserType] = useState('User')
  const [currentPage, setCurrentPage] = useState('home') // 'home' | 'bookings' | 'profile'
  
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 555-0101'
  })

  const goHome = () => {
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  const goToBookings = () => setCurrentPage('bookings')
  const goToProfile = () => setCurrentPage('profile')

  const handleSave = () => {
    setIsEditing(false)
    alert('Profile Updated Successfully!')
  }

  const events = [
    { id: 1, title: 'Neon Nights Music Festival', date: '25 Oct 2026 . 7:00 PM', venue: 'Jio World Garden, Mumbai', price: '₹ 250', category: 'music', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070' },
    { id: 2, title: 'NBA All-Stars Charity Match', date: '12 Nov 2026 . 8:00 PM', venue: 'Wankhede Stadium, Mumbai', price: '₹ 200', category: 'sports', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070' },
    { id: 3, title: 'Grand Art Exhibition', date: '5 Dec 2026 . 10:00 AM', venue: 'National Gallery, Delhi', price: '₹ 150', category: 'arts', img: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&h=400&fit=crop' },
    { id: 4, title: 'Brooklyn Comedy Night', date: '18 Aug 2026 . 8:00 PM', venue: 'Shivaji park Dadar,Mumbai', price: '₹ 189', category: 'comedy', img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070' },
    { id: 5, title: 'The Final Act', date: '15 Aug 2026 . 8:00 PM', venue: 'Jehangir Art Gallery,Mumbai', price: '₹ 269', category: 'theater', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop' }
  ]

  const bookings = [
    { id: 1, title: 'Culinary Arts Weekend', code: 'BK-2026-7843', date: 'Jul 20, 2026', venue: 'Grand Expo Hall', price: '₹ 205', tickets: '3 tickets' },
    { id: 2, title: 'Brooklyn Comedy Night', code: 'BK-2026-7844', date: 'Jul 12, 2026', venue: 'The Laugh Factory', price: '₹ 95', tickets: '2 tickets' },
    { id: 3, title: 'NBA All-Stars Charity Match', code: 'BK-2026-7846', date: 'Sep 18, 2026', venue: 'United Center', price: '₹ 504', tickets: '4 tickets' },
    { id: 4, title: 'Neon Nights Music Festival', code: 'BK-2026-7847', date: 'Oct 25, 2026', venue: 'Jio World Garden', price: '₹ 500', tickets: '2 tickets' },
    { id: 5, title: 'Grand Art Exhibition', code: 'BK-2026-7848', date: 'Dec 5, 2026', venue: 'National Gallery', price: '₹ 300', tickets: '2 tickets' }
  ]

  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === 'all' || event.category === activeFilter
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* HEADER - SAGLYA PAGES LA SAME */}
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

          {/* USER BOX */}
          <div className="user-box" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="avatar-small">AJ</div>
            <span>{userType}</span>
            <svg className="arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            {showUserMenu && (
              <div className="dropdown">
                <a href="#" onClick={(e) => {e.stopPropagation(); setUserType('User'); setShowUserMenu(false)}}>User</a>
                <a href="#" onClick={(e) => {e.stopPropagation(); setUserType('Organizer'); setShowUserMenu(false)}}>Organizer</a>
                <a href="#" onClick={(e) => {e.stopPropagation(); setUserType('Admin'); setShowUserMenu(false)}}>Admin</a>
              </div>
            )}
          </div>

          {/* ICONS */}
          <div className="header-icons">
            <a href="#" title="Notifications"><svg className="icon" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg></a>
            
            <a href="#" onClick={(e) => {e.preventDefault(); goHome()}} title="Home"><svg className="icon" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></a>

            <a href="#" onClick={(e) => {e.preventDefault(); goToBookings()}} title="My Bookings"><svg className="icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg></a>

            <a href="#" onClick={(e) => {e.preventDefault(); goToProfile()}} title="Profile"><svg className="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></a>

            <a href="#" title="Sign Out"><svg className="icon" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg></a>

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
            <div className="event-grid">
              {filteredEvents.map(event => (
                <div key={event.id} className="event-card" data-cat={event.category}>
                  <img src={event.img} alt={event.title}/>
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <div className="event-detail">📅 {event.date}</div>
                    <div className="event-detail">📍 {event.venue}</div>
                    <div className="price">{event.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* PAGE 2: BOOKINGS */}
      {currentPage === 'bookings' && (
        <section className="page-section">
          <h2>My Bookings</h2>
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card-new">
              <div className="booking-left">
                <h3>{booking.title}</h3>
                <p>{booking.code}</p>
                <p>{booking.date}</p>
                <p>{booking.tickets}</p>
              </div>
              <div className="booking-right">
                <p className="venue">{booking.venue}</p>
                <p className="price-yellow">{booking.price}</p>
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
              <div className="avatar-box">AJ</div>
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

      {/* FOOTER - FAKT HOME PAGE LA */}
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