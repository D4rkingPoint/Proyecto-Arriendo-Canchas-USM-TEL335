from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.user import UserCreate, User
from app.crud.user import create_user, get_user_by_email
from app.auth.auth import get_password_hash

router = APIRouter()

@router.post("/initialize_admin", response_model=User)
async def initialize_admin(user: UserCreate, db: AsyncSession = Depends(get_db)):
    # Verificar si ya existe un usuario administrador
    existing_admin = await db.execute(
        select(User).where(User.is_admin == True)
    )
    if existing_admin.scalars().first():
        raise HTTPException(status_code=400, detail="Admin user already exists")

    # Crear el primer usuario administrador
    user.password = get_password_hash(user.password)
    user.is_admin = True
    created_user = await create_user(db=db, user=user)

    return created_user
