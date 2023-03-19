from pydantic import BaseModel

class UserSchema:
    id: int
    username: str
    password: str