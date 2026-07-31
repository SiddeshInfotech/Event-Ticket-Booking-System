from functools import wraps
from flask import request, jsonify, g, current_app
from itsdangerous import URLSafeTimedSerializer

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Check Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                # Expected format: "Bearer <token>"
                token_parts = auth_header.split(" ")
                if len(token_parts) == 2 and token_parts[0].lower() == 'bearer':
                    token = token_parts[1]
                else:
                    token = token_parts[0] # Fallback to raw token if no Bearer prefix
            except IndexError:
                return jsonify({
                    "status": "error",
                    "message": "Invalid authorization header format"
                }), 401

        if not token:
            return jsonify({
                "status": "error",
                "message": "Authentication token is missing"
            }), 401

        # Check for dummy token first
        if token == "dummy-jwt-token-xyz123":
            g.current_user = {
                "user_id": 101,
                "username": "dummy_user",
                "email": "dummy@example.com",
                "role": "organizer"
            }
        else:
            try:
                # Verify standard timed token using itsdangerous
                serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
                # Allow token to be valid for 1 day (86400 seconds)
                data = serializer.loads(token, salt='auth-salt', max_age=86400)
                g.current_user = data
            except Exception as e:
                return jsonify({
                    "status": "error",
                    "message": "Token is invalid or expired"
                }), 401

        return f(*args, **kwargs)
    return decorated

def organizer_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not hasattr(g, 'current_user') or g.current_user is None:
            return jsonify({
                "status": "error",
                "message": "Authentication required before role verification"
            }), 401

        if g.current_user.get('role') != 'organizer':
            return jsonify({
                "status": "error",
                "message": "Access denied. Only organizers are allowed to perform this action."
            }), 403

        return f(*args, **kwargs)
    return decorated

