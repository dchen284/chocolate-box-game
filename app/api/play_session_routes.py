# External Imports
from flask import Blueprint, jsonify, request
from flask_login import login_required
# Internal Imports
from app.forms import CommentForm
from app.models import db, Comment, PlaySession


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

@play_session_routes.route('/<int:play_session_id>/comments', methods=["POST"])
@login_required
def post_comment_of_play_session(play_session_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment_to_add = Comment()
    print('@@@@@@@@@@@@', form.data)
    if form.validate_on_submit():
        form.populate_obj(comment_to_add)
        # print('~~~~~~~~~~~~', comment_to_add.to_dict())
        db.session.add(comment_to_add)
        db.session.commit()
        # print('^^^^^^^^^^^^^^', comment_to_add.to_dict())
        return jsonify(comment_to_add.to_dict())