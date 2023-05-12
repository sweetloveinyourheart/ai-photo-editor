from sqlalchemy import Boolean, Column, Integer, ForeignKey, TIMESTAMP, func, String, Float
from sqlalchemy.orm import relationship

from database.db import Base, engine

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(TIMESTAMP, default=func.current_timestamp())
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    user_id = Column(ForeignKey("users.id"))

    user = relationship("User", back_populates="payment") 


Base.metadata.create_all(bind=engine)