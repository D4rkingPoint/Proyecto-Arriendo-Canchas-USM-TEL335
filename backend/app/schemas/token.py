from pydantic import BaseModel
from typing import List

class TokenData(BaseModel):
    user_id: int
    roles: List[str]
    
class Token(BaseModel):
    token: str
