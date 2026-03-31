import { deletetask, gettask, updateanytask, updatetask } from "./services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTaskStore } from "./store/useTaskStore";

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
      alert("Updated");
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
      alert(`Task deleted`);
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
          <div
            className="shadow-md rounded-xl p-5 border hover:shadow-lg transition duration-200"
            key={index}
          >
            <div className="border-4 p-4 m-auto gap-6">
              <div
                className={`text-white text-xl font-semibold ${task.status == "completed" ? "line-through text-gray-400" : "text-black"}`}
              >
                {task.title}
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-white  text-xl font-semibold ${task.status == "completed" ? "line-through text-gray-400" : "text-black"}`}
                >
                  {task.description}
                </span>

                <button
                  onClick={() => handleClick(task.id, task.status)}
                  className=" text-white px-3 py-1 rounded"
                >
                  ☑
                </button>

              </div>

              <div
                className={`text-white  text-xl font-semibold ${task.status == "completed" ? "line-through text-gray-400" : "text-black"}`}
              >
                Created at : {date.toLocaleDateString()} on{" "}
                {date.toLocaleTimeString()}
              </div>

              <button
                onClick={() =>
                  handleUpdateTask(task.id, task.title, task.description)
                }
                className=" text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className=" text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
