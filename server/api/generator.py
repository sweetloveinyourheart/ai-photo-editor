import os
import openai
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, UploadFile
from .dto import TextGenerator
from fastapi_jwt_auth import AuthJWT

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

router = APIRouter()


@router.post("/text")
def generate_image_by_text(generator: TextGenerator, authorize: AuthJWT = Depends()):
    # authorize.jwt_required()

    image = openai.Image.create(
        prompt=generator.decoration,
        n=generator.number,
        size="1024x1024",
        response_format='b64_json'
    )

    return image

@router.post("/variation")
async def generate_variation(file: UploadFile, authorize: AuthJWT = Depends()):
    # authorize.jwt_required()
    bytes = await file.read()

    image = openai.Image.create_variation(
        image=bytes,
        n=1,
        size="1024x1024"
    )

    return image