from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    #1
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        current_session_id=1,
        )
    #2
    marnie = User(
        username='Marnie',
        email='marnie@aa.io',
        password='password',
        current_session_id=3,
        )
    #3
    bobbie = User(
        username='Bobbie',
        email='bobbie@aa.io',
        password='password',
        current_session_id=5,
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()

    users = [
        #4
        User(username="WillyWonka", email="willy@wonka.com", password='password', current_session_id=7),
        #5
        User(username="GrandpaJoe", email="grandpa@wonka.com", password='password', current_session_id=10),
        #6
        User(username="VerucaSalt", email="veruca@wonka.com", password='password', current_session_id=11),
        #7
        User(username="VioletB", email="violet@wonka.com", password='password', current_session_id=12),
        #8
        User(username="MikeTV", email="miketv@wonka.com", password='password', current_session_id=13),
        #9
        User(username="AugustusGloop", email="augustus@wonka.com", password='password', current_session_id=14),
        #10
        User(username="CharlieBucket", email="charlie@wonka.com", password='password', current_session_id=15),
        #11
        User(username="Asmoranomardicadaistinaculdacar", email="asmor@food.com", password='password', current_session_id=16),
    ]

    db.session.add_all(users)
    db.session.commit()

    # seed a favorite
    demo.favorite_players.append(marnie)
    demo.favorite_players.append(bobbie)
    marnie.favorite_players.append(bobbie)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
