import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        console.log(data);

        // Token आला असेल तर save होईल
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <div className="logo-box">EF</div>
        <h2>EventFlow</h2>
      </div>

      <h1 className="login-title">Welcome Back!!</h1>
      <br></br>
      <p>Sign in to continue to your account</p>

      <form onSubmit={handleLogin}>
        <label>Email Address</label>
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