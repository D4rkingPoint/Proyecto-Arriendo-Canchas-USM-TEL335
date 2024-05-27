"""init

Revision ID: 7c555312a3ba
Revises: 204549dbddcf
Create Date: 2024-05-27 00:25:06.334360

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7c555312a3ba'
down_revision: Union[str, None] = '204549dbddcf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('cancha_reserva_id_fkey', 'cancha', type_='foreignkey')
    op.drop_column('cancha', 'reserva_id')
    op.add_column('reservation', sa.Column('user_id', sa.Integer(), nullable=True))
    op.add_column('reservation', sa.Column('cancha_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'reservation', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'reservation', 'cancha', ['cancha_id'], ['id'])
    op.drop_constraint('users_reserva_id_fkey', 'users', type_='foreignkey')
    op.drop_column('users', 'reserva_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('reserva_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('users_reserva_id_fkey', 'users', 'reservation', ['reserva_id'], ['id'])
    op.drop_constraint(None, 'reservation', type_='foreignkey')
    op.drop_constraint(None, 'reservation', type_='foreignkey')
    op.drop_column('reservation', 'cancha_id')
    op.drop_column('reservation', 'user_id')
    op.add_column('cancha', sa.Column('reserva_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('cancha_reserva_id_fkey', 'cancha', 'reservation', ['reserva_id'], ['id'])
    # ### end Alembic commands ###
