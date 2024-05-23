from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, crud, dependencies, models  

router = APIRouter(
    prefix="/reservations",
    tags=["reservations"]
)

@router.post("/", response_model=schemas.Reservation)
def create_reservation(reservation: schemas.ReservationCreate, db: Session = Depends(dependencies.get_db), user: models.User = Depends(dependencies.get_current_user)):
    overlapping_reservations = db.query(models.Reservation).filter(
        models.Reservation.sport == reservation.sport,
        models.Reservation.start_time < reservation.end_time,
        models.Reservation.end_time > reservation.start_time
    ).all()

    if overlapping_reservations:
        raise HTTPException(status_code=400, detail="Ya está reservado")

    return crud.create_reservation(db=db, reservation=reservation, user_id=user.id)

@router.get("/", response_model=List[schemas.Reservation])
def read_reservations(skip: int = 0, limit: int = 10, db: Session = Depends(dependencies.get_db)):
    reservations = crud.get_reservations(db, skip=skip, limit=limit)
    return reservations
