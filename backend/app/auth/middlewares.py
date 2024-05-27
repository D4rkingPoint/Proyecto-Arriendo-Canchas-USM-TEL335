from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer
from app.schemas.token import TokenData
from app.auth.auth import *

class ValidateTokenMiddleware:
    def __init__(self):
        self.security = HTTPBearer()

    async def __call__(self, request: Request, token_data: TokenData = Depends(get_current_token_data)):
        try:
            # Verificar el token en el encabezado de autorización
            token = await self.security(request)
            token_data = await decode_token(token)
            request.state.token_data = token_data

        except HTTPException:
            raise  # Reenviar excepción HTTP para manejo por FastAPI
        except Exception as e:
            raise HTTPException(status_code=401, detail="Token inválido")

        # Continuar con la solicitud
        response = await self.app(request)
        return response

class AdminRoleMiddleware:
    def __init__(self):
        pass

    async def __call__(self, request: Request):
        token_data = request.state.token_data
        if not token_data:
            raise HTTPException(status_code=401, detail="No se proporcionó un token")

        # Verificar si el usuario es administrador
        if not token_data.is_admin:
            raise HTTPException(status_code=403, detail="No tienes permiso de administrador")

        return await self.app(request)