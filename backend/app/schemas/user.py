from pydantic import BaseModel

# Modelo base para User
class UserBase(BaseModel):
    email: str
    is_active: bool

# Modelo para crear un nuevo User
class UserCreate(UserBase):
    hashed_password: str

# Modelo para actualizar un User existente
class UserUpdate(UserBase):
    hashed_password: str

# Modelo para representar un User con un ID
class User(UserBase):
    id: int

    class Config:
        orm_mode = True
