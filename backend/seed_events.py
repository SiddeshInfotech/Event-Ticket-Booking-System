"""
Reset seeder: DELETES the whole database and recreates it clean with
  - 2 users:  snehal (organizer) and komal (user)
  - 5 events  (owned by snehal, with banner images)

Run from the backend folder:  python seed_events.py
(Automatically run by `npm run setup` at the repo root.)
"""
import os
import sqlite3
from werkzeug.security import generate_password_hash

DB = os.path.join(os.path.dirname(__file__), "local_event_booking.db")

# user_id, username, email, password, role
USERS = [
    (1, "snehal", "snehalchaudhari552@gmail.com", "123", "organizer"),
    (2, "komal",  "komalchaudhari552@gmail.com",  "123", "user"),
]

ORGANIZER_ID = 1  # snehal owns the events

# title, description, category, location, date, start_time, price, tickets, status, banner_image
EVENTS = [
    ("Neon Nights Music Festival", "An electrifying night of live music featuring top DJs and bands from around the world.", "music",   "Jio World Garden, Mumbai",     "2026-10-25", "19:00", 250, 1243, "active", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&h=600&fit=crop"),
    ("NBA All-Stars Charity Match", "Watch your favorite NBA stars compete in a special charity exhibition game.",           "sports",  "Wankhede Stadium, Mumbai",     "2026-11-12", "20:00", 200, 4521, "active", "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&h=600&fit=crop"),
    ("Grand Art Exhibition",        "A curated showcase of contemporary art from over 200 artists across 15 countries.",    "arts",    "National Gallery, Delhi",      "2026-12-05", "10:00", 150,  634, "active", "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1600&h=600&fit=crop"),
    ("Brooklyn Comedy Night",       "A hilarious evening with the best stand-up comedians in the country.",                  "comedy",  "Shivaji Park, Dadar, Mumbai",  "2026-08-18", "20:00", 189,   87, "active", "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&h=600&fit=crop"),
    ("The Final Act",               "A powerful stage performance where every decision changes the ending.",                "theater", "Jehangir Art Gallery, Mumbai", "2026-08-15", "20:00", 269,   32, "active", "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&h=600&fit=crop"),
]


def main():
    # 1. Remove the whole existing database
    if os.path.exists(DB):
        os.remove(DB)

    conn = sqlite3.connect(DB)
    cur = conn.cursor()

    # 2. Recreate tables (same schema the app uses)
    cur.execute("""
        CREATE TABLE users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cur.execute("""
        CREATE TABLE events (
            event_id INTEGER PRIMARY KEY AUTOINCREMENT,
            organizer_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR(100) NOT NULL,
            location VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            start_time TIME NOT NULL,
            price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            available_tickets INT NOT NULL DEFAULT 0,
            status VARCHAR(50) NOT NULL DEFAULT 'draft',
            banner_image VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organizer_id) REFERENCES users(user_id) ON DELETE CASCADE
        )
    """)

    # 3. Insert the 2 users
    for uid, uname, email, pw, role in USERS:
        cur.execute(
            "INSERT INTO users (user_id, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)",
            (uid, uname, email, generate_password_hash(pw), role),
        )

    # 4. Insert the 5 events
    cur.executemany("""
        INSERT INTO events
            (organizer_id, title, description, category, location, date, start_time, price, available_tickets, status, banner_image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, [(ORGANIZER_ID, *e) for e in EVENTS])

    conn.commit()
    users = cur.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    events = cur.execute("SELECT COUNT(*) FROM events").fetchone()[0]
    conn.close()

    print(f"Database reset. Seeded {users} users and {events} events.")
    print("  organizer -> snehalchaudhari552@gmail.com / 123")
    print("  user      -> komalchaudhari552@gmail.com / 123")


if __name__ == "__main__":
    main()
