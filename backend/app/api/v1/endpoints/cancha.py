from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.crud.cancha import create_cancha, get_cancha
from app.schemas.cancha import CanchaCreate, Cancha

router = APIRouter()

@router.post("/", response_model=Cancha)
async def create_new_cancha(cancha: CanchaCreate, db: AsyncSession = Depends(get_db)):
    return await create_cancha(db=db, cancha=cancha)

@router.get("/{cancha_id}", response_model=Cancha)
async def read_cancha(cancha_id: int, db: AsyncSession = Depends(get_db)):
    return await get_cancha(db=db, cancha_id=cancha_id)