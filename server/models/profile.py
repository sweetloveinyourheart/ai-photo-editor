from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship

from database.db import Base, engine

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=True) 
    profile_pic = Column(String, default="/assets/images/user.png")
    plan = Column(Integer, default=0) # 0 -> manual user, 1 -> premium user
    birthday = Column(Date, nullable=True)
    user_id = Column(ForeignKey("users.id"))

    user = relationship("User", back_populates="profile") 


Base.metadata.create_all(bind=engine)