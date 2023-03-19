from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth.exceptions import AuthJWTException
from api import auth_router, generator_router

app = FastAPI()

# routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(generator_router, prefix="/generator", tags=["Generator"])

# exception handler
@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )