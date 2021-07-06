# External Imports
import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required
# Internal Imports
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import CommentForm
from app.models import db, Comment, PlaySession


play_session_routes = Blueprint('play_sessions', __name__)


@play_session_routes.route('/<int:play_session_id>')
@login_required
def get_play_session_by_id(play_session_id):
    play_session = PlaySession.query.get(play_session_id)
    return {'play_session': play_session.to_dict()}

@play_session_routes.route('/<int:play_session_id>', methods=["PUT"])
@login_required
def update_play_session(play_session_id):
    data = request.get_json()
    # print('data', data)
    play_session = PlaySession.query.get(play_session_id)

    #update the session
    play_session.score = data['score']
    play_session.moves = data['moves']
    play_session.tiles = data['tiles']
    play_session.timestamp = datetime.datetime.now(tz=None)

    db.session.commit()

    return {'play_session': play_session.to_dict()}


@play_session_routes.route('/<int:play_session_id>/comments')
@login_required
def get_comments_of_play_session(play_session_id):
    comments = Comment.query.filter(Comment.play_session_id == play_session_id).all()
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
    # this return statement is {'errors', [list of errors]}

@play_session_routes.route('/<int:play_session_id>/comments/<int:comment_id>', methods=["PUT"])
@login_required
def put_comment(play_session_id, comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('+++++++++', form.data)
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
