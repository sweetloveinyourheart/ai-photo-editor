from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT
from database import get_db
from sqlalchemy.orm import Session
from models import User, Profile


router = APIRouter()

@router.get("/profile")
def get_user_profile(authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    authorize.jwt_required()

    current_user = authorize.get_jwt_subject()

    account = db.query(User, Profile).join(Profile).filter(User.username == current_user).first()
    user = {k: v for k, v in vars(account[0]).items() if k != "password"}
    profile = {k: v for k, v in vars(account[1]).items() if k != "id"}
    result = { "user": user }
    result["user"]["profile"] = profile

    return result

