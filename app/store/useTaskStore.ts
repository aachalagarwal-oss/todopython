import {create} from "zustand"


type TaskStore={
    title:string,
    desc:string,
    isEditing:number | null;
    email:string
    password:string

    setTitle:(title:string)=>void;
    setDesc:(desc:string)=>void;
    setEditing:(id:number | null)=>void;
    setEmail:(email:string)=>void;
    setPassword:(password:string)=>void;

    reset:()=>void;
}




export const useTaskStore=create<TaskStore>((set)=>({
    title:"",
    desc:"",
    isEditing:null,
    email:"",
    password:"",


    setTitle:(title)=>set({title}),
    setDesc:(desc)=>set({desc}),
    setEditing:(id)=>set({isEditing:id}),
    setEmail:(email)=>set({email}),
    setPassword:(password)=>set({password}),

    reset:()=>
        set({
            title:"",
            desc:"",
            isEditing:null
        })
}));