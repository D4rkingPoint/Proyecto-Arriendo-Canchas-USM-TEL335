from sqlalchemy import Column, Integer, String, Boolean
from app.db.base_class import Base
from sqlalchemy.orm import relationship

class User(Base):
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    
    reservations = relationship("Reservation", back_populates="user")
    notificacion = relationship("Notificacion", back_populates="user")