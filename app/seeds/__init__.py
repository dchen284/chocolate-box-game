# External imports
from flask.cli import AppGroup
# Internal imports
from .board_seeds import seed_boards, undo_boards
from .comment_seeds import seed_comments, undo_comments
# from .favorite_player_seeds import seed_favorite_players, undo_favorite_players
from .play_session_seeds import seed_play_sessions, undo_play_sessions
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_boards()
    seed_play_sessions()
    seed_comments()
    # seed_favorite_players()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_boards()
    undo_comments()
    # undo_favorite_players()
    undo_play_sessions()
    undo_users()
    # Add other undo functions here
