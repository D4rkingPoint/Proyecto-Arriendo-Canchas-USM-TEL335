from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    hashed_password: str

class User(UserBase):
    id: int
    is_active: bool
    is_admin: bool

    class Config:
        orm_mode = True