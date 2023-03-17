from pydantic import BaseModel

class Settings(BaseModel):
    authjwt_secret_key: str = "secret"

class SigninBody(BaseModel):
    username: str
    password: str

class SignupBody(SigninBody):
    first_name: str
    last_name: str
    phone: str
    birthday: str
