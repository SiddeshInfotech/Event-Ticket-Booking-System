from flask import Blueprint
from controllers.auth_controller import register, login, logout

auth_bp = Blueprint('auth', __name__)

auth_bp.add_url_rule('/register', view_func=register, methods=['POST'])
auth_bp.add_url_rule('/login', view_func=login, methods=['POST'])
auth_bp.add_url_rule('/logout', view_func=logout, methods=['POST'])
