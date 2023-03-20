from fastapi import APIRouter, UploadFile, Response, Depends
from fastapi_jwt_auth import AuthJWT
from rembg import remove
import os 

router = APIRouter()

@router.post("/remove-bg")
async def remove_bg(file: UploadFile, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    uploaded_image = await file.read()
    removed_image = remove(uploaded_image)

    return Response(content=removed_image, media_type="image/png")