# Event Ticket Booking System (EventFlow)

Monorepo — **Flask backend** + **React (Vite) frontend**, wired together.

```
EventTicketBookingSystem/
├── package.json      # monorepo commands (setup / start)
├── scripts/          # setup + start orchestration
├── backend/          # Flask API (Python)
└── frontend/         # React + Vite app
```

## Requirements
- **Node.js 18+**
- **Python 3.10+**

## 1. Setup (one command)

From this folder:

```bash
npm run setup
```

This will:
1. create the Python virtual environment (`backend/venv`)
2. install backend dependencies (`requirements.txt`)
3. **reset the database** and seed it with 2 users + 5 events
4. install frontend dependencies (`npm install`)

## 2. Start everything (one command)

```bash
npm start
```

- Backend → http://localhost:5000
- Frontend → http://localhost:5173

Press **Ctrl+C** once to stop both.

Open http://localhost:5173 and log in.

## Seeded logins

| Role      | Email                          | Password |
|-----------|--------------------------------|----------|
| Organizer | snehalchaudhari552@gmail.com   | `123`    |
| User      | komalchaudhari552@gmail.com    | `123`    |

- **snehal (organizer)** owns the 5 events → can create / edit / delete them.
- **komal (user)** can browse all events, book tickets, and view/cancel bookings.

## Reset the data again anytime

```bash
npm run seed
```

Wipes the DB and re-seeds the same 2 users + 5 events.

---

### API endpoints

| Group   | Endpoint |
|---------|----------|
| Auth    | `POST /register`, `POST /login`, `POST /logout` |
| Events  | `GET /events`, `GET /events/:id`, `POST /events`, `PUT /events/:id`, `DELETE /events/:id` |
| Booking | `POST /book-ticket`, `GET /my-bookings`, `DELETE /cancel-booking/:id` |

> Booking endpoints return mock data (the UI is fully wired, but bookings do not persist yet).

### Database
Uses a local **SQLite** file (`backend/local_event_booking.db`) by default, created fresh on setup.
To use MySQL instead, edit `backend/.env`.
