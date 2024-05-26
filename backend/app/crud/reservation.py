from sqlalchemy.ext.asyncio import AsyncSession
from app.models.reservation import Reservation
from app.schemas.reservation import ReservationCreate

async def create_reservation(db: AsyncSession, reservation: ReservationCreate) -> Reservation:
    db_reservation = Reservation(**reservation.dict())
    db.add(db_reservation)
    await db.commit()
    await db.refresh(db_reservation)
    return db_reservation