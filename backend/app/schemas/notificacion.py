from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Base model for Notificacion
class NotificacionBase(BaseModel):
    user_id: int
    tipo: str
    mensaje: str
    fecha_envio: datetime

# Model for creating a new Notificacion
class NotificacionCreate(NotificacionBase):
    pass

# Model for updating an existing Notificacion
class NotificacionUpdate(NotificacionBase):
    pass

# Model for representing a Notificacion with an ID
class Notificacion(NotificacionBase):
    id: int

    class Config:
        orm_mode = True
