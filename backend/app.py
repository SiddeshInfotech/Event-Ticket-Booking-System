import os
from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.event_routes import event_bp
from routes.booking_routes import booking_bp
from routes.admin_routes import admin_bp
from config.db import mysql, init_db

app = Flask(__name__)
CORS(app)

# Application Configuration
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
app.config['MYSQL_PORT'] = int(os.environ.get('MYSQL_PORT', 11921))
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')


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