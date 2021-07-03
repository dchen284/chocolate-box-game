# External imports
from flask import Blueprint, jsonify
from flask_login import login_required
# Internal imports
from app.models import Board, PlaySession

board_routes = Blueprint('boards', __name__)


@board_routes.route('')
@login_required
def get_boards():
    boards = Board.query.all()
    return {'boards': [board.to_dict() for board in boards]}

@board_routes.route('/<int:board_id>/play_sessions')
@login_required
def get_play_sessions_by_board(board_id):
    play_sessions = PlaySession.query.filter_by(board_id=board_id).all()
    if play_sessions:
        return {'play_sessions': [play_session.to_dict() for play_session in play_sessions]}
    else:
        return {'errors': ['404: This Board ID does not exist, please select Boards from the Navigation Bar up top.']}, 404