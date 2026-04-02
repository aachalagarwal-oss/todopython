"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateTodoForm from "../UpdateTodoForm";
import AddTodoForm from "../AddTodoform";
import Taskbox from "../TaskBox";
import { useTaskStore } from "../store/useTaskStore";
import { posttask, updateanytask } from "../services/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
      toast("Todo added", { position: "bottom-right" });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

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
      toast("Task updated", { position: "bottom-right" })
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%] xl:w-[50%] mx-auto px-4 sm:px-6 md:px-8 py-6 
flex flex-col rounded-2xl  bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 shadow-xls border-2">
      <div className="p-2 flex flex-col ">
        <div className="flex items-center justify-between">
          <CardHeader className="text-center w-full">
            <CardTitle className=" text-black dark:text-white text-xl md:text-2xl">Todo Manager</CardTitle>
            <CardDescription className="text-black dark:text-white">
              Manage your todos here
            </CardDescription>
          </CardHeader>
          <ModeToggle />
        </div>
      </div>
      <div>
        {isEditing ? <UpdateTodoForm /> : <AddTodoForm />}

        {isEditing ? (
          <Button
            onClick={handleUpdateClick}
            className="border-3 bg-[#38bdf8] mb-5 w-full"
          >
            + Update Todo
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            className="border-3  bg-[#38bdf8] mb-5 w-full"
          >
            + Add Todo
          </Button>
        )}
      </div>
      <Taskbox />
    </div>
  );
}
