import random
from app.models import db, Board


def seed_boards():
    boards = [
        #1x
        Board(
            initialBoardSetup=
            "T00:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,00",
            initialTiles=
            "D1,M3,W2",
        ),
        #2x
        Board(
            initialBoardSetup=
            "T00:00,00,W4,00,00,00,00,00,00,00,00,00,00,00,00,D1,00,00,00,00,00,00,00,00,00",
            initialTiles=
            "W1,D4,M1",
        ),
        #3x
        Board(
            initialBoardSetup=
            "T00:00,00,00,00,00,00,D3,00,00,00,00,00,00,00,00,00,00,00,00,00,W2,00,00,00,00",
            initialTiles=
            "M4,D2,W3",
        ),
        #4x
        Board(
            initialBoardSetup=
            "T00:00,D1,00,00,00,00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00",
            initialTiles=
            "D3,W3,D1",
        ),
        #5x
        Board(
            initialBoardSetup=
            "T00:00,00,00,00,00,00,00,00,W2,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D4,00",
            initialTiles=
            "W4,M2,D2",
        ),
        #6x
        Board(
            initialBoardSetup=
            "T00:00,00,00,00,M1,00,00,00,00,00,00,00,W3,00,00,00,00,00,00,00,00,00,00,00,00",
            initialTiles=
            "M3,W4,D1",
        ),
        #7x
        Board(
            initialBoardSetup=
            "T00:00,00,W4,00,00,00,00,00,00,00,M1,00,00,00,00,00,00,00,00,00,00,00,D1,00,00",
            initialTiles=
            "D1,D4,W1",
        ),
        #8x
        Board(
            initialBoardSetup=
            "T00:00,00,00,00,00,00,M2,00,00,00,00,00,00,00,D4,00,00,00,00,00,00,00,00,00,00",
            initialTiles=
            "W2,M3,M4",
        ),
        #9x
        Board(
            initialBoardSetup=
            "T00:00,00,00,00,00,00,00,00,00,00,00,W2,00,00,00,00,00,00,00,00,00,W3,00,00,00",
            initialTiles=
            "W4,D4,W1",
        ),
        #10x
        Board(
            initialBoardSetup=
            "T00:00,00,W3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,M3,00,00,00",
            initialTiles=
            "D1,D2,D3",
        ),
    ]

    db.session.add_all(boards)
    # for board in boards:
    #     db.session.add(board)

    db.session.commit()

def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()

    # tile_values = ["D1", "D2", "D3", "D4", "M1", "M2", "M3", "M4", "W1", "W2", "W3", "W4"]

    # while boards.length < 20:
    #     str_start = "T00:"
    #     int_start = 0
    #     int_end = 24
    #     pos1 = random.randint(int_start, int_end)
    #     pos2 = random.randint(int_start, int_end)
    #     if abs(pos1 - pos2) not in [0, 1, 5]:
    #         tile1 = random.randrange(0, len(tile_values))
    #         tile2 = random.randrange(0, len(tile_values))
    #         for i in range(int_start, int_end):
    #             if i == pos1:
    #                 str_start = str_start + tile1 + ","
    #             elif i == pos2:
    #                 str_start = str_start + tile2 + ","
    #             else:
    #                 str_start += "00,"
    #         str_start = str_start[:-1]
    #         boards.append(str_board)