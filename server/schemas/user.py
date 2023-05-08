from pydantic import BaseModel

class UserSchema:
    id: int
    email: str
    password: str