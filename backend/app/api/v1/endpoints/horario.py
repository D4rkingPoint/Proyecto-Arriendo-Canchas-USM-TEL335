from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.horario import HorarioCreate, HorarioUpdate, Horario
from app.crud.horario import get_horario, get_horarios_by_cancha, create_horario, update_horario, delete_horario

router = APIRouter()

@router.get("/{horario_id}", response_model=Horario)
async def read_horario(horario_id: int, db: AsyncSession = Depends(get_db)):
    db_horario = await get_horario(db, horario_id)
    if db_horario is None:
        raise HTTPException(status_code=404, detail="Horario not found")
    return db_horario

@router.get("/cancha/{cancha_id}", response_model=List[Horario])
async def read_horarios_by_cancha(cancha_id: int, skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    return await get_horarios_by_cancha(db, cancha_id, skip=skip, limit=limit)

@router.post("/", response_model=Horario)
async def create_new_horario(horario: HorarioCreate, db: AsyncSession = Depends(get_db)):
    return await create_horario(db=db, horario=horario)

@router.put("/{horario_id}", response_model=Horario)
async def update_existing_horario(horario_id: int, horario_update: HorarioUpdate, db: AsyncSession = Depends(get_db)):
    db_horario = await update_horario(db, horario_id, horario_update)
    if db_horario is None:
        raise HTTPException(status_code=404, detail="Horario not found")
    return db_horario

@router.delete("/{horario_id}", response_model=Horario)
async def delete_existing_horario(horario_id: int, db: AsyncSession = Depends(get_db)):
    db_horario = await delete_horario(db, horario_id)
    if db_horario is None:
        raise HTTPException(status_code=404, detail="Horario not found")
    return db_horario
