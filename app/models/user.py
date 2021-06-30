from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# Implemented from example at https://hackmd.io/@jpshafto/H1VbmP3yO
favorite_players = db.Table(
    "favorite_players",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("favorite_player_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Implemented from example at https://hackmd.io/@jpshafto/H1VbmP3yO
    followers = db.relationship(
        "User",
        secondary=favorite_players,
        primaryjoin=(favorite_players.c.user_id == id),
        secondaryjoin=(favorite_players.c.favorite_player_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
