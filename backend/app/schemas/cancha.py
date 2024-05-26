from pydantic import BaseModel

class CanchaBase(BaseModel):
    tipo: str
    ubicacion: str
    fotografia: str
    estado_disponibilidad: bool

class CanchaCreate(CanchaBase):
    pass

class Cancha(CanchaBase):
    id: int

    class Config:
        orm_mode = True
        
