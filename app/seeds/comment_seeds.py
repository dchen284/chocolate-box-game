from app.models import db, Comment


def seed_comments():
    comments = [
        Comment(user_id=1,
                play_session_id=1,
                body=("That was a good play.")
                ),
        Comment(user_id=2,
                play_session_id=1,
                body=("That was a bad play.")
                ),
        Comment(user_id=1,
                play_session_id=2,
                body=("What could I have done?")
                ),
        Comment(user_id=3,
                play_session_id=2,
                body=("You boxed yourself in too early.")
                ),
    ]

    for comment in comments:
        db.session.add(comment)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()