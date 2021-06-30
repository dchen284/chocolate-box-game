import datetime
from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    play_session_id = db.Column(db.Integer, db.ForeignKey("play_sessions.id"))
    body = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime(timezone=False),
                          nullable=False,
                          default=datetime.datetime.now(tz=None))

    # Relationships

    play_session = db.relationship("PlaySession", back_populates="comments")
    user = db.relationship("User", back_populates="comments")

    # Methods

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'play_session_id': self.play_session_id,
            'body': self.body,
            'timestamp': self.timestamp,
        }