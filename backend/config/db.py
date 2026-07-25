import os
from flask_mysqldb import MySQL
import MySQLdb

mysql = MySQL()

def init_db(app):
    host = app.config['MYSQL_HOST']
    port = app.config['MYSQL_PORT']
    user = app.config['MYSQL_USER']
    password = app.config['MYSQL_PASSWORD']
    db_name = app.config['MYSQL_DB']

    ssl_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ca (1).pem")

    try:
        conn = MySQLdb.connect(
            host=host,
            port=port,
            user=user,
            passwd=password,
            db=db_name,
            ssl_mode="VERIFY_IDENTITY",
            ssl={
                "ca": ssl_path
            }
        )

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