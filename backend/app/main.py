from fastapi import FastAPI
import uvicorn
from app.api.v1.endpoints import user, reservation, cancha, auth

app = FastAPI()

app.include_router(auth.router, prefix="/api/v1", tags=["auth"])
app.include_router(user.router, prefix="/api/v1/users", tags=["users"])
app.include_router(reservation.router, prefix="/api/v1/reservations", tags=["reservations"])
app.include_router(cancha.router, prefix="/api/v1/canchas", tags=["canchas"])