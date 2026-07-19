from flask import jsonify

def register():
    return jsonify({
        "status": "success",
        "message": "User registered successfully",
        "data": {
            "user_id": 101,
            "username": "dummy_user",
            "email": "dummy@example.com"
        }
    }), 201

def login():
    return jsonify({
        "status": "success",
        "message": "User logged in successfully",
        "data": {
            "token": "dummy-jwt-token-xyz123",
            "user": {
                "user_id": 101,
                "username": "dummy_user"
            }
        }
    }), 200

def logout():
    return jsonify({
        "status": "success",
        "message": "User logged out successfully"
    }), 200
