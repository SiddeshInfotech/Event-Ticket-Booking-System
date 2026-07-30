from flask import jsonify

def book_ticket():
    return jsonify({
        "status": "success",
        "message": "Ticket booked successfully",
        "data": {
            "booking_id": 5001,
            "event_id": 1,
            "user_id": 101,
            "number_of_tickets": 2,
            "total_price": 599.98,
            "booking_status": "confirmed"
        }
    }), 201

def my_bookings():
    return jsonify({
        "status": "success",
        "data": {
            "bookings": [
                {
                    "booking_id": 5001,
                    "event_id": 1,
                    "user_id": 101,
                    "number_of_tickets": 2,
                    "total_price": 599.98,
                    "booking_status": "confirmed"
                },
                {
                    "booking_id": 5002,
                    "event_id": 2,
                    "user_id": 101,
                    "number_of_tickets": 1,
                    "total_price": 120.00,
                    "booking_status": "pending"
                }
            ]
        }
    }), 200

def cancel_booking(id):
    # Dummy mock response checking for ID
    try:
        id_int = int(id)
    except ValueError:
        id_int = None

    if id_int not in [5001, 5002]:
        return jsonify({
            "status": "error",
            "message": f"Booking with ID {id} not found"
        }), 404

    return jsonify({
        "status": "success",
        "message": f"Booking {id} has been cancelled successfully"
    }), 200

