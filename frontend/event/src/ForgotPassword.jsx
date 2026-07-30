import React, { useState } from "react";
import "./App.css";

function ForgotPassword() {
    const [current, setCurrent] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [currentType, setCurrentType] = useState("password");
const [newType, setNewType] = useState("password");
const [confirmType, setConfirmType] = useState("password");

const [newError, setNewError] = useState(false);
const [matchError, setMatchError] = useState(false);
const [successMsg, setSuccessMsg] = useState(false);
const [signoutMsg, setSignoutMsg] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
};

const handleSignOut = () => {
  setSignoutMsg(true);
};
    return (
    <div className="container">
      <div className="card">
        <h2 classname="password-title">Change Password</h2>

        <form onSubmit={handleSubmit}>
          <label>Current password</label>
          <div className="input-wrap">
            <input
              type={currentType}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
            />
            <span
              className="toggle"
              onClick={() =>
                setCurrentType(
                  currentType === "password" ? "text" : "password"
                )
              }
            >
              {currentType === "password" ? "" : "Hide"}
            </span>
          </div>

          <label>New password</label>
          <div className="input-wrap">
            <input
              type={newType}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="toggle"
              onClick={() =>
                setNewType(newType === "password" ? "text" : "password")
              }
            >
              {newType === "password" ? "" : "Hide"}
            </span>
          </div>

          {newError && (
            <div className="error">
              Min 8 chars, 1 uppercase, 1 number, 1 symbol
            </div>
          )}

          <label>Confirm new password</label>
          <div className="input-wrap">
            <input
              type={confirmType}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle"
              onClick={() =>
                setConfirmType(
                  confirmType === "password" ? "text" : "password"
                )
              }
            >
              {confirmType === "password" ? "" : "Hide"}
            </span>
          </div>

          {matchError && (
            <div className="error">Passwords don't match</div>
          )}

          <button className="btn-primary" type="submit">
            Update Password
          </button>

          {successMsg && (
            <div className="success">
              Password updated successfully!
            </div>
          )}
        </form>
      </div>

      <div className="card">
        <h2>Sign Out</h2>

        <div className="signout-row">
          <br></br>
          <p className="signout-text">
            You will be logged out of all sessions.
          </p>

          <button className="btn-danger" onClick={handleSignOut}>
</button>

        </div>

        {signoutMsg && (
          <div className="success">
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;