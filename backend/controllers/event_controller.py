from flask import jsonify

def get_events():
    return jsonify({
        "status": "success",
        "data": {
            "events": [
                {
                    "event_id": 1,
                    "title": "Tech Conference 2026",
                    "description": "Learn about the future of tech.",
                    "date": "2026-09-15",
                    "location": "San Francisco, CA",
                    "price": 299.99,
                    "available_tickets": 150
                },
                {
                    "event_id": 2,
                    "title": "Music Festival 2026",
                    "description": "A weekend of live music.",
                    "date": "2026-10-05",
                    "location": "Austin, TX",
                    "price": 120.00,
                    "available_tickets": 500
                }
            ]
        }
    }), 200

def get_event(id):
    try:
        id_int = int(id)
    except ValueError:
        id_int = None

    if id_int not in [1, 2]:
        return jsonify({
            "status": "error",
            "message": f"Event with ID {id} not found"
        }), 404

    return jsonify({
        "status": "success",
        "data": {
            "event": {
                "event_id": id_int,
                "title": f"Mock Event {id}",
                "description": "This is a detailed description of the mock event.",
                "date": "2026-11-20",
                "location": "New York, NY",
                "price": 99.99,
                "available_tickets": 200
            }
        }
    }), 200


def create_event():
    return jsonify({
        "status": "success",
        "message": "Event created successfully",
        "data": {
            "event_id": 3,
            "title": "Newly Created Event",
            "description": "Description of the newly created event.",
            "date": "2026-12-01",
            "location": "Remote",
            "price": 0.00,
            "available_tickets": 1000
        }
    }), 201
