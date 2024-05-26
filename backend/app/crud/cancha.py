from sqlalchemy.ext.asyncio import AsyncSession
from app.models.cancha import Cancha
from app.schemas.cancha import CanchaCreate

async def create_cancha(db: AsyncSession, cancha: CanchaCreate) -> Cancha:
    db_cancha = Cancha(**cancha.dict())
    db.add(db_cancha)
    await db.commit()
    await db.refresh(db_cancha)
    return db_cancha

async def get_cancha(db: AsyncSession, cancha_id: int) -> Cancha:
    return await db.get(Cancha, cancha_id)