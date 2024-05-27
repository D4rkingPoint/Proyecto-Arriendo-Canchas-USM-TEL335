from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Base model for Horario
class HorarioBase(BaseModel):
    cancha_id: int
    fecha: datetime
    start_time: datetime
    end_time: datetime
    estado: bool

# Model for creating a new Horario
class HorarioCreate(HorarioBase):
    pass

# Model for updating an existing Horario
class HorarioUpdate(HorarioBase):
    pass

# Model for representing a Horario with an ID
class Horario(HorarioBase):
    id: int

    class Config:
        orm_mode = True
