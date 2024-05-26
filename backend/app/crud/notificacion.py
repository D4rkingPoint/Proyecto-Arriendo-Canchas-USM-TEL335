from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.notificacion import Notificacion
from app.schemas.notificacion import NotificacionCreate
from datetime import datetime

async def get_notificacion(db: AsyncSession, notificacion_id: int):
    result = await db.execute(select(Notificacion).where(Notificacion.id == notificacion_id))
    return result.scalars().first()

async def get_notificaciones_by_user(db: AsyncSession, user_id: int, skip: int = 0, limit: int = 10):
    result = await db.execute(select(Notificacion).where(Notificacion.user_id == user_id).offset(skip).limit(limit))
    return result.scalars().all()

async def create_notificacion(db: AsyncSession, notificacion: NotificacionCreate):
    db_notificacion = Notificacion(**notificacion.dict(), fecha_envio=datetime.utcnow())
    db.add(db_notificacion)
    await db.commit()
    await db.refresh(db_notificacion)
    return db_notificacion

async def delete_notificacion(db: AsyncSession, notificacion_id: int):
    result = await db.execute(select(Notificacion).where(Notificacion.id == notificacion_id))
    notificacion = result.scalars().first()
    if notificacion:
        await db.delete(notificacion)
        await db.commit()
    return notificacion
