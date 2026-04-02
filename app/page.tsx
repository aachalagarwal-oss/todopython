/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "./services/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";


export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginUser(email, password);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      toast("Login sucessful", { position: "bottom-right" })
      router.push("/tasks");
    },
    onError: (error: any) => {
      alert(error.message || "Login failed");
    },
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white/30 backdrop-blur-sm ">
      <Card className="w-full max-w-sm  bg-[#FFFFFF1A]">
        <CardHeader>
          <CardTitle className="text-black dark:text-white">Login to your account</CardTitle>
          <CardDescription className="text-black dark:text-white">
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" className="text-black dark:text-white">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label htmlFor="first" className="text-black dark:text-white">Name:</label>
                <Input id="first" {...register("email")} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <label htmlFor="second" className="text-black dark:text-white">Password:</label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-black dark:text-white"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="second" {...register("password")} type="password"/>
              </div>
            </div>

            <Button type="submit" className="w-full mt-2 bg-[#00D4FF] text-[#002244]">
              {loginMutation.isPending ? "Logging in" : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Card>
    </div>
  );
}
