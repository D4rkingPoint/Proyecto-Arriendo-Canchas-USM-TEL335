import jwt
from datetime import datetime, timedelta
from app.core.config import settings
from app.schemas.token import *
from app.crud.user import *

from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Request, HTTPException


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: TokenData) -> str:
    """
    Crea un token de acceso JWT con los datos proporcionados.
    :param data: Datos que se agregarán al token.
    :return: Token JWT generado.
    """
    to_encode = data.model_copy()
    expire = datetime.now() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_token(token: str) -> TokenData:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    return TokenData(**payload)

async def get_current_token_data(request: Request) -> TokenData:
    token = request.state.token
    return await decode_token(token)

def verify_password(stored_password: str, plain_password: str) -> bool:
    """
    Verifica si la contraseña proporcionada por el usuario coincide con la contraseña almacenada.
    :param stored_password: Contraseña almacenada en tu sistema (hasheada).
    :param plain_password: Contraseña proporcionada por el usuario (sin hashear).
    :return: True si las contraseñas coinciden, False en caso contrario.
    """
    return pwd_context.verify(plain_password, stored_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def authenticate_user(db: AsyncSession, email: str, hashed_password: str):
    """
    Verifica las credenciales del usuario utilizando el email y la contraseña hasheada.
    :param email: Email del usuario.
    :param hashed_password: Contraseña hasheada del usuario.
    :return: ID del usuario si las credenciales son válidas, None en caso contrario.
    """

    user = get_user_by_email(db,email)
    if not user:
        return None
    
    if not verify_password(user.hashed_password, hashed_password):
        return None

    return user

def get_user_roles(user_id: int) -> List[str]:
    """
    Obtiene los roles asociados a un usuario en el sistema.
    :param user_id: ID único del usuario.
    :return: Lista de roles del usuario.
    """
    if user_id == 1:
        return ["admin"]
    else:
        return ["user"]