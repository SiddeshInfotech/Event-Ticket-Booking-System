import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function CreateAccount() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${firstName} ${lastName}`,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully");
        console.log(data);
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Create your account</h1>
        <p>Start discovering amazing events today</p>
      </div>

      <div className="form-box">

        <form onSubmit={handleRegister}>

          <div className="row">
            <div className="group">
              <label>First Name</label>
              <div className="input-box">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder=""
                  required
                />
              </div>
            </div>

            <div className="group">
              <label>Last Name</label>
              <div className="input-box">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder=""
                  required
                />
              </div>
            </div>
          </div>

          <div className="group">
            <label>Email</label>
            <div className="input-box">
              <i className="fa-regular fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="group">
            <label>Phone Number</label>
            <div className="input-box">
              <i className="fa-solid fa-phone"></i>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
              />
            </div>
          </div>

          <div className="group">
            <label>Password</label>
            <div className="input-box">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="group">
            <label>Confirm Password</label>
            <div className="input-box">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="checkbox">
            <input type="checkbox" required />
            <br></br>
            <span>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </div>

          <button type="submit">Create Account</button>

        </form>

      </div>

      <div className="bottom">
        Already have an account? <Link to="/">Sign In</Link>
      </div>
    </div>
  );
}

export default CreateAccount;