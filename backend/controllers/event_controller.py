import os
import uuid
from datetime import datetime
from flask import request, jsonify, g, current_app
from werkzeug.utils import secure_filename
from config.db import mysql

def get_events():
    organizer = getattr(g, 'current_user', None)
    if not organizer:
        return jsonify({
            "status": "error",
            "message": "Unauthorized. Please log in."
        }), 401

    organizer_id = organizer.get('user_id')
    role = organizer.get('role')

    cursor = None
    try:
        cursor = mysql.connection.cursor()
        if role == 'organizer':
            cursor.execute("""
                SELECT event_id, organizer_id, title, description, category, location, date, start_time, price, available_tickets, status, banner_image
                FROM events
                WHERE organizer_id = %s
            """, (organizer_id,))
        else:
            cursor.execute("""
                SELECT event_id, organizer_id, title, description, category, location, date, start_time, price, available_tickets, status, banner_image
                FROM events
            """)
        rows = cursor.fetchall()

        events = []
        for row in rows:
            events.append({
                "event_id": row['event_id'],
                "organizer_id": row['organizer_id'],
                "title": row['title'],
                "description": row['description'],
                "category": row['category'],
                "location": row['location'],
                "date": str(row['date']),
                "start_time": str(row['start_time']),
                "price": float(row['price']),
                "available_tickets": int(row['available_tickets']),
                "status": row['status'],
                "banner_image": row['banner_image']
            })

        return jsonify({
            "status": "success",
            "data": {
                "events": events
            }
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred while fetching events: {str(e)}"
        }), 500
    finally:
        if cursor:
            cursor.close()

def get_event(id):
    organizer = getattr(g, 'current_user', None)
    if not organizer:
        return jsonify({
            "status": "error",
            "message": "Unauthorized. Please log in."
        }), 401

    organizer_id = organizer.get('user_id')
    role = organizer.get('role')

    try:
        id_int = int(id)
    except ValueError:
        return jsonify({
            "status": "error",
            "message": f"Event with ID {id} not found"
        }), 404

    cursor = None
    try:
        cursor = mysql.connection.cursor()
        if role == 'organizer':
            cursor.execute("""
                SELECT event_id, organizer_id, title, description, category, location, date, start_time, price, available_tickets, status, banner_image
                FROM events
                WHERE event_id = %s AND organizer_id = %s
            """, (id_int, organizer_id))
        else:
            cursor.execute("""
                SELECT event_id, organizer_id, title, description, category, location, date, start_time, price, available_tickets, status, banner_image
                FROM events
                WHERE event_id = %s
            """, (id_int,))
        row = cursor.fetchone()


        if not row:
            return jsonify({
                "status": "error",
                "message": f"Event with ID {id} not found"
            }), 404

        event = {
            "event_id": row['event_id'],
            "organizer_id": row['organizer_id'],
            "title": row['title'],
            "description": row['description'],
            "category": row['category'],
            "location": row['location'],
            "date": str(row['date']),
            "start_time": str(row['start_time']),
            "price": float(row['price']),
            "available_tickets": int(row['available_tickets']),
            "status": row['status'],
            "banner_image": row['banner_image']
        }

        return jsonify({
            "status": "success",
            "data": {
                "event": event
            }
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred while fetching the event: {str(e)}"
        }), 500
    finally:
        if cursor:
            cursor.close()


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_date(date_str):
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def validate_time(time_str):
    for fmt in ('%H:%M:%S', '%H:%M'):
        try:
            datetime.strptime(time_str, fmt)
            return True
        except ValueError:
            pass
    return False

def create_event():
    organizer = getattr(g, 'current_user', None)
    if not organizer:
        return jsonify({
            "status": "error",
            "message": "Unauthorized. Please log in."
        }), 401

    organizer_id = organizer.get('user_id')

    if request.is_json:
        data = request.get_json() or {}
    else:
        data = request.form

    title = data.get('title')
    description = data.get('description')
    category = data.get('category')
    location = data.get('location')
    date_val = data.get('date')
    start_time_val = data.get('start_time')
    price_str = data.get('price')
    seats_str = data.get('available_tickets')
    status_val = data.get('status')

    errors = []
    if not title or not title.strip():
        errors.append("Event Name (title) is required")
    if not description or not description.strip():
        errors.append("Event Description is required")
    if not category or not category.strip():
        errors.append("Category is required")
    if not location or not location.strip():
        errors.append("Venue / Location is required")
    if not date_val:
        errors.append("Event Date is required")
    elif not validate_date(date_val):
        errors.append("Event Date must be in YYYY-MM-DD format")
    if not start_time_val:
        errors.append("Start Time is required")
    elif not validate_time(start_time_val):
        errors.append("Start Time must be in HH:MM or HH:MM:SS format")
    if price_str is None:
        errors.append("Ticket Price is required")
    else:
        try:
            price_val = float(price_str)
            if price_val < 0:
                errors.append("Ticket Price cannot be negative")
        except ValueError:
            errors.append("Ticket Price must be a valid number")
    if seats_str is None:
        errors.append("Total Available Seats (available_tickets) is required")
    else:
        try:
            seats_val = int(seats_str)
            if seats_val < 0:
                errors.append("Total Available Seats cannot be negative")
        except ValueError:
            errors.append("Total Available Seats must be an integer")
    if not status_val:
        errors.append("Status is required")
    elif status_val not in ['active', 'draft']:
        errors.append("Status must be 'active' or 'draft'")

    if errors:
        return jsonify({
            "status": "error",
            "message": "Validation failed",
            "errors": errors
        }), 400

    banner_image_path = data.get('banner_image') or None
    if 'banner_image' in request.files:
        file = request.files['banner_image']
        if file and file.filename != '':
            if allowed_file(file.filename):
                filename = secure_filename(file.filename)
                unique_filename = f"{uuid.uuid4().hex}_{filename}"
                upload_dir = os.path.join(current_app.root_path, 'static', 'uploads')
                os.makedirs(upload_dir, exist_ok=True)
                file.save(os.path.join(upload_dir, unique_filename))
                banner_image_path = f"/static/uploads/{unique_filename}"
            else:
                return jsonify({
                    "status": "error",
                    "message": "Invalid file format. Allowed extensions: png, jpg, jpeg, gif, webp"
                }), 400

    cursor = None
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("""
            INSERT INTO events (organizer_id, title, description, category, location, date, start_time, price, available_tickets, status, banner_image)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            organizer_id,
            title,
            description,
            category,
            location,
            date_val,
            start_time_val,
            price_val,
            seats_val,
            status_val,
            banner_image_path
        ))
        mysql.connection.commit()
        event_id = cursor.lastrowid

        return jsonify({
            "status": "success",
            "message": "Event created successfully",
            "data": {
                "event_id": event_id,
                "organizer_id": organizer_id,
                "title": title,
                "description": description,
                "category": category,
                "location": location,
                "date": str(date_val),
                "start_time": str(start_time_val),
                "price": float(price_val),
                "available_tickets": int(seats_val),
                "status": status_val,
                "banner_image": banner_image_path
            }
        }), 201

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred while creating the event: {str(e)}"
        }), 500
    finally:
        if cursor:
            cursor.close()

def update_event(id):
    organizer = getattr(g, 'current_user', None)
    if not organizer:
        return jsonify({
            "status": "error",
            "message": "Unauthorized. Please log in."
        }), 401

    organizer_id = organizer.get('user_id')

    try:
        id_int = int(id)
    except ValueError:
        return jsonify({
            "status": "error",
            "message": f"Event with ID {id} not found"
        }), 404

    cursor = None
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT organizer_id, banner_image FROM events WHERE event_id = %s", (id_int,))
        existing_event = cursor.fetchone()

        if not existing_event:
            return jsonify({
                "status": "error",
                "message": f"Event with ID {id} not found"
            }), 404

        if existing_event['organizer_id'] != organizer_id:
            return jsonify({
                "status": "error",
                "message": "Access denied. You are not the owner of this event."
            }), 403

        if request.is_json:
            data = request.get_json() or {}
        else:
            data = request.form

        title = data.get('title')
        description = data.get('description')
        category = data.get('category')
        location = data.get('location')
        date_val = data.get('date')
        start_time_val = data.get('start_time')
        price_str = data.get('price')
        seats_str = data.get('available_tickets')
        status_val = data.get('status')

        errors = []
        if not title or not title.strip():
            errors.append("Event Name (title) is required")
        if not description or not description.strip():
            errors.append("Event Description is required")
        if not category or not category.strip():
            errors.append("Category is required")
        if not location or not location.strip():
            errors.append("Venue / Location is required")
        if not date_val:
            errors.append("Event Date is required")
        elif not validate_date(date_val):
            errors.append("Event Date must be in YYYY-MM-DD format")
        if not start_time_val:
            errors.append("Start Time is required")
        elif not validate_time(start_time_val):
            errors.append("Start Time must be in HH:MM or HH:MM:SS format")
        if price_str is None:
            errors.append("Ticket Price is required")
        else:
            try:
                price_val = float(price_str)
                if price_val < 0:
                    errors.append("Ticket Price cannot be negative")
            except ValueError:
                errors.append("Ticket Price must be a valid number")
        if seats_str is None:
            errors.append("Total Available Seats (available_tickets) is required")
        else:
            try:
                seats_val = int(seats_str)
                if seats_val < 0:
                    errors.append("Total Available Seats cannot be negative")
            except ValueError:
                errors.append("Total Available Seats must be an integer")
        if not status_val:
            errors.append("Status is required")
        elif status_val not in ['active', 'draft']:
            errors.append("Status must be 'active' or 'draft'")

        if errors:
            return jsonify({
                "status": "error",
                "message": "Validation failed",
                "errors": errors
            }), 400

        banner_image_path = existing_event['banner_image']
        if data.get('banner_image'):
            banner_image_path = data.get('banner_image')
        if 'banner_image' in request.files:
            file = request.files['banner_image']
            if file and file.filename != '':
                if allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    unique_filename = f"{uuid.uuid4().hex}_{filename}"
                    upload_dir = os.path.join(current_app.root_path, 'static', 'uploads')
                    os.makedirs(upload_dir, exist_ok=True)
                    file.save(os.path.join(upload_dir, unique_filename))
                    banner_image_path = f"/static/uploads/{unique_filename}"
                else:
                    return jsonify({
                        "status": "error",
                        "message": "Invalid file format. Allowed extensions: png, jpg, jpeg, gif, webp"
                    }), 400

        cursor.execute("""
            UPDATE events 
            SET title = %s, description = %s, category = %s, location = %s, date = %s, start_time = %s, price = %s, available_tickets = %s, status = %s, banner_image = %s
            WHERE event_id = %s AND organizer_id = %s
        """, (
            title,
            description,
            category,
            location,
            date_val,
            start_time_val,
            price_val,
            seats_val,
            status_val,
            banner_image_path,
            id_int,
            organizer_id
        ))
        mysql.connection.commit()

        return jsonify({
            "status": "success",
            "message": "Event updated successfully",
            "data": {
                "event": {
                    "event_id": id_int,
                    "organizer_id": organizer_id,
                    "title": title,
                    "description": description,
                    "category": category,
                    "location": location,
                    "date": str(date_val),
                    "start_time": str(start_time_val),
                    "price": float(price_val),
                    "available_tickets": int(seats_val),
                    "status": status_val,
                    "banner_image": banner_image_path
                }
            }
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred while updating the event: {str(e)}"
        }), 500
    finally:
        if cursor:
            cursor.close()

def delete_event(id):
    organizer = getattr(g, 'current_user', None)
    if not organizer:
        return jsonify({
            "status": "error",
            "message": "Unauthorized. Please log in."
        }), 401

    organizer_id = organizer.get('user_id')

    try:
        id_int = int(id)
    except ValueError:
        return jsonify({
            "status": "error",
            "message": f"Event with ID {id} not found"
        }), 404

    cursor = None
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT organizer_id FROM events WHERE event_id = %s", (id_int,))
        existing_event = cursor.fetchone()

        if not existing_event:
            return jsonify({
                "status": "error",
                "message": f"Event with ID {id} not found"
            }), 404

        if existing_event['organizer_id'] != organizer_id:
            return jsonify({
                "status": "error",
                "message": "Access denied. You are not the owner of this event."
            }), 403

        cursor.execute("DELETE FROM events WHERE event_id = %s AND organizer_id = %s", (id_int, organizer_id))
        mysql.connection.commit()

        return jsonify({
            "status": "success",
            "message": "Event deleted successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred while deleting the event: {str(e)}"
        }), 500
    finally:
        if cursor:
            cursor.close()
