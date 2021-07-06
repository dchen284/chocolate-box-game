from app.models import db, PlaySession


def seed_play_sessions():
    play_sessions = [
        PlaySession(score=100,
                    moves=
                    "T00:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,00",
                    tiles="D1,M3,W2",
                    user_id=1,
                    board_id=1),
        PlaySession(score=200,
                    moves=
                    "T00:00,00,W4,00,00,00,00,00,00,00,00,00,00,00,00,D1,00,00,00,00,00,00,00,00,00",
                    tiles="W1,D4,M1",
                    user_id=1,
                    board_id=2),
        PlaySession(score=300,
                    moves=
                    "T00:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,00",
                    tiles="D1,M3,W2",
                    user_id=2,
                    board_id=1),
        PlaySession(score=400,
                    moves=
                    "T00:00,00,W4,00,00,00,00,00,00,00,00,00,00,00,00,D1,00,00,00,00,00,00,00,00,00",
                    tiles="W1,D4,M1",
                    user_id=2,
                    board_id=2),
        PlaySession(score=400,
                    moves=
                    "T00:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,00",
                    tiles="D1,M3,W2",
                    user_id=3,
                    board_id=1),
    ]

    for play_session in play_sessions:
        db.session.add(play_session)

    db.session.commit()

def undo_play_sessions():
    db.session.execute('TRUNCATE play_sessions RESTART IDENTITY CASCADE;')
    db.session.commit()