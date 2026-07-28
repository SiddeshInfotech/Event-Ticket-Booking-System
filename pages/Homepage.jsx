import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Home as HomeIcon, Calendar, User, LogOut, Menu, ChevronDown } from 'lucide-react';
import './Homepage.css';

const eventsData = [
  { 
    id: 1, 
    title: "Neon Nights Music Festival", 
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
    date: "25 Oct 2026", time: "7:00 PM", 
    category: "Music", venue: "Jio World Garden, Mumbai", 
    price: "250"
  },
  { 
    id: 2, 
    title: "NBA All-Stars Charity Match", 
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop",
    date: "12 Nov 2026", time: "8:00 PM", 
    category: "Sports", venue: "Wankhede Stadium, Mumbai", 
    price: "200"
  },
  { 
    id: 3, 
    title: "Grand Art Exhibition", 
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&h=400&fit=crop", // ART GALLERY WALI CHAN IMAGE
    date: "5 Dec 2026", time: "10:00 AM", 
    category: "Arts", venue: "National Gallery, Delhi", 
    price: "150"
  },
  { 
    id: 4, 
    title: "Brooklyn Comedy Night", 
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    date: "18 Aug 2026", time: "8:00 PM", 
    category: "Comedy", venue: "Shivaji park Dadar,Mumbai", 
    price: "189"
  },
  { 
    id: 5, 
    title: "The Final Act", 
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    date: "15 Aug 2026", time: "8:00 PM", 
    category: "Theater", venue: "Jehangir Art Gallery,Mumbai", 
    price: "269"
  },
];

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [userMenu, setUserMenu] = useState(false);
  
  const filteredEvents = eventsData.filter(e => 
    (filter === "All" || e.category === filter) && 
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <header className="navbar">
        <div className="logo"><span className="dot"></span> EventFlow</div>
        <div className="search-box">
          <Search size={18}/>
          <input type="text" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="nav-icons">
          <div className="user-wrapper">
            <div className="user" onClick={() => setUserMenu(!userMenu)}>
              <div className="avatar">AJ</div>
              <span>User</span>
              <ChevronDown size={14}/>
            </div>
            {userMenu && (
              <div className="dropdown">
                <div className="dropdown-item"><User size={16}/> User</div>
                <div className="dropdown-item"><User size={16}/> Organizer</div>
                <div className="dropdown-item"><User size={16}/> Admin</div>
              </div>
            )}
          </div>
          <Bell size={20} className="icon"/><HomeIcon size={20} className="icon"/><Calendar size={20} className="icon"/><User size={20} className="icon"/><LogOut size={20} className="icon"/><Menu size={20} className="icon"/>
        </div>
      </header>

      <section className="hero" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&h=700&fit=crop')"}}>
        <div className="hero-line"></div>
        <h1>Find your next <br/><span className="gradient">unforgettable</span> experience</h1>
        <p>Concerts, sports, tech talks, art galleries — discover and book with <br/>confidence.</p>
        <div className="filters">{["All", "Music", "Sports", "Arts", "Comedy", "Theater"].map(cat => (<button key={cat} className={filter === cat ? "active" : ""} onClick={() => setFilter(cat)}>{cat}</button>))}</div>
      </section>

      <section className="featured">
        <h2>Featured Events</h2>
        <div className="event-grid">
          {filteredEvents.map(event => (
            <Link to={`/event/${event.id}`} key={event.id} className="event-card-link">
              <div className="event-card">
                <img src={event.image} alt={event.title} />
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p><span className="icon-text">🗓</span> {event.date} . {event.time}</p>
                  <p><span className="icon-text">📍</span> {event.venue}</p>
                  <p className="price">₹ {event.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <h3><span className="dot"></span> EventFlow</h3>
            <p>Your trusted platform to discover and book the best <br/>events around you.</p>
          </div>
          <div><h4>Explore</h4><Link to="/">Home</Link></div>
          <div><h4>Company</h4><a>About Us</a><a>Contact</a></div>
          <div><h4>Support</h4><a>Help Center</a><a>Privacy Policy</a></div>
        </div>
        <div className="footer-line"></div>
        <p className="copyright">© 2026 EventFlow. All rights reserved.</p>
      </footer>
    </div>
  )
}