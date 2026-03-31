from fastapi import FastAPI
from routers import auth, tasks,users
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel
from core.database import engine
from models.user import User
from models.task import Task
from core.database import Base

app = FastAPI()

origins=[
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def create_db_and_tables():
    Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()