from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    reservations = relationship("Reservation", back_populates="owner")

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    sport = Column(String)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="reservations")