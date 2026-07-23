import React, { useState } from "react";
import "./FinalAct.css";

const FinalAct = () => {
  const [ticketType, setTicketType] = useState("General");
  const [quantity, setQuantity] = useState(1);

  const prices = {
    General: 269,
    VIP: 179,
  };

  const ticketPrice = prices[ticketType];
  const subtotal = ticketPrice * quantity;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const increase = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="page">
      <div className="container">
        <p className="back">← Back to Events</p>

        <h1>Book Tickets</h1>

        <div className="card">
          <h2>The Final Act</h2>
          <p>15 Ayg, 2026 • 8:00 PM</p>
          <p>Jehangir Art Gallery, Mumbai</p>
        </div>

        <div className="card">
          <h2>Select Ticket Type</h2>

          <div className="ticket-options">
            <button
              className={ticketType === "General" ? "active" : ""}
              onClick={() => setTicketType("General")}
            >
              General
              <span>₹269</span>
            </button>

            <button
              className={ticketType === "VIP" ? "active" : ""}
              onClick={() => setTicketType("VIP")}
            >
              VIP
              <span>₹179</span>
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Number of Tickets</h2>

          <div className="counter">
            <button onClick={decrease}>−</button>

            <span>{quantity}</span>

            <button onClick={increase}>+</button>

            <small>max 10 per booking</small>
          </div>
        </div>

        <div className="summary">
          <h2>Booking Summary</h2>

          <div className="row">
            <span>{ticketType} Admission × {quantity}</span>
            <span>${subtotal}</span>
          </div>

          <div className="row">
            <span>Service Fee (5%)</span>
            <span>${serviceFee}</span>
          </div>

          <hr />

          <div className="total">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button className="payment-btn">
            Continue To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalAct;