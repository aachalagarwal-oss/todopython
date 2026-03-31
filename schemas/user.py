from pydantic import BaseModel
from datetime import datetime

# Request schema for user registration
class UserCreate(BaseModel):
    email: str
    password: str

# Request schema for login
class UserLogin(BaseModel):
    email: str
    password: str

class UserRead(BaseModel):
    id: int
    email: str
    is_active: bool

    model_config = {
        "from_attributes": True  # this replaces orm_mode in Pydantic v2
    }

# Response schema (never expose password hash)
class UserResponse(BaseModel):
    id: int
    email: str
    is_active: bool
    created_at: datetime

    model_config = {
        "from_attributes": True  # this replaces orm_mode in Pydantic v2
    }

