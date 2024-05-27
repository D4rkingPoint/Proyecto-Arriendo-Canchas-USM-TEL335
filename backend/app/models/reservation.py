from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Reservation(Base):
    __tablename__ = "reservations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    cancha_id = Column(Integer, ForeignKey("cancha.id"))
    reserva_time = Column(DateTime, nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    estado = Column(String, index=True, nullable=False)

    user = relationship("User", back_populates="reservations")
    cancha = relationship("Cancha", back_populates="reservations")