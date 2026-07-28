import React from 'react';
import { Link } from 'react-router-dom';
import './Event3.css'; // <-- E capital check kar

export default function Event3() {
  const event = {
    title: "Grand Art Exhibition",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1600&h=600&fit=crop",
    date: "Dec 5, 2026",
    time: "10:00 AM",
    seats: "634 seats left",
    category: "Arts",
    venue: "National Gallery, Delhi",
    rating: "4.9",
    reviews: "5.0",
    organizer: "ArtHouse Foundation",
    city: "Delhi",
    price: "150",
    seatsSold: "566 sold",
    soldPercent: "48%",
    desc: "A curated showcase of contemporary art from over 200 artists across 15 countries."
  };

  return (
    <div className="event3-page">
      <div className="event3-wrapper">
        <Link to="/" className="back-link">← Back To Events</Link>
        
        <div className="event3-hero">
          <img src={event.image} alt={event.title} />
          <div className="event3-overlay">
            <div className="badges">
              <span className="category-badge">{event.category}</span>
              <span className="rating-badge">⭐ {event.rating}</span>
            </div>
            <h1>{event.title}</h1>
          </div>
        </div>

        <div className="event3-content">
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