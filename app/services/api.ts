import { error } from "console";

const BASE_URL="http://localhost:8000";


export const loginUser=async (email:string,password:string)=>{
    try{
        const response=await fetch(`${BASE_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email,
                password
            })
        })

        const data=await response.json();
        if(!response.ok){
            throw new Error(data.detail || "login failed")
        }
        return data;
    }
    catch(error){
       throw error;
    }
}


export const posttask=async(title:string,desc:string)=>{
    const token=localStorage.getItem("token");
    try{
        const response=await fetch(`${BASE_URL}/tasks`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                title,
                description:desc
            })
        })

        const data=await response.json();
        if(!response.ok){
            throw new Error(data.detail || "Can't add your task")
        }
        return data
    }
    catch(error){
        throw error;
    }
}

export const gettask=async()=>{
    const token=localStorage.getItem("token");
    try{
        const res=await fetch(`${BASE_URL}/tasks`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            
        })
        const datafind=await res.json();
        if(!res.ok){
            throw new Error(datafind.detail || "Can't get your task")
        }
        return datafind
    }
    catch(error){
        throw error;
    }
}


export const updatetask=async(id:number,status:string)=>{
    const token=localStorage.getItem("token")
    try{
         const res=await fetch(`${BASE_URL}/tasks/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            status:status
        })
    })
    const data=await res.json();
    if(!res.ok){
        throw new Error(data.detail || "Can't update your task")
    }
    }
    catch(error){
        throw error
    }
   
}


export const updateanytask=async(id:number,title:string,description:string)=>{
    const token=localStorage.getItem("token")
    try{
         const res=await fetch(`${BASE_URL}/tasks/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            title:title,
            description:description
        })
    })
    const data=await res.json();
    if(!res.ok){
        throw new Error(data.detail || "Can't update your task")
    }
    }
    catch(error){
        throw error
    }
   
}


export const deletetask=async(id:number)=>{
    const token=localStorage.getItem("token")
    try{
        const res=await fetch(`${BASE_URL}/tasks/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${token}`
            },

        })
        const data=await res.json()
        if(!res.ok){
            throw new Error(data.detail || "Can't update your task")
        }
    }
    catch(error){
        throw error
    }
}