from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean
from app.db.base_class import Base

class Cancha(Base):

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, index=True)
    ubicacion = Column(String, index=True)
    fotografia = Column(String, index=True)
    estado_disponibilidad = Column(Boolean, default=True)

    reservations = relationship("Reservation", back_populates="cancha")
    horarios = relationship("Horario", back_populates="cancha")
    
    