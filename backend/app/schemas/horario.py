from pydantic import BaseModel
from datetime import datetime

class HorarioBase(BaseModel):
    cancha_id: int
    fecha: datetime
    start_time: datetime
    end_time: datetime
    estado: bool

class HorarioCreate(HorarioBase):
    pass

class HorarioUpdate(HorarioBase):
    pass

class Horario(HorarioBase):
    id: int

    class Config:
        orm_mode = True