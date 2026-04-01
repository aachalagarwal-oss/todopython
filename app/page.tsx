"use client";

import { loginUser } from "./services/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginUser(email, password);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      alert("Login successful ");
      router.push("/tasks");
    },
    onError: (error: any) => {
      alert(error.message || "Login failed");
    },
  });

  const onSubmit = (data:any) => {
    loginMutation.mutate(data);
  };
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="first">Name:</label>
        <input id="first" {...register("email")} />
      </div>
       <div>
        <label htmlFor="second">Password:</label>
        <input id="second" {...register("password")} />
      </div>
      <Button type="submit">{loginMutation.isPending?"Logging in":"Login"}</Button>
      </form>

    </>
  );
}
