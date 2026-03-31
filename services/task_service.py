from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.task import Task
import models
from schemas.task import UpdateTask


class TaskService:
    def __init__(self,db: Session):
        self.db = db    

    def create_task(self, title: str, description: str, status: str, user_id: int):
        task = Task(
            title=title,
            description=description,
            status=status,
            user_id=user_id
        )
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task


        
    def get_task(self,user_id: int,limit:int=1,offset:int=1):
        query = self.db.query(models.task.Task).filter(models.task.Task.user_id == user_id)
        my_tasks = query.limit(limit).offset(offset).all()
        return my_tasks
        
    
    def get_task_by_id(self,user_id: int,id:int):
        my_tasks = self.db.query(models.task.Task).filter(models.task.Task.user_id == user_id,Task.id == id).first()
        if my_tasks is None:
            raise HTTPException(
                status_code=404,
                detail=f"No task with id {id} found for this user"
            )

        return my_tasks
        

    def update_task(self,id:int, user_id: int,request:UpdateTask):
        
        task = self.db.query(Task).filter(
            Task.id == id,
            Task.user_id == user_id
        ).first()

        if task is None:
            raise HTTPException(
                status_code=404,
                detail=f"Task with id {id} not found"
            )


        update_data=request.dict(exclude_unset=True)

        for key,value in update_data.items():
            setattr(task,key,value)


        self.db.commit()
        self.db.refresh(task)

        return task

    def delete_task(self,user_id: int,id:int):
        my_tasks = self.db.query(models.task.Task).filter(models.task.Task.user_id == user_id,Task.id == id).first()
        if my_tasks is None:
            raise HTTPException(
                status_code=404,
                detail=f"No task with id {id} found for this user"
            )

        self.db.delete(my_tasks)
        self.db.commit()
        return 'The task is deleted'