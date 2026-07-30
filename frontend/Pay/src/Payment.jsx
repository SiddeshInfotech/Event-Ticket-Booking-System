import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Payment() {
    const navigate = useNavigate();

    const handlePayment = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/book-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: 1,
        number_of_tickets: 2,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      navigate("/booking-confirmed");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};

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
  onClick={handlePayment}
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