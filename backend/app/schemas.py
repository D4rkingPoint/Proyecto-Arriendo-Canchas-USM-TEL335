from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
class Config:
        orm_mode = True

class ReservationBase(BaseModel):
    sport: str
    start_time: datetime
    end_time: datetime

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True