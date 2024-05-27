from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.auth.auth import *
from app.schemas.token import *
from app.auth.middlewares import *
from app.db.session import get_db
from app.schemas.user import UserCreate, User
from app.crud.user import get_user, get_user_by_email, create_user

router = APIRouter()

validate_token_middleware = ValidateTokenMiddleware()
admin_role_middleware = AdminRoleMiddleware()

@router.post("/login")
async def login(email: str, password: str,db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, email, password)
    if user is None:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    roles = user.role

    token_data = TokenData(user_id=user.id, roles=roles)
    access_token = create_access_token(token_data)

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/create_user", response_model=User, tags=["admin"], dependencies=[Depends(validate_token_middleware), Depends(admin_role_middleware)])
async def create_new_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    created_user = await create_user(db=db, user=user)
    return created_user