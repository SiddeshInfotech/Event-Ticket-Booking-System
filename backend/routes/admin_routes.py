from flask import Blueprint
from controllers.admin_controller import get_dashboard_stats, get_all_users

admin_bp = Blueprint('admin', __name__)

admin_bp.add_url_rule('/admin/dashboard', view_func=get_dashboard_stats, methods=['GET'])
admin_bp.add_url_rule('/admin/users', view_func=get_all_users, methods=['GET'])