from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.user import UserCreate, UserLogin, UserResponse
from dependencies.db import get_db
from services.user_service import UserService
router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(request: UserCreate, db: Session = Depends(get_db)):
    try:
        service=UserService(db)
        return service.create_user(request.email, request.password)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=400, detail="User with this email already exists")

@router.post("/login")
def login_user(request: UserLogin, db: Session = Depends(get_db)):
    service=UserService(db)
    token = service.authenticate_user(request.email, request.password)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    return {"access_token": token, "token_type": "bearer"}
