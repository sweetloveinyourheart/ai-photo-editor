import os
import openai
from dotenv import load_dotenv
from fastapi import APIRouter
from .dto import TextGenerator

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

router = APIRouter()


@router.post("/text")
def generate_image_by_text(generator: TextGenerator):
    image = openai.Image.create(
        prompt=generator.decoration,
        n=generator.number,
        size="1024x1024"
    )

    return image

