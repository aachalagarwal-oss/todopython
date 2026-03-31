from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from core.security import decode_access_token
from dependencies.db import get_db
from services.user_service import UserService

bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
):
    # Extract token
    token = credentials.credentials

    # Decode JWT
    payload = decode_access_token(token)
    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    # Use SERVICE (not direct DB function)
    service = UserService(db)
    user = service.get_user_by_id(int(user_id))

    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return user
