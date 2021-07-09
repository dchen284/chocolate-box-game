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
        Comment(user_id=5,
                play_session_id=8,
                body=
                """
                We're no strangers to love
                You know the rules and so do I
                A full commitment's what I'm thinking of
                You wouldn't get this from any other guy

                I just wanna tell you how I'm feeling
                Gotta make you understand

                Never gonna give you up
                Never gonna let you down
                Never gonna run around and desert you
                Never gonna make you cry
                Never gonna say goodbye
                Never gonna tell a lie and hurt you

                We've known each other for so long
                Your heart's been aching, but
                You're too shy to say it
                Inside, we both know what's been going on
                We know the game and we're gonna play it

                And if you ask me how I'm feeling
                Don't tell me you're too blind to see

                Never gonna give you up
                Never gonna let you down
                Never gonna run around and desert you
                Never gonna make you cry
                Never gonna say goodbye
                Never gonna tell a lie and hurt you

                Never gonna give you up
                Never gonna let you down
                Never gonna run around and desert you
                Never gonna make you cry
                Never gonna say goodbye
                Never gonna tell a lie and hurt you

                (Ooh, give you up)
                (Ooh, give you up)
                Never gonna give, never gonna give
                (Give you up)
                Never gonna give, never gonna give
                (Give you up)

                We've known each other for so long
                Your heart's been aching, but
                You're too shy to say it
                Inside, we both know what's been going on
                We know the game and we're gonna play it

                I just wanna tell you how I'm feeling
                Gotta make you understand

                Never gonna give you up
                Never gonna let you down
                Never gonna run around and desert you
                Never gonna make you cry
                Never gonna say goodbye
                Never gonna tell a lie and hurt you

                Never gonna give you up
                Never gonna let you down
                Never gonna run around and desert you
                Never gonna make you cry
                Never gonna say goodbye
                Never gonna tell a lie and hurt you

                Never gonna give you up
                Never gonna let you down
                Never gonna run around and desert you
                Never gonna make you cry
                Never gonna say goodbye
                Never gonna tell a lie and hurt you
                """
                ),
        Comment(user_id=11,
                play_session_id=8,
                body=("Needs more scorpion stinger.")
                ),
        Comment(user_id=6,
                play_session_id=8,
                body=("Pffb, I can play much better, much more expensive games!")
                ),
        Comment(user_id=10,
                play_session_id=8,
                body=("Amazing!")
                ),
    ]

    for comment in comments:
        db.session.add(comment)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()