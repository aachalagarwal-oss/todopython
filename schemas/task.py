from pydantic import BaseModel
from enum import Enum
from datetime import datetime
from typing import Optional
class TaskStatus(str,Enum):
    pending="pending"
    in_progress="in_progress"
    completed="completed"

class create_tasks(BaseModel):
    title:str
    description:str
    status:TaskStatus=TaskStatus.pending
    
class TaskResponse(BaseModel):
    id:int
    title:str
    description:str
    status:str
    created_at:datetime


class UpdateTask(BaseModel):
    title:Optional[str]=None
    description:Optional[str]=None
    status:Optional[str]=None

class UpdateStatus(BaseModel):
    status:Optional[str]=None

   
     
        