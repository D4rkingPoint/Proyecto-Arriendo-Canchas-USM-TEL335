from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class Notificacion(Base):
    __tablename__ = "notificacion"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) 
    tipo = Column(String)                             
    mensaje = Column(String)                          
    fecha_envio = Column(DateTime)                    
                                                      
    user = relationship("User") 