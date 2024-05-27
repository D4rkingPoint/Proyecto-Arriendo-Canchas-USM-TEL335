from pydantic import BaseModel
from typing import Optional

# Base model for Cancha
class CanchaBase(BaseModel):
    tipo: str
    ubicacion: str
    estado_disponibilidad: bool

# Model for creating a new Cancha
class CanchaCreate(CanchaBase):
    fotografia: Optional[str]

# Model for updating an existing Cancha
class CanchaUpdate(CanchaBase):
    fotografia: Optional[str]

# Model for representing a Cancha with an ID
class Cancha(CanchaBase):
    id: int
    fotografia: Optional[str]
    reserva_id: Optional[int]

    class Config:
        orm_mode = True


        
