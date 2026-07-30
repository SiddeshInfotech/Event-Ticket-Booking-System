from flask import Blueprint
from controllers.booking_controller import book_ticket, my_bookings, cancel_booking

booking_bp = Blueprint('booking', __name__)

booking_bp.add_url_rule('/book-ticket', view_func=book_ticket, methods=['POST'])
booking_bp.add_url_rule('/my-bookings', view_func=my_bookings, methods=['GET'])
booking_bp.add_url_rule('/cancel-booking/<id>', view_func=cancel_booking, methods=['DELETE'])

