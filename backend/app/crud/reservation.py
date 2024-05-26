from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.reservation import Reservation
from app.schemas.reservation import ReservationCreate

async def get_reservations(db: AsyncSession, skip: int = 0, limit: int = 10):
    result = await db.execute(select(Reservation).offset(skip).limit(limit))
    return result.scalars().all()

async def create_reservation(db: AsyncSession, reservation: ReservationCreate, user_id: int):
    db_reservation = Reservation(**reservation.dict(), user_id=user_id)
    db.add(db_reservation)
    await db.commit()
    await db.refresh(db_reservation)
    return db_reservation
