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
def post_comment(play_session_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment_to_add = Comment()
    if form.validate_on_submit():
        form.populate_obj(comment_to_add)
        db.session.add(comment_to_add)
        db.session.commit()
        return comment_to_add.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@play_session_routes.route('/<int:play_session_id>/comments/<int:comment_id>', methods=["PUT"])
@login_required
def put_comment(play_session_id, comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment_to_update = Comment.query.get(comment_id)
        form.populate_obj(comment_to_update)
        db.session.add(comment_to_update)
        db.session.commit()
        return comment_to_update.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@play_session_routes.route('/<int:play_session_id>/comments/<int:comment_id>', methods=["DELETE"])
@login_required
def delete_comment(play_session_id, comment_id):
    comment_to_delete = Comment.query.get(comment_id)
    db.session.delete(comment_to_delete)
    db.session.commit()
    return {'success': 'success'}
