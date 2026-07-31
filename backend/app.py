import os
from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.event_routes import event_bp
from routes.booking_routes import booking_bp
from routes.admin_routes import admin_bp
from config.db import mysql, init_db

# Load environment variables from .env file if present
def load_env():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    key = key.strip()
                    val = val.strip().strip('"\'')
                    if key and not os.environ.get(key):
                        os.environ[key] = val

load_env()

app = Flask(__name__)
CORS(app)

# Application Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'event-ticket-booking-secret-key-12345')
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST', 'localhost')
app.config['MYSQL_PORT'] = int(os.environ.get('MYSQL_PORT', 11921))
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD', '')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB', 'event_booking')
app.config['MYSQL_CURSORCLASS'] = "DictCursor"

# Initialize MySQL
mysql.init_app(app)

# Initialize Database Schema & Seed Data
init_db(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(event_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(admin_bp)

@app.route("/")
def home():
    return "Event Ticket Booking System Backend Running!"

if __name__ == "__main__":
    app.run(debug=True)