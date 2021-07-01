from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# Implemented from example at https://hackmd.io/@jpshafto/H1VbmP3yO
favorited_by = db.Table(
    "favorited_by",
    db.Column("owner_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("favorite_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships

    comments = db.relationship("Comment", back_populates="user")
    play_sessions = db.relationship("PlaySession", back_populates="user")

    # Implemented from example at https://hackmd.io/@jpshafto/H1VbmP3yO
    favorite_players = db.relationship(
        "User",
        secondary=favorited_by,
        primaryjoin=(favorited_by.c.owner_id == id),
        secondaryjoin=(favorited_by.c.favorite_id == id),
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
