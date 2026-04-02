import { deletetask, gettask, updateanytask, updatetask } from "./services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button"
import Image from 'next/image'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTaskStore } from "./store/useTaskStore";
import { EditIcon } from "lucide-react";
import { toast } from "sonner";

type Task = {
  title: string;
  description: string;
  id: number;
  created_at: string;
  status: string;
};
export default function Taskbox() {
  const {setTitle,setDesc,setEditing}=useTaskStore();

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => gettask(),
  });
  const mutate = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return updatetask(id, status);
    },
    onSuccess: () => {
       toast("Task status updated", { position: "bottom-right" })
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      alert(error.message || "Task couldn't be completed");
    },
  });


  const deletemutate = useMutation({
    mutationFn: (id: number) => {
      return deletetask(id);
    },
    onSuccess: () => {
       toast("Task deleted", { position: "bottom-right" })
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  function handleUpdateTask(id: number, title: string, description: string) {
    {
      setTitle(title);
      setDesc(description);
      setEditing(id);
    }
   
  }
  function handleClick(id: number, status: string) {
    mutate.mutate({
      id,
      status: status == "completed" ? "pending" : "completed",
    });
  }
  function handleDeleteTask(id: number) {
    deletemutate.mutate(id);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error..</div>;
  return (
    <>
      {data?.map((task, index) => {
        const date = new Date(task.created_at);
        return (
        <Card className="w-full mb-10 bg-white" key={index}>
             
              <CardContent>
              <div
                className={`text-xl font-semibold ${task.status == "completed" ? "line-through text-gray-400" : "text-black"}`}
              >
                {task.title}
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={` text-xl font-semibold ${task.status == "completed" ? "line-through text-gray-400" : "text-black"}`}
                >
                  {task.description}
                </span>

                <Button
                  onClick={() => handleClick(task.id, task.status)}
                  className="px-3 py-1 rounded"
                >
                  ☑
                </Button>

              </div>

              <div
                className={` text-xs font-semibold mb-5 ${task.status == "completed" ? "line-through text-gray-400" : "text-black"}`}
              >
                Created at : {date.toLocaleDateString()} on{" "}
                {date.toLocaleTimeString()}
              </div>

              <Button
                onClick={() =>
                  handleUpdateTask(task.id, task.title, task.description)
                }
                className="bg-gray-200  px-3 py-1 rounded"
              >
               ✏️
              </Button>
              <Button
                onClick={() => handleDeleteTask(task.id)}
                className=" bg-gray-200  px-3 py-1 rounded"
              >
                ❌
              </Button>
            </CardContent>
             </Card>
        );
      })}
    </>
  );
}
