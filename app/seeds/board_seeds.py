from app.models import db, Board


def seed_boards():
    boards = [
        Board(
            initialBoardSetup=
            "T00:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,00"
        ),
        Board(
            initialBoardSetup=
            "T00:00,00,W4,00,00,00,00,00,00,00,00,00,00,00,00,D1,00,00,00,00,00,00,00,00,00"
        ),
    ]

    for board in boards:
        db.session.add(board)

    db.session.commit()

def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
