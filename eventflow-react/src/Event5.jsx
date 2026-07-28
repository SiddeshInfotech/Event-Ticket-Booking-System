import React from 'react';
import { Link } from 'react-router-dom';
import './Event5.css'; 

export default function Event5() {
  const event = {
    title: "The Final Act",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=500&fit=crop", // tuzi hech concert image
    date: "Aug 15 2026",
    time: "8:00 PM",
    seats: "32 seats left",
    category: "Theater",
    venue: "Jahangir Art Gallery,Mumbai",
    rating: "4.9",
    reviews: "5.0",
    organizer: "Nova Stage Productions",
    city: "Mumbai",
    price: "269",
    seatsSold: "418 sold",
    soldPercent: "86%",
    desc: "A powerful stage performance where every decision changes the ending."
  };

  return (
    <div className="event5-page">
      <div className="event5-wrapper">
        <Link to="/" className="back-link">← Back To Events</Link>
        
        <div className="event5-hero">
          <img src={event.image} alt={event.title} />
          <div className="event5-overlay">
            <div className="badges">
              <span className="category-badge">{event.category}</span>
              <span className="rating-badge">⭐ {event.rating}</span>
            </div>
            <h1>{event.title}</h1>
          </div>
        </div>

        <div className="event5-content">
          <div className="info-grid">
            <div className="info-box"><p className="label">Date</p><p className="value">{event.date}</p></div>
            <div className="info-box"><p className="label">Time</p><p className="value">{event.time}</p></div>
            <div className="info-box"><p className="label">Availability</p><p className="value">{event.seats}</p></div>
            <div className="info-box"><p className="label">Category</p><p className="value">{event.category}</p></div>
            <div className="info-box"><p className="label">Venue</p><p className="value">{event.venue}</p></div>
            <div className="info-box"><p className="label">Rating</p><p className="value">{event.rating} ({event.reviews})</p></div>
          </div>

          <div className="about-box">
            <h2>About this event</h2>
            <p>{event.desc}</p>
          </div>

          <div className="info-box full">
            <p className="label">Organized by</p>
            <p className="value bold">{event.organizer}</p>
          </div>

          <div className="info-box full">
            <p className="label">Location</p>
            <p className="value">{event.venue}, {event.city}</p>
          </div>

          <div className="ticket-box">
            <div className="ticket-header">
              <div>
                <h2>₹{event.price}</h2>
                <p>per ticket</p>
              </div>
              <div className="sold-info">
                <p>Tickets sold</p>
                <p className="percent">{event.soldPercent}</p>
              </div>
            </div>
            <div className="progress-bar">
              <div style={{width: event.soldPercent}}></div>
            </div>
            <p className="sold-text">{event.seatsSold} sold</p>
            <button className="book-btn">Book Tickets</button>
          </div>
        </div>
      </div>
    </div>
  )
}