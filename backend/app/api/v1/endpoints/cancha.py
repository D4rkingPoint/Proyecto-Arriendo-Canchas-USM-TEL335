from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.cancha import CanchaCreate, CanchaUpdate, Cancha
from app.crud.cancha import get_cancha, get_canchas, create_cancha, update_cancha, delete_cancha

router = APIRouter()

@router.get("/", response_model=List[Cancha])
async def read_canchas(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    return await get_canchas(db, skip=skip, limit=limit)

@router.get("/{cancha_id}", response_model=Cancha)
async def read_cancha(cancha_id: int, db: AsyncSession = Depends(get_db)):
    db_cancha = await get_cancha(db, cancha_id)
    if db_cancha is None:
        raise HTTPException(status_code=404, detail="Cancha not found")
    return db_cancha

@router.post("/", response_model=Cancha)
async def create_new_cancha(cancha: CanchaCreate, db: AsyncSession = Depends(get_db)):
    return await create_cancha(db=db, cancha=cancha)

@router.put("/{cancha_id}", response_model=Cancha)
async def update_existing_cancha(cancha_id: int, cancha: CanchaUpdate, db: AsyncSession = Depends(get_db)):
    db_cancha = await update_cancha(db, cancha_id, cancha)
    if db_cancha is None:
        raise HTTPException(status_code=404, detail="Cancha not found")
    return db_cancha

@router.delete("/{cancha_id}", response_model=Cancha)
async def delete_existing_cancha(cancha_id: int, db: AsyncSession = Depends(get_db)):
    db_cancha = await delete_cancha(db, cancha_id)
    if db_cancha is None:
        raise HTTPException(status_code=404, detail="Cancha not found")
    return db_cancha
