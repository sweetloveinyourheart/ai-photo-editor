from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from database.db import Base, engine

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    profile = relationship("Profile", uselist=False, back_populates="user")
    plan = relationship("Plan", uselist=False, back_populates="user")
    payment = relationship("Payment", back_populates="user")
 
Base.metadata.create_all(bind=engine)
    