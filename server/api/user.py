from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from database import get_db
from sqlalchemy.orm import Session
from models import User, Profile, Plan
from .dto import UserProfile
from utils import hash_pwd, check_pwd

router = APIRouter()

@router.get("/profile")
def get_user_profile(authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    authorize.jwt_required()

    current_user = authorize.get_jwt_subject()

    account = db.query(User, Profile, Plan).join(Profile).join(Plan).filter(User.email == current_user).first()
    user = {k: v for k, v in vars(account[0]).items() if k != "password"}
    profile = {k: v for k, v in vars(account[1]).items() if k != "id"}
    plan = {k: v for k, v in vars(account[2]).items() if k != "id" and k != "user_id"}

    result = { "user": user }
    result["user"]["profile"] = profile
    result["user"]["plan"] = plan

    return result

@router.post("/edit-profile")
def edit_user_profile(user_data: UserProfile, authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    authorize.jwt_required()

    current_user = authorize.get_jwt_subject()

    user = db.query(User).filter(User.email == current_user).first()
    if not user:
        raise HTTPException(status_code=404,detail="Account doesn't match")
    
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not match")
    
    if user_data.password:
        if (len(user.password) != 0):
            if not check_pwd(user_data.password.old_password ,user.password):
                raise HTTPException(status_code=401, detail="Old password not correct")

        user.password = hash_pwd(user_data.password.new_password)

    if user_data.birthday: 
        profile.birthday = user_data.birthday


    profile.first_name = user_data.first_name
    profile.last_name = user_data.last_name

    db.commit()

    return user