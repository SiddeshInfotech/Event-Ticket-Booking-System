import os
import sqlite3
from flask_mysqldb import MySQL
import MySQLdb

mysql = MySQL()

# --- SQLite Fallback Implementation ---
USE_SQLITE_FALLBACK = False
sqlite_connection_singleton = None

class SQLiteCursor:
    def __init__(self, conn):
        self.conn = conn
        self.cur = conn.cursor()

    def execute(self, query, args=None):
        # Translate MySQL query syntax to SQLite
        query = query.replace("%s", "?")
        query = query.replace("AUTO_INCREMENT", "AUTOINCREMENT")
        query = query.replace("INT AUTOINCREMENT PRIMARY KEY", "INTEGER PRIMARY KEY AUTOINCREMENT")
        query = query.replace("INT AUTO_INCREMENT PRIMARY KEY", "INTEGER PRIMARY KEY AUTOINCREMENT")
        
        # Execute query
        if args:
            self.cur.execute(query, args)
        else:
            self.cur.execute(query)
        self.conn.commit()

    def fetchone(self):
        row = self.cur.fetchone()
        if row is not None:
            return dict(row)
        return None

    def fetchall(self):
        rows = self.cur.fetchall()
        return [dict(r) for r in rows]

    @property
    def lastrowid(self):
        return self.cur.lastrowid

    def close(self):
        self.cur.close()

class SQLiteConnection:
    def __init__(self, db_path):
        self.db_path = db_path
        self._conn = None

    def cursor(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return SQLiteCursor(conn)

    def commit(self):
        pass

    def close(self):
        pass

# Initialize SQLite Connection Singleton
sqlite_db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "local_event_booking.db")
sqlite_connection_singleton = SQLiteConnection(sqlite_db_path)

# Monkeypatch the connection property of flask_mysqldb.MySQL
original_connection_property = MySQL.connection

def get_connection(self):
    global USE_SQLITE_FALLBACK
    if USE_SQLITE_FALLBACK:
        return sqlite_connection_singleton
    try:
        return original_connection_property.__get__(self, MySQL)
    except Exception as e:
        print("Switching to SQLite Fallback due to connection error:", e)
        USE_SQLITE_FALLBACK = True
        init_sqlite_tables()
        return sqlite_connection_singleton

MySQL.connection = property(get_connection)

def init_sqlite_tables():
    conn = sqlite3.connect(sqlite_db_path)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS events (
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

    # NOTE: dummy user seeding removed — users are provided by seed_events.py
    conn.commit()
    cursor.close()
    conn.close()
    print("SQLite Fallback Database Initialized and Seeded Successfully!")


def init_db(app):
    global USE_SQLITE_FALLBACK
    host = app.config['MYSQL_HOST']
    port = app.config['MYSQL_PORT']
    user = app.config['MYSQL_USER']
    password = app.config['MYSQL_PASSWORD']
    db_name = app.config['MYSQL_DB']

    ssl_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ca (1).pem")

    connect_kwargs = {
        "host": host,
        "port": port,
        "user": user,
        "passwd": password,
        "db": db_name,
    }

    if os.path.exists(ssl_path) and host not in ['localhost', '127.0.0.1']:
        connect_kwargs["ssl_mode"] = "VERIFY_IDENTITY"
        connect_kwargs["ssl"] = {"ca": ssl_path}

    try:
        try:
            conn = MySQLdb.connect(**connect_kwargs)
        except Exception as ssl_err:
            if "ssl" in connect_kwargs:
                connect_kwargs.pop("ssl_mode", None)
                connect_kwargs.pop("ssl", None)
                conn = MySQLdb.connect(**connect_kwargs)
            else:
                raise ssl_err

        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS events (
            event_id INT AUTO_INCREMENT PRIMARY KEY,
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

        cursor.execute("SELECT * FROM users WHERE user_id = 101")
        dummy_user = cursor.fetchone()

        if not dummy_user:
            from werkzeug.security import generate_password_hash
            password_hash = generate_password_hash("dummy_password")
            cursor.execute("""
            INSERT INTO users
            (user_id, username, email, password_hash, role)
            VALUES
            (101, 'dummy_user', 'dummy@example.com', %s, 'organizer')
            """, (password_hash,))

        conn.commit()
        cursor.close()
        conn.close()
        print("Aiven Database Connected Successfully!")

    except Exception as e:
        print("Database Connection Error:")
        print(e)
        print("Activating SQLite fallback database...")
        USE_SQLITE_FALLBACK = True
        init_sqlite_tables()
