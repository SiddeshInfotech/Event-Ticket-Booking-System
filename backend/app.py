from flask import Flask
from routes.auth_routes import auth_bp
from routes.event_routes import event_bp
from routes.booking_routes import booking_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)

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