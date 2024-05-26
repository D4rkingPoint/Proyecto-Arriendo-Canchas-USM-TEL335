from pydantic import BaseModel
from datetime import datetime

class NotificacionBase(BaseModel):
    user_id: int
    tipo: str
    mensaje: str

class NotificacionCreate(NotificacionBase):
    pass

class Notificacion(NotificacionBase):
    id: int
    fecha_envio: datetime

    class Config:
        orm_mode = True