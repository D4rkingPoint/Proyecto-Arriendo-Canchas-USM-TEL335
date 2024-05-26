import asyncio
import sys
from alembic import command
from alembic.config import Config

async def run_alembic(alembic_args):
    alembic_cfg = Config("alembic.ini")
    command.stamp(alembic_cfg, "base")
    command_name = alembic_args[0]
    if command_name == "upgrade":
        command.upgrade(alembic_cfg, "head")
    elif command_name == "downgrade":
        command.downgrade(alembic_cfg, "base")
    elif command_name == "revision":
        command.revision(alembic_cfg, message=alembic_args[2], autogenerate=True)

if __name__ == "__main__":
    alembic_args = sys.argv[1:]
    asyncio.run(run_alembic(alembic_args))