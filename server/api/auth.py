import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from models import User, Profile, Plan
from database import get_db
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from .dto import SigninBody, Settings, SignupBody, OAuthBody
from utils import hash_pwd, check_pwd

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

router = APIRouter()


@AuthJWT.load_config
def get_config():
    return Settings()


@router.post("/signin")
def sign_in(user: SigninBody, auth: AuthJWT = Depends(), db: Session = Depends(get_db)):
    account = db.query(User).filter(User.email == user.email).first()
    if not account:
        raise HTTPException(status_code=401,detail="Bad email or password")

    is_valid_passwd = check_pwd(user.password, account.password)
    if not is_valid_passwd:
        raise HTTPException(status_code=401,detail="Bad email or password")
    
    access_token = auth.create_access_token(subject=user.email)
    refresh_token = auth.create_refresh_token(subject=user.email)
    return {"access_token": access_token, "refresh_token": refresh_token}


@router.get('/refresh')
def refresh(auth: AuthJWT = Depends()):
    auth.jwt_refresh_token_required()

    current_user = auth.get_jwt_subject()
    new_access_token = auth.create_access_token(subject=current_user,fresh=False)
    return {"access_token": new_access_token}


@router.post("/signup")
def sign_up(user: SignupBody, db: Session = Depends(get_db)):
    try:
        # create new user
        hashed_passwd = hash_pwd(user.password)

        new_user = User(email=user.email, password=hashed_passwd)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        #create member tier
        new_plan = Plan(
            user_id=new_user.id
        )
        db.add(new_plan)
        db.commit()
        db.refresh(new_plan)       

        # create new profile of created user
        new_profile = Profile(
            first_name=user.first_name, 
            last_name=user.last_name, 
            birthday=user.birthday, 
            user_id=new_user.id
        )

        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)

        return {"message": "New account registed!"}
    except:
        raise HTTPException(400, detail="Bad account information")
    
@router.post("/oauth")
def oauth(user: OAuthBody, auth: AuthJWT = Depends(), db: Session = Depends(get_db)):
    try:
        account = db.query(User).filter(User.email == user.email).first()
        if not account:
             # create new user
            new_user = User(email=user.email, password='')
            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            #create member tier
            new_plan = Plan(
                user_id=new_user.id
            )
            db.add(new_plan)
            db.commit()
            db.refresh(new_plan)
            
            # get first and last name
            words = user.name.split()
            first_name = words[0]
            last_name = " ".join(words[1:])

            # create new profile of created user
            new_profile = Profile(
                first_name=first_name, 
                last_name=last_name, 
                profile_pic=user.profile_pic, 
                user_id=new_user.id
            )

            db.add(new_profile)
            db.commit()
            db.refresh(new_profile)
        
        access_token = auth.create_access_token(subject=user.email)
        refresh_token = auth.create_refresh_token(subject=user.email)

        return {"access_token": access_token, "refresh_token": refresh_token}
    
    except:
        raise HTTPException(400, detail="Bad account information")