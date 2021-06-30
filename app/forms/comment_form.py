from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    play_session_id = IntegerField('play_session_id', validators=[DataRequired()])
    body = TextAreaField('body', validators=[DataRequired()])