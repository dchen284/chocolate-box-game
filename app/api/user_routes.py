from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Board, PlaySession, User

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()

@user_routes.route('/<int:user_id>/favorite_players')
@login_required
def get_favorite_players(user_id):
    user = User.query.get(user_id)
    return jsonify({'favorite_players': [user.to_dict() for user in user.favorite_players.all()]})

@user_routes.route('/<int:user_id>/favorite_players/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_favorite_player(favorite_id, user_id):
    user = User.query.get(user_id)
    unfavorite = User.query.get(favorite_id)
    user.favorite_players.remove(unfavorite)
    db.session.commit()
    return {'success': 'success'}

@user_routes.route('/<int:user_id>/favorite_players/', methods=['POST'])
@login_required
def add_favorite_player(user_id):
    favorite_id = request.get_json()
    user = User.query.get(user_id)
    favorite = User.query.get(favorite_id)
    if user.favorite_players.all().count(favorite) == 0:
        user.favorite_players.append(favorite)
    db.session.commit()
    return favorite.to_dict()

@user_routes.route('/<int:user_id>/play_sessions')
@login_required
def get_play_sessions_of_user(user_id):
    play_sessions = PlaySession.query.filter_by(user_id=user_id).all()
    if play_sessions:
        return {'play_sessions': [play_session.to_dict() for play_session in play_sessions]}
    else:
        return {'errors': ['404: This Player ID does not exist, please select Players from Favorites or Leaderboard']}, 404

@user_routes.route('/<int:user_id>/play_sessions', methods=["POST"])
@login_required
def post_new_play_session_of_user(user_id):

    board_id = request.get_json()

    # Get the Board for the new PlaySession
    board = Board.query.get(board_id)

    # Make the new PlaySession and add to database
    new_play_session = PlaySession(
        moves=board.initial_board_setup,
        tiles=board.initial_tiles,
        user_id=user_id,
        board_id=board_id,
    )
    db.session.add(new_play_session)
    db.session.commit()

    # Get the current user, set the user's current session to the new session's id
    current_user = User.query.get(user_id)
    current_user.current_session_id = new_play_session.id

    # return the new session
    return {'play_session': new_play_session.to_dict()}