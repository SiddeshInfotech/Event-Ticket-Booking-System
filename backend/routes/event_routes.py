from flask import Blueprint
from controllers.event_controller import get_events, get_event, create_event, update_event, delete_event
from middleware.auth import token_required

event_bp = Blueprint('event', __name__)

event_bp.add_url_rule('/events', view_func=token_required(get_events), methods=['GET'])
event_bp.add_url_rule('/events', view_func=token_required(create_event), methods=['POST'])
event_bp.add_url_rule('/events/<int:id>', view_func=token_required(get_event), methods=['GET'])
event_bp.add_url_rule('/events/<int:id>', view_func=token_required(update_event), methods=['PUT'])
event_bp.add_url_rule('/events/<int:id>', view_func=token_required(delete_event), methods=['DELETE'])

