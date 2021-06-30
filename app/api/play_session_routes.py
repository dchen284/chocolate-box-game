# External Imports
from flask import Blueprint, jsonify
from flask_login import login_required

# Internal Imports
from app.models import Comment, PlaySession

play_session_routes = Blueprint('play_sessions', __name__)


@play_session_routes.route('')
@login_required
def get_play_sessions():
    return jsonify('get 7777777 play sessions here')


@play_session_routes.route('/<int:play_session_id>/comments')
@login_required
def get_comments_of_play_session(play_session_id):
    comments = Comment.query.filter(Comment.play_session_id == play_session_id)
    return jsonify({'comments': [comment.to_dict() for comment in comments]})