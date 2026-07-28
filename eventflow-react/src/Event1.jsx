import React from 'react';
import { Link } from 'react-router-dom';
import './Event1.css'; // <-- E capital check kar

export default function Event1() {
  const event = {
    title: "Neon Nights Music Festival",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&h=600&fit=crop",
    date: "Oct 25, 2026",
    time: "7:00 PM",
    seats: "1,243 seats left",
    category: "Music",
    venue: "Jio World Garden, Mumbai",
    rating: "4.8",
    reviews: "2.1K Reviews",
    organizer: "Pulse Events Co.",
    city: "Mumbai",
    price: "250",
    seatsSold: "3,757 sold",
    soldPercent: "75%",
    desc: "An electrifying night of live music featuring top DJs and bands from around the world."
  };

  return (
    <div className="event1-page">
      <div className="event1-wrapper">
        <Link to="/" className="back-link">← Back To Events</Link>
        
        <div className="event1-hero">
          <img src={event.image} alt={event.title} />
          <div className="event1-overlay">
            <div className="badges">
              <span className="category-badge">{event.category}</span>
              <span className="rating-badge">⭐ {event.rating}</span>
            </div>
            <h1>{event.title}</h1>
          </div>
        </div>

        <div className="event1-content">
          <div className="info-grid">
            <div className="info-box"><p className="label">Date</p><p className="value">{event.date}</p></div>
            <div className="info-box"><p className="label">Time</p><p className="value">{event.time}</p></div>
            <div className="info-box"><p className="label">Availability</p><p className="value">{event.seats}</p></div>
            <div className="info-box"><p className="label">Category</p><p className="value">{event.category}</p></div>
            <div className="info-box"><p className="label">Venue</p><p className="value">{event.venue}</p></div>
            <div className="info-box"><p className="label">Rating</p><p className="value">{event.rating} ({event.reviews})</p></div>
          </div>

          <div className="about-box"><h2>About this event</h2><p>{event.desc}</p></div>
          <div className="info-box full"><p className="label">Organized by</p><p className="value bold">{event.organizer}</p></div>
          <div className="info-box full"><p className="label">Location</p><p className="value">{event.venue}, {event.city}</p></div>

          <div className="ticket-box">
            <div className="ticket-header">
              <div><h2>₹{event.price}</h2><p>per ticket</p></div>
              <div className="sold-info"><p>Tickets sold</p><p className="percent">{event.soldPercent}</p></div>
            </div>
            <div className="progress-bar"><div style={{width: event.soldPercent}}></div></div>
            <p className="sold-text">{event.seatsSold} sold</p>
            <button className="book-btn">Book Tickets</button>
          </div>
        </div>
      </div>
    </div>
  )
}