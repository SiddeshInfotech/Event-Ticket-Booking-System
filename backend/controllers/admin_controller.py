from flask import jsonify

def get_dashboard_stats():
    return jsonify({
        "status": "success",
        "data": {
            "total_users": 150,
            "total_events": 5,
            "total_bookings": 320,
            "revenue": 15420.50
        }
    }), 200

def get_all_users():
    return jsonify({
        "status": "success",
        "data": {
            "users": [
                {
                    "user_id": 101,
                    "username": "dummy_user",
                    "email": "dummy@example.com",
                    "role": "user"
                },
                {
                    "user_id": 102,
                    "username": "admin_user",
                    "email": "admin@example.com",
                    "role": "admin"
                }
            ]
        }
    }), 200
