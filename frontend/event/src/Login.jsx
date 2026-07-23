import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Login() {
  return (
    <div className="login-container">
      <div className="logo">
        <div className="logo-box">EF</div>
        <h2>EventFlow</h2>
      </div>

      <h1 className="login-title">Welcome Back!!</h1>
      <br></br>
      <p>Sign in to continue to your account</p>

      <form>
        <label>Email Address</label>
        <div className="input-box">
          <i className="fa-regular fa-envelope"></i>
          <input type="email" placeholder="" />
        </div>

        <label>Password</label>
        <div className="input-box">
          <i className="fa-solid fa-lock"></i>
          <input type="password" placeholder="" />
        </div>

        <div className="options">
          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit">Sign In</button>
      </form>

      <div className="register">
        Don't have an account? <a href="/"></a>
        <Link to="/create-account">Create Account</Link>
      </div>
    </div>
  );
}

export default Login;