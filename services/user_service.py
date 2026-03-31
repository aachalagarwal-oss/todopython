from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.user import User
from core.security import hash_password, verify_password, create_access_token
from sqlalchemy.exc import IntegrityError


class UserService:
    def __init__(self,db: Session):
        self.db = db  

    def create_user(self, email: str, password: str) -> User:
        new_user = User(email=email, password_hash=hash_password(password), is_active=True)
        try:
            self.db.add(new_user)
            self.db.commit()
            self.db.refresh(new_user)
            return new_user

        except IntegrityError:
            self.db.rollback()
            raise HTTPException(
                status_code=409,
                detail="Email already registered"
            )

    def authenticate_user(self, email: str, password: str) -> str | None:
        user = self.db.query(User).filter(User.email == email).first()
        if not user or not verify_password(password, user.password_hash):
            return None
        return create_access_token({"sub": str(user.id)})

    def get_user_by_id(self, user_id: int) -> User | None:
        return self.db.query(User).filter(User.id == user_id).first()
