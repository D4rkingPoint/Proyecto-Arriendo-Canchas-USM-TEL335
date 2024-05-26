from pydantic import BaseModel
from datetime import datetime

class ReservationBase(BaseModel):
    user_id: int
    cancha_id: int
    reserva_time: datetime
    start_time: datetime
    end_time: datetime

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: int
    estado: str

    class Config:
        orm_mode = True