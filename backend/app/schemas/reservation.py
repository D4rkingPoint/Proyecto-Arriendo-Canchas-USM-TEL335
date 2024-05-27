from pydantic import BaseModel
from datetime import datetime

# Modelo base para Reservation
class ReservationBase(BaseModel):
    reserva_time: datetime
    start_time: datetime
    end_time: datetime
    estado: str

# Modelo para crear una nueva Reservation
class ReservationCreate(ReservationBase):
    pass

# Modelo para actualizar una Reservation existente
class ReservationUpdate(ReservationBase):
    pass

# Modelo para representar una Reservation con un ID
class Reservation(ReservationBase):
    id: int

    class Config:
        orm_mode = True
