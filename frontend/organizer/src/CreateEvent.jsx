import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

function CreateEvent() {
  const [banner, setBanner] = useState(null);

const handleFile = (e) => {
  const file = e.target.files[0];

  if (file) {
    setBanner(URL.createObjectURL(file));
  }
};
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    category: "Music",
    location: "",
    date: "",
    time: "",
    price: "0.00",
    seats: "500",
    banner: null
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }


  const handleSubmit = (e, type) => {
    e.preventDefault();
    alert(`${type}: ${formData.eventName}`);
    console.log(formData);
  }

  return (
    <div className="page-wrapper">
      <a href="/">← Back to My Events</a>
      <h1 className="title">Create New Event</h1>

      <div className="form-card">
        <form>
          {/* Banner Upload */}
          <div className="form-group">
            <label>Event Banner Image</label>
            <div className="upload-box">
              <input type="file" id="banner" accept="image/*" onChange={handleFile} hidden/>
              <label htmlFor="banner" className="upload-label">
  {banner ? (
    <img
      src={banner}
      alt="Banner"
      style={{
        width: "100%",
        height: "200px",
        objectFit: "cover",
      }}
    />
  ) : (
    <>
      <div className="upload-icon">🖼️</div>
      <p><b>Click to upload or drag & drop</b></p>
      <span>PNG, JPG or WebP — max 10MB</span>
    </>
  )}
</label>
            </div>
          </div>

          {/* Event Name */}
          <div className="form-group">
            <label>Event Name</label>
            <input type="text" name="eventName" placeholder="e.g. Summer Music Festival 2026" value={formData.eventName} onChange={handleChange}/>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Event Description</label>
            <textarea name="description" rows="4" placeholder="Describe your event in detail — what attendees can expect, who should attend, what makes it special..." value={formData.description} onChange={handleChange}></textarea>
          </div>

          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option>Music</option>
                <option>Tech</option>
                <option>Sports</option>
                <option>Art</option>
              </select>
            </div>
            <div className="form-group">
              <label>Venue / Location</label>
              <input type="text" name="location" placeholder="📍 e.g. Madison Square Garden, New York" value={formData.location} onChange={handleChange}/>
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange}/>
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Ticket Price (USD)</label>
              <input type="number" name="price" placeholder="🏷️ 0.00" value={formData.price} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Total Available Seats</label>
              <input type="number" name="seats" placeholder="👤 500" value={formData.seats} onChange={handleChange}/>
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <button className="btn-publish" onClick={(e) => handleSubmit(e, "Published")}>+ Publish Event</button>
            <button className="btn-draft" onClick={(e) => handleSubmit(e, "Draft Saved")}>Save as Draft</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;