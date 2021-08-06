from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Regexp, ValidationError
from app.models import User

regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[
                                DataRequired(),
                                Length(min=3, max=40,
                                       message="Username must be between 3 to 40 characters long."),
                                username_exists,
                                ])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password',
                            validators=[DataRequired(),
                                        Regexp(regex,
                                               message=("Minimum eight characters, "
                                                        "at least one upper case English letter, "
                                                        "one lower case English letter, one number "
                                                        "and one special character.")
                                              ),
                                        EqualTo('repeat_password', message='Passwords must match')
                                        ])
    repeat_password = StringField('password', validators=[DataRequired()])
