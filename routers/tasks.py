from fastapi import APIRouter,Depends,HTTPException,status
from dependencies.auth import get_current_user
from typing import Annotated
from schemas import task
from models import task
from models.task import Task
from dependencies import db
import schemas
import models
from schemas.task import TaskResponse
# from services.task_service import TaskService, create_task,get_task,get_task_by_id,update_task,delete_task
from sqlalchemy.orm import Session
from typing import Optional,List
from services.task_service import TaskService


router=APIRouter(
    prefix="/tasks",
    tags=['tasks']
)


get_db=db.get_db

user_dependency=Annotated[dict,Depends(get_current_user)]


@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_tasks(
    user: user_dependency,
    request: schemas.task.create_tasks,
    db: Session = Depends(get_db)
):
    try:
        service=TaskService(db)
        return service.create_task(
            title=request.title,
            description=request.description,
            status=request.status,
            user_id=user.id
        )
    
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get('/', response_model=List[TaskResponse])
async def get_tasks(user:user_dependency,db:Session=Depends(get_db),offset: int = 1, limit: int = 10):
    try:
        service=TaskService(db)
        return service.get_task(user_id=user.id, limit=limit, offset=offset)
    

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch tasks"
        )


@router.get('/{id}')
async def get_tasks(id:int,user:user_dependency,db:Session=Depends(get_db)):
    try:
        service=TaskService(db)
        my_tasks=service.get_task_by_id(user_id=user.id,id=id)
        return my_tasks
    

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch task"
        )
    

    



@router.put('/{id}')
async def update(id:int,user:user_dependency,request:schemas.task.UpdateTask,db:Session=Depends(get_db)):
    try:
        service=TaskService(db)
        return service.update_task(id=id,user_id=user.id,request=request)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update task"
        )





@router.delete('/{id}')
async def delete(id:int,user:user_dependency,db:Session=Depends(get_db)):
    try:
        service=TaskService(db)
        return service.delete_task(user_id=user.id,id=id)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete task"
        )





