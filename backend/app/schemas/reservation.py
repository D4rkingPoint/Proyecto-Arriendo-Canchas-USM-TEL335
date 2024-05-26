from pydantic import BaseModel
from datetime import datetime

class ReservationBase(BaseModel):
    user_id: int
    cancha_id: int
    fecha_reserva: datetime
    hora_inicio: str
    hora_fin: str

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: int
    estado: str

    class Config:
        orm_mode = True