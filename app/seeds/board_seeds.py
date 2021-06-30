from app.models import db, Board


def seed_boards():
    boards = [
        Board(
            initialBoardSetup="1st2nd3rd4th"
        ),
        Board(
            initialBoardSetup="5th6th7th8th"
        ),
    ]

    for board in boards:
        db.session.add(board)

    db.session.commit()

def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
