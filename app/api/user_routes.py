from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:user_id>/favorite_players')
@login_required
def get_favorite_players(user_id):
    user = User.query.get(user_id)
    print('####', user)
    return jsonify({'favorite_players': [user.to_dict() for user in user.favorite_players.all()]})

# @user_routes.route('/<int:user_id>/favorite_players', methods=['POST'])
# @login_required
# def post_favorite_player():
#     user = User.query.get(user_id)

@user_routes.route('/<int:user_id>/favorite_players/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_favorite_player(favorite_id, user_id):
    print('theretheretherethere')
    user = User.query.get(user_id)
    unfavorite = User.query.get(favorite_id)
    # print(user.favorite_players.all())
    user.favorite_players.remove(unfavorite)
    # print(user.favorite_players.all())
    db.session.commit()
    return {'success': 'success'}

@user_routes.route('/<int:user_id>/favorite_players/', methods=['POST'])
@login_required
def add_favorite_player(user_id):
    print('addaddadd')
    favorite_id = request.get_json()
    user = User.query.get(user_id)
    favorite = User.query.get(favorite_id)
    # print(user.favorite_players.all())
    # print('++++++++++++++++++', dir(user.favorite_players))
    if user.favorite_players.all().count(favorite) == 0:
        user.favorite_players.append(favorite)
    # print(user.favorite_players.all())
    db.session.commit()
    return favorite.to_dict()