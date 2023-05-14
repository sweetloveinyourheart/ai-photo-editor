from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth.exceptions import AuthJWTException
from api import auth_router, generator_router, user_router, remover_bg_router, payment_router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()
origins = [os.getenv('CLIENT_CORS_ORIGIN')]

# initial app
app = FastAPI()

# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routes
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(generator_router, prefix="/api/generator", tags=["Generator"])
app.include_router(user_router, prefix="/api/user", tags=["User"])
app.include_router(remover_bg_router, prefix="/api/background", tags=["Background"])
app.include_router(payment_router, prefix="/api/payment", tags=["Payment"])

# exception handler
@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )