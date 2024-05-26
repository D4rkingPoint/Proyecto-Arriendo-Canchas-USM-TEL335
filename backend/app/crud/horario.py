from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.horario import Horario
from app.schemas.horario import HorarioCreate, HorarioUpdate

async def get_horario(db: AsyncSession, horario_id: int):
    result = await db.execute(select(Horario).where(Horario.id == horario_id))
    return result.scalars().first()

async def get_horarios_by_cancha(db: AsyncSession, cancha_id: int, skip: int = 0, limit: int = 10):
    result = await db.execute(select(Horario).where(Horario.cancha_id == cancha_id).offset(skip).limit(limit))
    return result.scalars().all()

async def create_horario(db: AsyncSession, horario: HorarioCreate):
    db_horario = Horario(**horario.dict())
    db.add(db_horario)
    await db.commit()
    await db.refresh(db_horario)
    return db_horario

async def update_horario(db: AsyncSession, horario_id: int, horario_update: HorarioUpdate):
    result = await db.execute(select(Horario).where(Horario.id == horario_id))
    horario = result.scalars().first()
    if horario:
        for key, value in horario_update.dict(exclude_unset=True).items():
            setattr(horario, key, value)
        await db.commit()
        await db.refresh(horario)
    return horario

async def delete_horario(db: AsyncSession, horario_id: int):
    result = await db.execute(select(Horario).where(Horario.id == horario_id))
    horario = result.scalars().first()
    if horario:
        await db.delete(horario)
        await db.commit()
    return horario
