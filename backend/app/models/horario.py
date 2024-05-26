from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Horario(Base):
    __tablename__ = "horario"
    id = Column(Integer, primary_key=True, index=True)
    cancha_id = Column(Integer, ForeignKey("cancha.id"))
    fecha = Column(DateTime)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    estado = Column(Boolean, default=True)

    cancha = relationship("cancha", back_populates="horarios")