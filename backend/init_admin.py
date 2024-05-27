import sys
import os
import asyncio
from app.db.session import get_db
from app.crud.user import create_user
from app.schemas.user import UserCreate
from app.auth.auth import get_password_hash

async def create_initial_admin():
    # Crear una instancia de la sesión de la base de datos
    async for db in get_db():
        # Datos del primer usuario administrador
        user_data = UserCreate(
            email="admin@example.com",
            hashed_password=get_password_hash("adminpassword")
        )

        # Crear el usuario
        created_user = await create_user(db=db, user=user_data)
        print(f"Usuario administrador creado: {created_user.email}")

if __name__ == "__main__":
    asyncio.run(create_initial_admin())