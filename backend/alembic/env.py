import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context
from app.core.config import settings  # Asegúrate de que la ruta sea correcta
from app.db.base import Base  # Importa tus modelos para que Alembic los conozca

# Configuración de logging
config = context.config
fileConfig(config.config_file_name)

# Configurar la URL de la base de datos de forma dinámica
config.set_main_option('sqlalchemy.url', settings.database_url)

# Configuración de metadata
target_metadata = Base.metadata

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url, target_metadata=target_metadata, literal_binds=True
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
