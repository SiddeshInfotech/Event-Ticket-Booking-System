from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer
from config.db import mysql
import MySQLdb

def register():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')

    if not username or not email or not password:
        return jsonify({
            "status": "error",
            "message": "Username, email, and password are required fields"
        }), 400

    if role not in ['user', 'organizer', 'admin']:
        return jsonify({
            "status": "error",
            "message": "Invalid role specified"
        }), 400

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT user_id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            cursor.close()
            return jsonify({
                "status": "error",
                "message": "Email is already registered"
            }), 400

        password_hash = generate_password_hash(password)
        cursor.execute(
            "INSERT INTO users (username, email, password_hash, role) VALUES (%s, %s, %s, %s)",
            (username, email, password_hash, role)
        )
        mysql.connection.commit()
        user_id = cursor.lastrowid
        cursor.close()

        return jsonify({
            "status": "success",
            "message": "User registered successfully",
            "data": {
                "user_id": user_id,
                "username": username,
                "email": email,
                "role": role
            }
        }), 201

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred during registration: {str(e)}"
        }), 500

def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({
            "status": "error",
            "message": "Email and password are required fields"
        }), 400

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT user_id, username, email, password_hash, role FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({
                "status": "error",
                "message": "Invalid email or password"
            }), 401

        serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
        token = serializer.dumps({
            "user_id": user['user_id'],
            "username": user['username'],
            "email": user['email'],
            "role": user['role']
        }, salt='auth-salt')

        return jsonify({
            "status": "success",
            "message": "User logged in successfully",
            "data": {
                "token": token,
                "user": {
                    "user_id": user['user_id'],
                    "username": user['username'],
                    "email": user['email'],
                    "role": user['role']
                }
            }
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred during login: {str(e)}"
        }), 500

def logout():
    return jsonify({
        "status": "success",
        "message": "User logged out successfully"
    }), 200

def forgot_password():
    data = request.get_json() or {}
    email = data.get('email')

    if not email:
        return jsonify({
            "status": "error",
            "message": "Email is required"
        }), 400

    try:
        cursor = mysql.connection.cursor()
        cursor.execute(
            "SELECT user_id FROM users WHERE email = %s",
            (email,)
        )
        user = cursor.fetchone()
        cursor.close()

        if not user:
            return jsonify({
                "status": "error",
                "message": "Email not found"
            }), 404

        return jsonify({
            "status": "success",
            "message": "Email verified successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


def change_password():
    data = request.get_json() or {}

    email = data.get('email')
    new_password = data.get('new_password')

    if not email or not new_password:
        return jsonify({
            "status": "error",
            "message": "Email and new password are required"
        }), 400

    try:
        cursor = mysql.connection.cursor()

        cursor.execute(
            "SELECT user_id FROM users WHERE email = %s",
            (email,)
        )

        user = cursor.fetchone()

        if not user:
            cursor.close()
            return jsonify({
                "status": "error",
                "message": "User not found"
            }), 404

        password_hash = generate_password_hash(new_password)

        cursor.execute(
            "UPDATE users SET password_hash = %s WHERE email = %s",
            (password_hash, email)
        )

        mysql.connection.commit()
        cursor.close()

        return jsonify({
            "status": "success",
            "message": "Password changed successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

