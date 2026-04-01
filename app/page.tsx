"use client"


import { loginUser } from "./services/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputBox from "./InputBox";
import { useTaskStore } from "./store/useTaskStore";
import { Button } from "@/components/ui/button"
export default function Home() {
 const {email,password,setEmail,setPassword}=useTaskStore();
  const router=useRouter();

  const loginMutation=useMutation({
    mutationFn:({email,password}:{email:string,password:string})=>{
      return loginUser(email,password)
    },
    onSuccess:(data)=>{
        localStorage.setItem("token",data.access_token)
         alert("Login successful ");
         router.push("/tasks")
    },
    onError:(error:any)=>{
        alert(error.message || "Login failed")
      }
  })

  const handleClick=()=>{
    loginMutation.mutate({email,password})
  }
  return (
    <div>
      <InputBox
        labeltext="Username"
        inputtext="Enter your username"
        value={email}
        onInputChange={(val) => setEmail(val)}
      />
      <InputBox
        labeltext="password"
        inputtext="Enter your password"
        value={password}
        onInputChange={(val) => setPassword(val)}
        type="password"
      />
      <Button onClick={handleClick}>{loginMutation.isPending?"Logging in":"Login"}</Button>
    </div>
  );
}
