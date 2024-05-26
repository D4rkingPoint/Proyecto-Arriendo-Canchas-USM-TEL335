from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import SessionLocal
from app.db.session import get_db
from app.crud.reservation import create_reservation
from app.schemas.reservation import ReservationCreate, Reservation

router = APIRouter()


@router.post("/", response_model=Reservation)
async def create_new_reservation(reservation: ReservationCreate, db: AsyncSession = Depends(get_db)):
    return await create_reservation(db=db, reservation=reservation)