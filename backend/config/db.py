import os
import logging
from flask_mysqldb import MySQL
import MySQLdb

mysql = MySQL()

def init_db(app):
    host = app.config.get('MYSQL_HOST', 'localhost')
    user = app.config.get('MYSQL_USER', 'root')
    password = app.config.get('MYSQL_PASSWORD', '')
    db_name = app.config.get('MYSQL_DB', 'event_booking')

    try:
        # 1. Connect without database to ensure database exists
        conn = MySQLdb.connect(host=host, user=user, passwd=password)
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
        cursor.close()
        conn.close()

        # 2. Connect to the database and run schema queries
        conn = MySQLdb.connect(host=host, user=user, passwd=password, db=db_name)
        cursor = conn.cursor()

        # Create users table
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

        # Create events table
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

        # 3. Seed dummy organizer if not present
        cursor.execute("SELECT * FROM users WHERE user_id = 101")
        dummy_user = cursor.fetchone()
        if not dummy_user:
            from werkzeug.security import generate_password_hash
            password_hash = generate_password_hash('dummy_password')
            cursor.execute("""
                INSERT INTO users (user_id, username, email, password_hash, role)
                VALUES (101, 'dummy_user', 'dummy@example.com', %s, 'organizer')
            """, (password_hash,))
            conn.commit()

        cursor.close()
        conn.close()
        app.logger.info("Database initialized successfully!")
    except Exception as e:
        app.logger.warning(f"Database initialization failed: {e}. The app will start but database queries may fail.")
