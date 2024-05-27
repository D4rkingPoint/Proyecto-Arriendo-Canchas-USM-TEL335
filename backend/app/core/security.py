from datetime import datetime, timedelta

from passlib.context import CryptContext
from fastapi import Request, HTTPException
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def token_verification_middleware(request: Request, call_next):
    # Obtener el token de autorización del encabezado de la solicitud
    token = request.headers.get("Authorization", None)

    if token is None:
        raise HTTPException(status_code=401, detail="No se proporcionó un token de acceso")

    try:
        # Decodificar el token
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        # Agregar el payload decodificado a la solicitud para su uso posterior
        request.state.payload = payload

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    # Llamar a la función de solicitud siguiente (probablemente un controlador de ruta)
    response = await call_next(request)
    return response
