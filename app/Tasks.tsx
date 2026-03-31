"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import UpdateTodoForm from "./UpdateTodoForm";
import AddTodoForm from "./AddTodoform";
import Taskbox from "./TaskBox";
import { useTaskStore } from "./store/useTaskStore";
import { posttask, updateanytask } from "./services/api";

export default function Tasks() {
    
   const queryClient=useQueryClient();
   const {title,desc,isEditing,setTitle,setDesc,setEditing,reset}=useTaskStore();


    const tasksMutation=useMutation({
        mutationFn:({title,desc}:{title:string,desc:string})=>{
            return posttask (title,desc)
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey: ["tasks"]})
            alert("Task added")
            console.log(data)
            
        },
        onError:(error:any)=>{
            alert(error.message || "task adding failed")
        }

    })


    const updatemutate = useMutation({
        mutationFn: ({
          id,
          title,
          description,
        }: {
          id: number;
          title: string;
          description: string;
        }) => {
          return updateanytask (id, title, description);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["tasks"]})
          alert("Task updated");
        },
    });

    const handleUpdateClick=()=>{
      if(!isEditing) return ;
      updatemutate.mutate({id:isEditing,title,description:desc})
    }

    const handleClick=()=>{
        tasksMutation.mutate({title,desc})
    }
  return (
    <div className=" w-100 center flex flex-col border-4 p-4 m-auto ">
      <div className="p-2">
        <h3 className="text-3xl font-bold text-center mb-6"> Todo Manager</h3> 
      </div>
      <div>
        {isEditing?(<UpdateTodoForm />):(<AddTodoForm />)}

        {isEditing? <button onClick={handleUpdateClick}  className="border-3  bg-blue-800 ">+ Update Todo</button>:<button onClick={handleClick}  className="border-3  bg-blue-600 ">+ Add Todo</button>}
        
      </div>
     <Taskbox />
    </div>
  );
}
