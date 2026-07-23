import React from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./App.css";

function BookingConfirmed() {
    const navigate = useNavigate();
  return (
    <div className="booking-page">

      {/* Back Button */}
      <div className="back-btn" >
        <FaArrowLeft /> <span>Back to Home</span>
      </div>

      {/* Success Icon */}
      <div className="success-section">
        <div className="success-icon">
          <FaCheck />
        </div>
        <h1>Booking Confirmed!</h1>
      </div>

      {/* Booking Card */}
      <div className="booking-card">
        <div className="booking-header">
          <h2>Booking ID</h2>
          <span>BK-2026-7891</span>
        </div>

        <hr />

        <div className="event-details">
          <h3>Neon Nights Music Festival</h3>
          <p>Aug 15, 2026 • 6:00 PM</p>
          <p>Riverside Amphitheater, Austin TX</p>
          <p>2 × General Admission</p>
        </div>

        <hr />

        <div className="payment">
          <h2>Total Paid</h2>
          <span>₹187</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button>View QR Code</button>
        <button>Download</button>
        <button>
          My Bookings
        </button>
      </div>

      <button
  className="home-btn"
  onClick={() => navigate("/")}
>
  Back To Home
</button>

    </div>
  );
}

export default BookingConfirmed;