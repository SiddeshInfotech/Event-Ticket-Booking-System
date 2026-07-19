from flask import Blueprint
from controllers.event_controller import get_events, get_event, create_event

event_bp = Blueprint('event', __name__)

event_bp.add_url_rule('/events', view_func=get_events, methods=['GET'])
event_bp.add_url_rule('/events', view_func=create_event, methods=['POST'])
event_bp.add_url_rule('/events/<id>', view_func=get_event, methods=['GET'])

