"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import UpdateTodoForm from "../UpdateTodoForm";
import AddTodoForm from "../AddTodoform";
import Taskbox from "../TaskBox";
import { useTaskStore } from "../store/useTaskStore";
import { posttask, updateanytask } from "../services/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "../theme";
export default function Tasks() {
  const queryClient = useQueryClient();
  const { title, desc, isEditing, setTitle, setDesc, setEditing, reset } =
    useTaskStore();

  const tasksMutation = useMutation({
    mutationFn: ({ title, desc }: { title: string; desc: string }) => {
      return posttask(title, desc);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      alert("Task added");
      console.log(data);
    },
    onError: (error: any) => {
      alert(error.message || "task adding failed");
    },
  });

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
      return updateanytask(id, title, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      alert("Task updated");
    },
  });

  const handleUpdateClick = () => {
    if (!isEditing) return;
    updatemutate.mutate({ id: isEditing, title, description: desc });
    reset();
  };

  const handleClick = () => {
    tasksMutation.mutate({ title, desc });
    reset();
  };
  return (
    <div className=" w-100 center flex flex-col border-4 p-4 m-auto bg-[#EFE9E3] ">
      <div className="p-2 flex flex-col">
        <div>
          <CardHeader>
            <CardTitle >Todo Manager</CardTitle>
            <CardDescription>Manage your todos here</CardDescription>
          </CardHeader>
          <ModeToggle />
        </div>
      </div>
      <div>
        {isEditing ? <UpdateTodoForm /> : <AddTodoForm />}

        {isEditing ? (
          <Button
            onClick={handleUpdateClick}
            className="border-3 bg-[#444546] mb-5"
          >
            + Update Todo
          </Button>
        ) : (
          <Button onClick={handleClick} className="border-3  bg-[#444546] mb-5">
            + Add Todo
          </Button>
        )}
      </div>
      <Taskbox />
    </div>
  );
}
