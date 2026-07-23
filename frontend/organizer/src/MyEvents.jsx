import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

function MyEvents() {
   const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const events = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",
      name: "Neon Nights Music Festival",
      sold: "3,757 / 5,000 sold (75%)",
      date: "25 Oct, 2026",
      category: "Music",
      price: "$89",
      seats: "1,243 left",
      status: "Active",
    },
    {
      id: 2,
      image: "https://picsum.photos/70?2",
      name: "Tech Summit 2026",
      sold: "1,542 / 2,000 sold (77%)",
      date: "3 Sept, 2026",
      category: "Technology",
      price: "$299",
      seats: "458 left",
      status: "Active",
    },
    {
      id: 3,
      image: "https://picsum.photos/70?3",
      name: "Culinary Arts Weekend",
      sold: "488 / 800 sold (61%)",
      date: "20 Jul, 2026",
      category: "Food",
      price: "$65",
      seats: "312 left",
      status: "Active",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070",
      name: "Brooklyn Comedy Night",
      sold: "313 / 400 sold (78%)",
      date: "18 Aug, 2026",
      category: "Comedy",
      price: "$45",
      seats: "87 left",
      status: "Active",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2070",
      name: "Grand Art Exhibition",
      sold: "566 / 1200 sold (47%)",
      date: "5 Dec, 2026",
      category: "Arts",
      price: "$35",
      seats: "634 left",
      status: "Active",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070",
      name: "NBA All-Stars Charity Match",
      sold: "15479 / 20000 sold (77%)",
      date: "12 Nov, 2026",
      category: "Sports",
      price: "$120",
      seats: "4521 left",
      status: "Active",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="myevents-page">

      <div className="page-header">
        <div>
          <h1>My Events</h1>
          <br></br>
          <p>6 events total</p>
        </div>

        <button
  className="new-event-btn"
  onClick={() => navigate("/createevent")}
>
  <FaPlus /> New Event
</button>
      </div>

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Category</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredEvents.map((event) => (

              <tr key={event.id}>

                <td>

                  <div className="event-info">

                    <img
                      src={event.image}
                      alt={event.name}
                    />

                    <div>

                      <h4>{event.name}</h4>

                      <p>{event.sold}</p>

                    </div>

                  </div>

                </td>

                <td>{event.date}</td>

                <td>
                  <span className="category">
                    {event.category}
                  </span>
                </td>

                <td className="price">
                  {event.price}
                </td>

                <td>{event.seats}</td>

                <td>
                  <span className="status">
                    {event.status}
                  </span>
                </td>

                <td>

                  <div className="actions">

                    <FaEye className="view" />

                    <FaEdit className="edit" />

                    <FaTrash className="delete" />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MyEvents;