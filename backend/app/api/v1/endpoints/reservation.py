from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.reservation import ReservationCreate, Reservation
from app.crud.reservation import get_reservations, create_reservation
from app.crud.user import get_user  # To check if the user exists

router = APIRouter()

@router.get("/", response_model=List[Reservation])
async def read_reservations(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    return await get_reservations(db, skip=skip, limit=limit)

@router.post("/", response_model=Reservation)
async def create_new_reservation(reservation: ReservationCreate, user_id: int, db: AsyncSession = Depends(get_db)):
    db_user = await get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return await create_reservation(db=db, reservation=reservation, user_id=user_id)
