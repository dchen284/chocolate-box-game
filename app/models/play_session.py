import datetime
# from sqlalchemy import UniqueConstraint
from .db import db

class PlaySession(db.Model):
    __tablename__ = 'play_sessions'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False, default=8)
    moves = db.Column(db.String, nullable=False)
    tiles = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    board_id = db.Column(db.Integer, db.ForeignKey("boards.id"))
    timestamp = db.Column(db.DateTime(timezone=False),
                          nullable=False,
                          default=datetime.datetime.now(tz=None))

    # Relationships

    board = db.relationship("Board", back_populates="play_sessions")
    comments = db.relationship("Comment", back_populates="play_session")
    user = db.relationship("User", back_populates="play_sessions")
    # user = db.relationship("User", back_populates="play_sessions", foreign_keys=[user_id])

    # current_user = db.relationship("User", uselist="false", back_populates="current_session")
    # current_user = db.relationship("User",
    #                                back_populates="current_session")

    # __table_args__ = (
    #     UniqueConstraint("id", "user_id"),
    # )

    # Methods

    # @property
    # def score(self):
    #     return self._score

    # @score.setter
    # def score(self, value):
    #     self.score = value

    # @property
    # def score(self):
    #     return self.score

    # @score.setter
    # def score(self, value):
    #     self.score = value

    # def set_score(self, value):
    #     self.score = value

    def to_dict(self):
        return {
            'id': self.id,
            'score': self.score,
            'moves': self.moves,
            'tiles': self.tiles,
            'user_id': self.user_id,
            'board_id': self.board_id,
            'timestamp': self.timestamp,
            'username': self.user.username,
        }
