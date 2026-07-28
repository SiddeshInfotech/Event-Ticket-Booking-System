import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  Search, Bell, Home as HomeIcon, Calendar, User, LogOut, Menu, ChevronDown, 
  LayoutDashboard, PlusCircle, CalendarRange, Ticket, Users, BarChart3, Settings, LogOut as ExitIcon,
  Eye, Edit, Trash2, Plus
} from 'lucide-react';
import './Homepage.css';

// Initial Events Data
const initialEventsData = [
  { id: 1, title: "Neon Nights Music Festival", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=500&fit=crop", date: "Oct 25, 2026", time: "7:00 PM", seats: "1,243 seats left", category: "Music", venue: "Jio World Garden, Mumbai", rating: "4.8", reviews: "2.1K Reviews", organizer: "Pulse Events Co.", city: "Mumbai", price: "250", seatsSold: "3,757 sold", soldPercent: "75%", desc: "An electrifying night of live music featuring top DJs and bands from around the world." },
  { id: 2, title: "NBA All-Stars Charity Match", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=500&fit=crop", date: "Nov 12, 2026", time: "8:00 PM", seats: "4,521 seats left", category: "Sports", venue: "Wankhede Stadium, Mumbai", rating: "4.9", reviews: "1.8K Reviews", organizer: "NBA Cares", city: "Mumbai", price: "200", seatsSold: "15,479 sold", soldPercent: "77%", desc: "Watch your favorite NBA stars compete in a special charity exhibition game." },
  { id: 3, title: "Grand Art Exhibition", image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1200&h=500&fit=crop", date: "Dec 5, 2026", time: "10:00 AM", seats: "634 seats left", category: "Arts", venue: "National Gallery, Delhi", rating: "4.9", reviews: "5.0", organizer: "ArtHouse Foundation", city: "Delhi", price: "150", seatsSold: "566 sold", soldPercent: "48%", desc: "A curated showcase of contemporary art from over 200 artists across 15 countries." },
  { id: 4, title: "Brooklyn Comedy Night", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=500&fit=crop", date: "Aug 18, 2026", time: "8:00 PM", seats: "87 seats left", category: "Comedy", venue: "Shivaji park Dadar,Mumbai", rating: "4.7", reviews: "5.0", organizer: "Comedy Kings", city: "Mumbai", price: "189", seatsSold: "313 sold", soldPercent: "78%", desc: "A hilarious evening with the best stand-up comedians in the country." },
  { id: 5, title: "The Final Act", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=500&fit=crop", date: "Aug 15 2026", time: "8:00 PM", seats: "32 seats left", category: "Theater", venue: "Jehangir Art Gallery,Mumbai", rating: "4.9", reviews: "5.0", organizer: "Nova Stage Productions", city: "Mumbai", price: "269", seatsSold: "418 sold", soldPercent: "86%", desc: "A powerful stage performance where every decision changes the ending." },
];

const bookingsData = [
  { id: 1, title: "Culinary Arts Weekend", bookingId: "BK-2026-7843", date: "Jul 20, 2026", tickets: "3 tickets", venue: "Grand Expo Hall", price: "205" },
  { id: 2, title: "Brooklyn Comedy Night", bookingId: "BK-2026-7844", date: "Jul 12, 2026", tickets: "2 tickets", venue: "The Laugh Factory", price: "95" },
  { id: 3, title: "NBA All-Stars Charity Match", bookingId: "BK-2026-7846", date: "Sep 18, 2026", tickets: "4 tickets", venue: "United Center", price: "504" },
  { id: 4, title: "Neon Nights Music Festival", bookingId: "BK-2026-7847", date: "Oct 25, 2026", tickets: "2 tickets", venue: "Jio World Garden", price: "500" },
  { id: 5, title: "Grand Art Exhibition", bookingId: "BK-2026-7848", date: "Dec 5, 2026", tickets: "2 tickets", venue: "National Gallery", price: "300" },
];

function Navbar({ userRole, setUserRole, search, setSearch }) {
  const [userMenu, setUserMenu] = useState(false);
  const [menuBar, setMenuBar] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setUserRole(role);
    setUserMenu(false);
    if (role === 'Admin') {
      navigate('/admin');
    } else if (role === 'Organizer') {
      navigate('/organizer');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo"><span className="dot"></span> EventFlow</Link>
      
      <div className="search-box">
        <Search size={18}/>
        <input 
          type="text" 
          placeholder="Search events..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="nav-icons">
        <div className="user-wrapper">
          <div className="user" onClick={() => setUserMenu(!userMenu)}>
            <div className="avatar">AJ</div>
            <span>{userRole}</span>
            <ChevronDown size={14}/>
          </div>
          {userMenu && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={() => handleRoleChange('User')}>User</div>
              <div className="dropdown-item" onClick={() => handleRoleChange('Organizer')}>Organizer</div>
              <div className="dropdown-item" onClick={() => handleRoleChange('Admin')}>Admin</div>
            </div>
          )}
        </div>
        <Bell size={20} className="icon"/>
        <Link to="/"><HomeIcon size={20} className="icon"/></Link>
        <Link to="/bookings"><Calendar size={20} className="icon"/></Link>
        <Link to="/profile"><User size={20} className="icon"/></Link>
        <LogOut
          size={20}
          className="icon"
          onClick={() => navigate('/login')}
          style={{ cursor: 'pointer' }}
        />
        
        <div className="menu-wrapper">
          <Menu size={20} className="icon" onClick={() => setMenuBar(!menuBar)}/>
          {menuBar && (
            <div className="dropdown menu-dropdown">
              <div className="dropdown-item" onClick={() => {navigate('/'); setMenuBar(false)}}>Home</div>
              <div className="dropdown-item" onClick={() => {navigate('/bookings'); setMenuBar(false)}}>My Bookings</div>
              <div className="dropdown-item" onClick={() => {navigate('/profile'); setMenuBar(false)}}>Profile</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer-new">
      <div className="footer-grid">
        <div>
          <h3><span className="dot"></span> EventFlow</h3>
          <p>Your gateway to unforgettable experiences worldwide.</p>
        </div>
        <div><h4>Explore</h4><a>Browse Events</a><a>Categories</a><a>Cities</a><a>Artists</a></div>
        <div><h4>Company</h4><a>About Us</a><a>Careers</a><a>Press</a><a>Blog</a></div>
        <div><h4>Support</h4><a>Help Center</a><a>Contact Us</a><a>Privacy Policy</a><a>Terms</a></div>
      </div>
      <div className="footer-line"></div>
      <p className="copyright">© 2026 EventFlow. All rights reserved.</p>
    </footer>
  );
}

function Homepage({ search, setSearch, events }) {
  const [filter, setFilter] = useState("All");
  const filteredEvents = events.filter(e => 
    (filter === "All" || e.category === filter) && 
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="hero" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&h=700&fit=crop')"}}>
        <div className="hero-line"></div>
        <h1>Find your next <br/><span className="gradient">unforgettable</span> experience</h1>
        <p>Concerts, sports, tech talks, art galleries — discover and book with <br/>confidence.</p>
        <div className="filters">{["All", "Music", "Sports", "Arts", "Comedy", "Theater"].map(cat => (<button key={cat} className={filter === cat? "active" : ""} onClick={() => setFilter(cat)}>{cat}</button>))}</div>
      </section>
      <section className="featured">
        <h2>Featured Events</h2>
        <div className="event-grid">
          {filteredEvents.length > 0 ? filteredEvents.map(event => (
            <Link to={`/event/${event.id}`} key={event.id} className="event-card-link">
              <div className="event-card">
                <img src={event.image} alt={event.title} />
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p><span className="icon-text">🗓</span> {event.date}. {event.time}</p>
                  <p><span className="icon-text">📍</span> {event.venue}</p>
                  <p className="price">₹ {event.price}</p>
                </div>
              </div>
            </Link>
          )) : <p style={{textAlign: 'center', opacity: 0.6}}>No events found</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}

/* ========================================================================
   ORGANIZER DASHBOARD COMPONENT (Clean Header without extra links)
   ======================================================================== */
function OrganizerDashboard({ events, setEvents, userRole, setUserRole }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [userMenu, setUserMenu] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    setUserMenu(false);
    if (role === 'Admin') {
      navigate('/admin');
    } else if (role === 'Organizer') {
      navigate('/organizer');
    } else {
      navigate('/');
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0b0612", color: "#e2d9f3", fontFamily: "sans-serif" }}>
      {/* ORGANIZER HEADER (Clean - No Middle Links) */}
      <header style={{ height: "64px", borderBottom: "1px solid #231238", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", background: "#130921" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/" className="logo" style={{ textDecoration: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
            <span style={{ width: "10px", height: "10px", background: "#b849d5", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span> EventFlow
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ position: "relative" }}>
            <div 
              onClick={() => setUserMenu(!userMenu)}
              style={{ background: "#221038", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", color: "#fff" }}
            >
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold" }}>AJ</div>
              <span>{userRole}</span>
              <ChevronDown size={14} />
            </div>
            {userMenu && (
              <div className="dropdown" style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", background: "#1d0e33", border: "1px solid #321a52", borderRadius: "8px", padding: "6px 0", width: "130px", zIndex: 10 }}>
                <div className="dropdown-item" style={{ padding: "8px 12px", cursor: "pointer" }} onClick={() => handleRoleChange('User')}>User</div>
                <div className="dropdown-item" style={{ padding: "8px 12px", cursor: "pointer" }} onClick={() => handleRoleChange('Organizer')}>Organizer</div>
                <div className="dropdown-item" style={{ padding: "8px 12px", cursor: "pointer" }} onClick={() => handleRoleChange('Admin')}>Admin</div>
              </div>
            )}
          </div>
          <Bell size={18} style={{ color: "#9f8eb7", cursor: "pointer" }} />
          <LogOut size={18} style={{ color: "#9f8eb7", cursor: "pointer" }} onClick={() => navigate('/login')} />
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize: "28px", margin: 0, color: "#fff" }}>My Events</h1>
            <p style={{ color: "#8a75a7", margin: "4px 0 0", fontSize: "14px" }}>{events.length} events total</p>
          </div>
          <button style={{ background: "#a855f7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", cursor: "pointer" }}>
            <Plus size={16} /> New Event
          </button>
        </div>

        {/* SEARCH BOX */}
        <div style={{ background: "#130921", border: "1px solid #231238", borderRadius: "10px", padding: "10px 16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px", width: "300px" }}>
          <Search size={16} style={{ color: "#8a75a7" }} />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "14px", width: "100%" }}
          />
        </div>

        {/* EVENTS TABLE */}
        <div style={{ background: "#130921", border: "1px solid #231238", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #231238", color: "#8a75a7", height: "45px" }}>
                <th style={{ paddingLeft: "20px" }}>Event</th>
                <th>Date</th>
                <th>Category</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Status</th>
                <th style={{ textAlign: "right", paddingRight: "20px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #1a0c2e", height: "70px" }}>
                  <td style={{ paddingLeft: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <img src={item.image} alt={item.title} style={{ width: "45px", height: "45px", borderRadius: "8px", objectFit: "cover" }} />
                      <div>
                        <div style={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>{item.title}</div>
                        <div style={{ color: "#8a75a7", fontSize: "12px" }}>{item.seatsSold} ({item.soldPercent})</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "#e2d9f3" }}>{item.date}</td>
                  <td>
                    <span style={{ background: "#1e1035", color: "#60a5fa", border: "1px solid #2d1854", padding: "4px 12px", borderRadius: "15px", fontSize: "12px" }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ color: "#f97316", fontWeight: "bold" }}>₹ {item.price}</td>
                  <td style={{ color: "#e2d9f3" }}>{item.seats}</td>
                  <td>
                    <span style={{ background: "rgba(34, 197, 94, 0.15)", color: "#4ade80", padding: "4px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "bold" }}>
                      Active
                    </span>
                  </td>
                  <td style={{ textAlign: "right", paddingRight: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", color: "#9f8eb7" }}>
                      <Eye size={16} style={{ cursor: "pointer" }} onClick={() => navigate(`/event/${item.id}`)} />
                      <Edit size={16} style={{ cursor: "pointer" }} />
                      <Trash2 
                        size={16} 
                        style={{ cursor: "pointer", color: "#ef4444" }} 
                        onClick={() => handleDelete(item.id)} 
                        title="Delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BookingsPage() {
  return (
    <div className="page-container">
      <h1>My Bookings</h1>
      <div className="booking-list">
        {bookingsData.map(b => (
          <div key={b.id} className="booking-card">
            <div>
              <h3>{b.title}</h3>
              <p>{b.bookingId}</p>
              <p>{b.date}</p>
              <p>{b.tickets}</p>
            </div>
            <div className="booking-right">
              <p>{b.venue}</p>
              <p className="price">₹ {b.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "Alex Johnson", email: "alex.johnson@email.com", phone: "+1 555-0101" });

  return (
    <div className="page-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-lg">AJ</div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
        </div>
        <div className="profile-section">
          <div className="profile-title-row">
            <h3>Personal Information</h3>
            <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>{isEditing? 'Save' : 'Edit Profile'}</button>
          </div>
          <div className="form-group">
            <label>Full Name</label>
            {isEditing? <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} /> : <p>{profile.name}</p>}
          </div>
          <div className="form-group">
            <label>Email Address</label>
            {isEditing? <input value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} /> : <p>{profile.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            {isEditing? <input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} /> : <p>{profile.phone}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function EventDetail({ events }) {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id));
  if(!event) return <div className="detail-page"><p style={{padding: 50}}>Event not found</p></div>

  return (
    <div className="detail-page">
      <div className="detail-wrapper">
        <Link to="/" className="back-link">← Back To Events</Link>
        <div className="detail-hero">
          <img src={event.image} alt={event.title} />
          <div className="detail-overlay">
            <span className="category-badge">{event.category}</span>
            <span className="rating-badge">⭐ {event.rating}</span>
            <h1>{event.title}</h1>
          </div>
        </div>
        <div className="detail-container-single">
          <div className="info-grid">
            <div className="info-box"><p className="label">Date</p><p className="value">{event.date}</p></div>
            <div className="info-box"><p className="label">Time</p><p className="value">{event.time}</p></div>
            <div className="info-box"><p className="label">Availability</p><p className="value">{event.seats}</p></div>
            <div className="info-box"><p className="label">Category</p><p className="value">{event.category}</p></div>
            <div className="info-box"><p className="label">Venue</p><p className="value">{event.venue}</p></div>
            <div className="info-box"><p className="label">Rating</p><p className="value">{event.rating} ({event.reviews})</p></div>
          </div>
          <div className="about-box"><h2>About this event</h2><p>{event.desc}</p></div>
          <div className="info-box"><p className="label">Organized by</p><p className="value" style={{fontWeight: 'bold'}}>{event.organizer}</p></div>
          <div className="info-box"><p className="label">Location</p><p className="value">{event.venue}, {event.city}</p></div>
          <div className="ticket-box-full">
            <div className="ticket-header"><div><h2>₹{event.price}</h2><p>per ticket</p></div><div><p>Tickets sold</p><p className="percent">{event.soldPercent}</p></div></div>
            <div className="progress-bar"><div style={{width: event.soldPercent}}></div></div>
            <p className="sold-text">{event.seatsSold} sold</p>
            <button className="book-btn">Book Tickets</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#120015", color: "white" }}>
      <form onSubmit={handleSignIn} style={{ width: "320px", padding: "32px", borderRadius: "12px", background: "#1d0620", boxShadow: "0 0 30px rgba(190, 72, 220, 0.18)" }}>
        <h2 style={{ marginBottom: "8px" }}>EventFlow</h2>
        <h1 style={{ margin: "0 0 8px" }}>Welcome Back!!</h1>
        <p style={{ color: "#bdb1c2", fontSize: "14px", marginBottom: "22px" }}>Sign in to continue to your account</p>
        <label>Email address</label>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", boxSizing: "border-box", marginTop: "7px", marginBottom: "16px", padding: "12px", borderRadius: "20px", border: "none", outline: "none" }} />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", boxSizing: "border-box", marginTop: "7px", marginBottom: "20px", padding: "12px", borderRadius: "20px", border: "none", outline: "none" }} />
        <button type="submit" style={{ width: "100%", padding: "12px", border: "none", borderRadius: "8px", background: "#b849d5", color: "white", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Sign in</button>
      </form>
    </div>
  );
}

/* ========================================================================
   ADMIN DASHBOARD COMPONENT (FULL ORIGINAL CODE RESTORED)
   ======================================================================== */
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Create Event", icon: <PlusCircle size={18} /> },
    { name: "Manage Events", icon: <CalendarRange size={18} /> },
    { name: "Bookings", icon: <Ticket size={18} /> },
    { name: "Users", icon: <Users size={18} /> },
    { name: "Analytics", icon: <BarChart3 size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  const recentBookings = [
    { id: "BK-2026-7841", customer: "Alex Johnson", avatar: "AJ", event: "Neon Nights Music Festival", tickets: 2, date: "Aug 15, 2026", status: "Paid" },
    { id: "BK-2026-7842", customer: "Alex Johnson", avatar: "AJ", event: "TechSummit 2026", tickets: 1, date: "Sep 3, 2026", status: "Paid" },
    { id: "BK-2026-7843", customer: "Maria Garcia", avatar: "MG", event: "Culinary Arts Weekend", tickets: 3, date: "Jul 20, 2026", status: "Paid" },
    { id: "BK-2026-7844", customer: "James Wilson", avatar: "JW", event: "Brooklyn Comedy Night", tickets: 2, date: "Jul 12, 2026", status: "Paid" },
    { id: "BK-2026-7845", customer: "Sarah Lee", avatar: "SL", event: "Grand Art Exhibition", tickets: 1, date: "Aug 1, 2026", status: "Pending" },
    { id: "BK-2026-7846", customer: "Robert Chen", avatar: "RC", event: "NBA All-Stars Charity Match", tickets: 4, date: "Sep 18, 2026", status: "Paid" },
  ];

  const recentActivity = [
    { type: "add", title: "New event created", desc: "Neon Nights Music Festival", time: "2 min ago" },
    { type: "booking", title: "Booking received", desc: "BK-2026-7891 • Alex Johnson", time: "8 min ago" },
    { type: "update", title: "Event updated", desc: "TechSummit 2026 — venue changed", time: "34 min ago" },
    { type: "user", title: "User registered", desc: "emma.davis@example.com", time: "1 hr ago" },
    { type: "cancel", title: "Booking cancelled", desc: "BK-2026-7843 • Maria Garcia", time: "2 hrs ago" },
    { type: "delete", title: "Event deleted", desc: "Spring Comedy Night", time: "5 hrs ago" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0b0612", color: "#e2d9f3", fontFamily: "sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: "240px", background: "#130921", borderRight: "1px solid #231238", padding: "20px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ padding: "0 20px 24px", fontSize: "20px", fontWeight: "bold", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", background: "#b849d5", borderRadius: "50%", display: "inline-block" }}></span> EventFlow
          </div>
          <nav>
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <div
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: isActive ? "600" : "normal",
                    color: isActive ? "#fff" : "#9f8eb7",
                    background: isActive ? "linear-gradient(90deg, #6b21a8 0%, rgba(107, 33, 168, 0.2) 100%)" : "transparent",
                    borderLeft: isActive ? "4px solid #b849d5" : "4px solid transparent",
                    transition: "all 0.2s"
                  }}
                >
                  {item.icon}
                  {item.name}
                </div>
              );
            })}
          </nav>
        </div>

        <div 
          onClick={() => navigate('/')} 
          style={{ padding: "16px 20px", color: "#9f8eb7", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid #231238", fontSize: "14px" }}
        >
          <ExitIcon size={18} /> Exit Dashboard
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <header style={{ height: "64px", borderBottom: "1px solid #231238", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", background: "#130921" }}>
          <div>
            <h2 style={{ fontSize: "18px", margin: 0, color: "#fff" }}>Users Dashboard</h2>
            <span style={{ fontSize: "12px", color: "#9f8eb7" }}>Overview</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative", width: "320px" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "10px", color: "#8a75a7" }} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                style={{ width: "100%", background: "#1d0e33", border: "1px solid #321a52", borderRadius: "20px", padding: "8px 12px 8px 36px", color: "#fff", fontSize: "13px", outline: "none" }}
              />
            </div>
            <Bell size={18} style={{ color: "#9f8eb7", cursor: "pointer" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#a855f7", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "13px" }}>RC</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "bold", color: "#fff" }}>Robert Chen</div>
                <div style={{ fontSize: "11px", color: "#9f8eb7" }}>Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT DYNAMIC BY TAB */}
        <div style={{ padding: "28px", flex: 1, overflowY: "auto" }}>
          {activeTab === "Dashboard" && (
            <>
              {/* METRICS STATS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px", marginBottom: "28px" }}>
                {[
                  { title: "Total Users", val: "2,841", sub: "+87 this month", change: "+12%" },
                  { title: "Total Events", val: "156", sub: "+8 this month", change: "+5%" },
                  { title: "Total Bookings", val: "14,392", sub: "+398 this month", change: "+23%" },
                  { title: "Total Revenue", val: "$189.4K", sub: "+$41.5K this month", change: "+31%" },
                ].map((s, idx) => (
                  <div key={idx} style={{ background: "#130921", border: "1px solid #231238", padding: "18px", borderRadius: "12px", position: "relative" }}>
                    <span style={{ fontSize: "11px", background: "rgba(34, 197, 94, 0.15)", color: "#4ade80", padding: "2px 8px", borderRadius: "10px", position: "absolute", top: "18px", right: "18px", fontWeight: "bold" }}>{s.change}</span>
                    <div style={{ fontSize: "13px", color: "#9f8eb7" }}>{s.title}</div>
                    <div style={{ fontSize: "24px", fontWeight: "bold", color: "#fff", margin: "8px 0 4px" }}>{s.val}</div>
                    <div style={{ fontSize: "11px", color: "#4ade80" }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* RECENT BOOKINGS TABLE */}
              <div style={{ background: "#130921", border: "1px solid #231238", borderRadius: "12px", padding: "20px", marginBottom: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "16px", margin: 0, color: "#fff" }}>Recent Bookings</h3>
                  <span style={{ fontSize: "13px", color: "#b849d5", cursor: "pointer" }}>View All &gt;</span>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #231238", color: "#8a75a7", height: "36px" }}>
                      <th>BOOKING ID</th>
                      <th>CUSTOMER NAME</th>
                      <th>EVENT NAME</th>
                      <th>TICKETS</th>
                      <th>DATE</th>
                      <th>PAYMENT STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #1a0c2e", height: "48px" }}>
                        <td style={{ color: "#a855f7", fontWeight: "bold" }}>{b.id}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#2e1847", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#d8b4fe" }}>{b.avatar}</div>
                            {b.customer}
                          </div>
                        </td>
                        <td style={{ color: "#fff" }}>{b.event}</td>
                        <td>{b.tickets}</td>
                        <td>{b.date}</td>
                        <td>
                          <span style={{
                            padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold",
                            background: b.status === "Paid" ? "rgba(34, 197, 94, 0.15)" : "rgba(234, 179, 8, 0.15)",
                            color: b.status === "Paid" ? "#4ade80" : "#facc15"
                          }}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* LOWER SECTION: QUICK ACTIONS & RECENT ACTIVITY */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {/* QUICK ACTIONS */}
                <div style={{ background: "#130921", border: "1px solid #231238", borderRadius: "12px", padding: "20px" }}>
                  <h3 style={{ fontSize: "16px", margin: "0 0 16px", color: "#fff" }}>Quick Actions</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {[
                      { title: "Create Event", desc: "Publish a new event", icon: "+", action: () => setActiveTab("Create Event") },
                      { title: "Manage Events", desc: "Edit or remove events", icon: "📅", action: () => setActiveTab("Manage Events") },
                      { title: "View Bookings", desc: "All ticket bookings", icon: "🎟️", action: () => setActiveTab("Bookings") },
                      { title: "View Users", desc: "Registered accounts", icon: "👥", action: () => setActiveTab("Users") },
                    ].map((qa, i) => (
                      <div key={i} onClick={qa.action} style={{ background: "#1a0c2e", border: "1px solid #281343", padding: "16px", borderRadius: "10px", cursor: "pointer" }}>
                        <div style={{ fontSize: "18px", marginBottom: "8px", color: "#b849d5" }}>{qa.icon}</div>
                        <div style={{ fontWeight: "bold", color: "#fff", fontSize: "14px" }}>{qa.title}</div>
                        <div style={{ fontSize: "11px", color: "#8a75a7", marginTop: "2px" }}>{qa.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div style={{ background: "#130921", border: "1px solid #231238", borderRadius: "12px", padding: "20px" }}>
                  <h3 style={{ fontSize: "16px", margin: "0 0 16px", color: "#fff" }}>Recent Activity</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {recentActivity.map((act, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                        <div>
                          <div style={{ color: "#fff", fontWeight: "500" }}>{act.title}</div>
                          <div style={{ color: "#8a75a7", fontSize: "11px" }}>{act.desc}</div>
                        </div>
                        <div style={{ color: "#6b5887", fontSize: "11px" }}>{act.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== "Dashboard" && (
            <div style={{ background: "#130921", border: "1px solid #231238", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
              <h2>{activeTab} Panel</h2>
              <p style={{ color: "#9f8eb7" }}>Here you can manage all options related to {activeTab}.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function AppContent() {
  const [userRole, setUserRole] = useState("User");
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState(initialEventsData);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isAdminPage = location.pathname === "/admin";
  const isOrganizerPage = location.pathname === "/organizer";

  return (
    <div className="app-wrapper">
      {!isLoginPage && !isAdminPage && !isOrganizerPage && (
        <Navbar
          userRole={userRole}
          setUserRole={setUserRole}
          search={search}
          setSearch={setSearch}
        />
      )}

      <Routes>
        <Route path="/" element={<Homepage search={search} setSearch={setSearch} events={events} />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/event/:id" element={<EventDetail events={events} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/organizer" element={<OrganizerDashboard events={events} setEvents={setEvents} userRole={userRole} setUserRole={setUserRole} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}