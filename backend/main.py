from fastapi import FastAPI
import uvicorn
from app.api.v1.endpoints import user, reservation, cancha
from app.auth import auth

description = """
Este es el backend del codigo base para el curso de TEL335

"""

tags_metadata = [
    {
        "name": "users",
        "description": "Operations with users. The **login** logic is also here.",
    },
]

app = FastAPI(title="BackEnd grupo WebOs",
              description=description,
              version="0.1", openapi_tags=tags_metadata)

app.include_router(user.router, prefix="/api/v1/users", tags=["users"])
app.include_router(reservation.router, prefix="/api/v1/reservations", tags=["reservations"])
app.include_router(cancha.router, prefix="/api/v1/canchas", tags=["canchas"])