# External imports
from flask import Blueprint, jsonify
from flask_login import login_required
# Internal imports
from app.models import Board

board_routes = Blueprint('boards', __name__)


@board_routes.route('')
@login_required
def get_boards():
    boards = Board.query.all()
    return jsonify("them boards yanno")
    # return jsonify({'boards': [board.to_dict() for board in boards]})