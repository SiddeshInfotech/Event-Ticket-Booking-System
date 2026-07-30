import React, { useState } from "react";
import "./GAExhi.css";

const GAExhi = () => {
  const [ticketType, setTicketType] = useState("General");
  const [quantity, setQuantity] = useState(1);

  const prices = {
    General: 150,
    VIP: 100,
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

  const continueToPayment = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/book-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: 3,
        number_of_tickets: quantity,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      window.location.href = "/payment";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};

  return (
    <div className="page">
      <div className="container">
        <p className="back">← Back to Events</p>

        <h1>Book Tickets</h1>

        <div className="card">
          <h2>Grand Art Exhibition</h2>
          <p>5 Dec, 2026 • 10:00 AM</p>
          <p>National Gallery, Delhi</p>
        </div>

        <div className="card">
          <h2>Select Ticket Type</h2>

          <div className="ticket-options">
            <button
              className={ticketType === "General" ? "active" : ""}
              onClick={() => setTicketType("General")}
            >
              General
              <span>₹150</span>
            </button>

            <button
              className={ticketType === "VIP" ? "active" : ""}
              onClick={() => setTicketType("VIP")}
            >
              VIP
              <span>₹100</span>
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
            <span>₹{subtotal}</span>
          </div>

          <div className="row">
            <span>Service Fee (5%)</span>
            <span>₹{serviceFee}</span>
          </div>

          <hr />

          <div className="total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
<button
  className="payment-btn"
  onClick={continueToPayment}
>
  Continue To Payment
</button>
        </div>
      </div>
    </div>
  );
};

export default GAExhi;