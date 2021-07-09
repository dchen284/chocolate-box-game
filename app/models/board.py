import datetime
from .db import db

class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    initial_board_setup = db.Column(db.String(255), nullable=False, unique=True)
    initial_tiles = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime(timezone=False),
                          nullable=False,
                          default=datetime.datetime.now(tz=None))


    play_sessions = db.relationship("PlaySession", back_populates="board")

    def to_dict(self):
        return {
            'id': self.id,
            'initial_board_setup': self.initial_board_setup,
            'timestamp': self.timestamp,
        }