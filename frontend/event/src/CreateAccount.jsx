import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function CreateAccount() {
  return (
    <div className="container">
      <div className="heading">
        <h1>Create your account</h1>
        <p>Start discovering amazing events today</p>
      </div>

      <div className="form-box">
        <div className="row">
          <div className="group">
            <label>First Name</label>
            <div className="input-box">
              <i className="fa-regular fa-user"></i>
              <input type="text" placeholder="" />
            </div>
          </div>

          <div className="group">
            <label>Last Name</label>
            <div className="input-box">
              <i className="fa-regular fa-user"></i>
              <input type="text" placeholder="" />
            </div>
          </div>
        </div>

        <div className="group">
          <label>Email</label>
          <div className="input-box">
            <i className="fa-regular fa-envelope"></i>
            <input type="email" placeholder="" />
          </div>
        </div>

        <div className="group">
          <label>Phone Number</label>
          <div className="input-box">
            <i className="fa-solid fa-phone"></i>
            <input type="tel" placeholder="" />
          </div>
        </div>

        <div className="group">
          <label>Password</label>
          <div className="input-box">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="" />
          </div>
        </div>

        <div className="group">
          <label>Confirm Password</label>
          <div className="input-box">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="" />
          </div>
        </div>

        <div className="checkbox">
          <input type="checkbox" />
          <br></br>
          <span>
            I agree to the Terms of Service and Privacy Policy
          </span>
        </div>

        <button>Create Account</button>
      </div>

      <div className="bottom">
        Already have an account? <a href="/">Sign In</a>
      </div>
    </div>
  );
}

export default CreateAccount;