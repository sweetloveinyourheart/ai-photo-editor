from pydantic import BaseModel

class Password(BaseModel):
    old_password: str
    new_password: str
    retype_password: str

class UserProfile(BaseModel):
    first_name: str
    last_name: str
    birthday: str | None
    password: Password | None