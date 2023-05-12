from sqlalchemy import Boolean, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from database.db import Base, engine

class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)
    membership_tier = Column(Integer, default=0) # 0 -> manual user, 1 -> premium user
    generation_limited = Column(Integer, default=5)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="plan") 


Base.metadata.create_all(bind=engine)