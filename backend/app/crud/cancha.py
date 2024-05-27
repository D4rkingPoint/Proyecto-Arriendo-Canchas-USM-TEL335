from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.cancha import Cancha
from app.schemas.cancha import CanchaUpdate , CanchaCreate

async def get_cancha(db: AsyncSession, cancha_id: int):
    result = await db.execute(select(Cancha).where(Cancha.id == cancha_id))
    return result.scalars().first()

async def get_canchas(db: AsyncSession, skip: int = 0, limit: int = 10):
    result = await db.execute(select(Cancha).offset(skip).limit(limit))
    return result.scalars().all()

async def create_cancha(db: AsyncSession, cancha: CanchaCreate):
    db_cancha = Cancha(**cancha.dict())
    db.add(db_cancha)
    await db.commit()
    await db.refresh(db_cancha)
    return db_cancha

async def update_cancha(db: AsyncSession, cancha_id: int, cancha_update: CanchaUpdate):
    result = await db.execute(select(Cancha).where(Cancha.id == cancha_id))
    cancha = result.scalars().first()
    if cancha:
        for key, value in cancha_update.dict(exclude_unset=True).items():
            setattr(cancha, key, value)
        await db.commit()
        await db.refresh(cancha)
    return cancha

async def delete_cancha(db: AsyncSession, cancha_id: int):
    result = await db.execute(select(Cancha).where(Cancha.id == cancha_id))
    cancha = result.scalars().first()
    if cancha:
        await db.delete(cancha)
        await db.commit()
    return cancha
