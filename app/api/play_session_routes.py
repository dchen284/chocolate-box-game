from flask import Blueprint, jsonify
from flask_login import login_required

play_session_routes = Blueprint('play_sessions', __name__)


@play_session_routes.route('')
@login_required
def get_play_sessions():
    return jsonify('get 7777777 play sessions here')