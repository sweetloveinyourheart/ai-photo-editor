from pydantic import BaseModel

class Settings(BaseModel):
    authjwt_secret_key: str = "secret"

class SigninBody(BaseModel):
    email: str
    password: str

class SignupBody(SigninBody):
    first_name: str
    last_name: str
    birthday: str | None

class OAuthBody(BaseModel):
    name: str
    email: str
    profile_pic: str | None