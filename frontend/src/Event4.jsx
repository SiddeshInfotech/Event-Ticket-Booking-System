import React from 'react';
import { Link } from 'react-router-dom';
import './Event4.css'; 

export default function Event4() {
  const event = {
    title: "Brooklyn Comedy Night",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=500&fit=crop",
    date: "Aug 18, 2026",
    time: "8:00 PM",
    seats: "87 seats left",
    category: "Comedy",
    venue: "Shivaji park Dadar,Mumbai",
    rating: "4.7",
    reviews: "5.0",
    organizer: "Comedy Kings",
    city: "Mumbai",
    price: "189",
    seatsSold: "313 sold",
    soldPercent: "78%",
    desc: "A hilarious evening with the best stand-up comedians in the country."
  };

  return (
    <div className="event4-page">
      <div className="event4-wrapper">
        <Link to="/" className="back-link">← Back To Events</Link>
        
        <div className="event4-hero">
          <img src={event.image} alt={event.title} />
          <div className="event4-overlay">
            <div className="badges">
              <span className="category-badge">{event.category}</span>
              <span className="rating-badge">⭐ {event.rating}</span>
            </div>
            <h1>{event.title}</h1>
          </div>
        </div>

        <div className="event4-content">
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