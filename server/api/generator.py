import os
import openai
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from .dto import TextGenerator
from fastapi_jwt_auth import AuthJWT
from utils import rate_limit, limit_check
from sqlalchemy.orm import Session
from database import get_db
from models import User, Plan

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

router = APIRouter()

@router.post("/text")
def generate_image_by_text(generator: TextGenerator, authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):

        authorize.jwt_required()

        current_user = authorize.get_jwt_subject()
        account = db.query(User, Plan).join(Plan).filter(User.email == current_user).first()

        # limit request by user tier
        accept_request = limit_check(current_user, account[1].generation_limited)
        if not accept_request:
            raise HTTPException(status_code=403,detail="Rate limit exceeded. Please try again later or upgrade to premium tier!")

        try:
            image = openai.Image.create(
                prompt=generator.decoration,
                n=generator.number,
                size="1024x1024",
                response_format='b64_json'
            )

            rate_limit(current_user)

            return image
        except Exception as e:
            print(e)
            raise HTTPException(400, detail="Draw failed, check your word and try again")

