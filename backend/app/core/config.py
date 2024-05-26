from pydantic_settings import BaseSettings

from cryptography.fernet import Fernet

class Settings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_SERVER: str
    DATABASE_URL: str = None  # Será construido dinámicamente
    SECRET_KEY: str  # Cambia esto a un valor seguro
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    FERNET_KEY: str  # La clave para cifrar/desencriptar

    @property
    def database_url(self):
        key = self.FERNET_KEY.encode()
        cipher_suite = Fernet(key)
        password = cipher_suite.decrypt(self.POSTGRES_PASSWORD.encode()).decode()
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{password}@{self.POSTGRES_SERVER}/{self.POSTGRES_DB}"

    class Config:
        env_file = ".env"

settings = Settings()