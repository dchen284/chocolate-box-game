from flask import Blueprint, jsonify
from flask_login import login_required

board_routes = Blueprint('boards', __name__)


@board_routes.route('')
@login_required
def get_boards():
    return jsonify('buncha boards here')