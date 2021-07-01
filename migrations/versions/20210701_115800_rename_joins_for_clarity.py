"""rename joins for clarity

Revision ID: 9dca114612c8
Revises: 28fc4bff5492
Create Date: 2021-07-01 11:58:00.793932

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9dca114612c8'
down_revision = '28fc4bff5492'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorited_by',
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('favorite_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['favorite_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], )
    )
    op.drop_table('favorite_players')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorite_players',
    sa.Column('owner_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('favorite_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['favorite_id'], ['users.id'], name='favorite_players_favorite_id_fkey'),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], name='favorite_players_owner_id_fkey')
    )
    op.drop_table('favorited_by')
    # ### end Alembic commands ###
