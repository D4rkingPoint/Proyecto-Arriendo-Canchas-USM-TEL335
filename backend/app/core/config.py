from pydantic_settings import BaseSettings
from cryptography.fernet import Fernet

class Settings(BaseSettings):
    POSTGRES_USER: str
    DB_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: str
    POSTGRES_SERVER: str
    DATABASE_URL: str = ""
    SECRET_KEY: str 
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    FERNET_KEY: str

    @property
    def database_url_async(self):
        key = self.FERNET_KEY.encode()
        cipher_suite = Fernet(key)
        password = cipher_suite.decrypt(self.DB_PASSWORD.encode()).decode()
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{password}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    @property
    def database_url_sync(self):
        key = self.FERNET_KEY.encode()
        cipher_suite = Fernet(key)
        password = cipher_suite.decrypt(self.DB_PASSWORD.encode()).decode()
        return f"postgresql+psycopg2://{self.POSTGRES_USER}:{password}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    class Config:
        env_file = ".env"

settings = Settings()