from fastapi import FastAPI
from .routers import auth, reservations, users
from database import create_tables
import uvicorn


app = FastAPI()

app.include_router(auth.router)
app.include_router(reservations.router)
app.include_router(users.router)

