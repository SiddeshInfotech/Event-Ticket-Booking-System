from flask import Blueprint
from controllers.auth_controller import register, login, logout, forgot_password, change_password

auth_bp = Blueprint('auth', __name__)

auth_bp.add_url_rule('/register', view_func=register, methods=['POST'])
auth_bp.add_url_rule('/login', view_func=login, methods=['POST'])
auth_bp.add_url_rule('/logout', view_func=logout, methods=['POST'])

auth_bp.add_url_rule('/forgot-password', view_func=forgot_password, methods=['POST'])
auth_bp.add_url_rule('/change-password', view_func=change_password, methods=['PUT'])
