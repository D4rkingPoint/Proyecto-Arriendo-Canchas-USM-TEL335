from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context
from app.db.base import Base
from app.core.config import Settings

# Carga la configuración del archivo .ini de Alembic.
config = context.config

# Configura los loggers.
fileConfig(config.config_file_name)

# Metadata de la base de datos.
target_metadata = Base.metadata

# Obtiene la URL de la base de datos desde la configuración.
database_url = Settings().database_url_sync
config.set_main_option("sqlalchemy.url", database_url)

# Modifica el contexto para trabajar con asyncpg.
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()