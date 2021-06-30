# from app.models import db

# def seed_favorite_players():
#     db.session.execute('INSERT INTO favorite_players (id, owner_id, favorite_id) VALUES (1, 2);')

# def undo_favorite_players():
#     db.session.execute('TRUNCATE favorite_players RESTART IDENTITY CASCADE;')
#     db.session.commit()