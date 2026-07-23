import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Payment() {
    const navigate = useNavigate();
  return (
    <div className="payment-page">
      <div className="payment-container">

        <p className="back">← Back to booking</p>

        <h1>Secure Payment</h1>

        <div className="payment-box">

          <h2>Payment Method</h2>

          <div className="method-buttons">
            <button>Credit Card</button>
            <button>Phone Pay</button>
            <button>Google Pay</button>
          </div>

          <label>Cardholder name</label>
          <input
            type="text"
            placeholder=""
          />

          <label>Card number</label>
          <input
            type="text"
            placeholder=""
          />

          <label>Expiry date</label>
          <input
            type="text"
            placeholder=""
          />

          <div className="summary">

            <h3>Order Summary</h3>

            <div className="row">
              <span>Subtotal</span>
              <span>₹178</span>
            </div>

            <div className="row">
              <span>Service fee</span>
              <span>₹9</span>
            </div>

            <hr />

            <div className="row total">
              <span>Total</span>
              <span>₹187</span>
            </div>

            <button
  className="pay-btn"
  onClick={() => navigate("/booking-confirmed")}
>
  Pay ₹624
</button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Payment;