from fastapi import APIRouter, UploadFile, Response, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from rembg import remove
import os 

router = APIRouter()

@router.post("/remove-bg")
async def remove_bg(file: UploadFile, authorize: AuthJWT = Depends()):
    try:
        authorize.jwt_required()

        uploaded_image = await file.read()
        removed_image = remove(uploaded_image)

        return Response(content=removed_image, media_type="image/png")
    except:
        raise HTTPException(404, detail="Some thing went wrong. Please try again")