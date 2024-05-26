from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.notificacion import NotificacionCreate, Notificacion
from app.crud.notificacion import get_notificacion, get_notificaciones_by_user, create_notificacion, delete_notificacion

router = APIRouter()

@router.get("/{notificacion_id}", response_model=Notificacion)
async def read_notificacion(notificacion_id: int, db: AsyncSession = Depends(get_db)):
    db_notificacion = await get_notificacion(db, notificacion_id)
    if db_notificacion is None:
        raise HTTPException(status_code=404, detail="Notificacion not found")
    return db_notificacion

@router.get("/user/{user_id}", response_model=List[Notificacion])
async def read_notificaciones_by_user(user_id: int, skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    return await get_notificaciones_by_user(db, user_id, skip=skip, limit=limit)

@router.post("/", response_model=Notificacion)
async def create_new_notificacion(notificacion: NotificacionCreate, db: AsyncSession = Depends(get_db)):
    return await create_notificacion(db=db, notificacion=notificacion)

@router.delete("/{notificacion_id}", response_model=Notificacion)
async def delete_existing_notificacion(notificacion_id: int, db: AsyncSession = Depends(get_db)):
    db_notificacion = await delete_notificacion(db, notificacion_id)
    if db_notificacion is None:
        raise HTTPException(status_code=404, detail="Notificacion not found")
    return db_notificacion
