from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
#from jose import JWTError, jwt
from sqlalchemy.orm import Session
from . import crud, models
from .database import get_db

from jwt import DecodeError
from jwt.exceptions import InvalidTokenError
from jwt import decode as jwt_decode

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se han podido validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt_decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except (InvalidTokenError, DecodeError):
        raise credentials_exception

    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user