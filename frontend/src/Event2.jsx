import React from 'react';
import { Link } from 'react-router-dom';
import './Event2.css'; // <-- E capital check kar

export default function Event2() {
  const event = {
    title: "NBA All-Stars Charity Match",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&h=600&fit=crop",
    date: "Nov 12, 2026",
    time: "8:00 PM",
    seats: "4,521 seats left",
    category: "Sports",
    venue: "Wankhade Stadium, Mumbai",
    rating: "4.9",
    reviews: "1.8K Reviews",
    organizer: "NBA Cares",
    city: "Mumbai",
    price: "200",
    seatsSold: "15,479 sold",
    soldPercent: "77%",
    desc: "Watch your favorite NBA stars compete in a special charity exhibition game."
  };

  return (
    <div className="event2-page">
      <div className="event2-wrapper">
        <Link to="/" className="back-link">← Back To Events</Link>
        
        <div className="event2-hero">
          <img src={event.image} alt={event.title} />
          <div className="event2-overlay">
            <div className="badges">
              <span className="category-badge">{event.category}</span>
              <span className="rating-badge">⭐ {event.rating}</span>
            </div>
            <h1>{event.title}</h1>
          </div>
        </div>

        <div className="event2-content">
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