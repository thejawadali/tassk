/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { Task, TaskType } from "../../types";
import CreateTaskDialog from "../components/CreateTaskDialog";
import TaskItem from "./TaskItem";
import EmptyTaskItem from "./EmptyTaskItem";
import { useEffect, useState } from "react";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";

export default function Tasks({ type }: { type: TaskType }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const fetchTasks = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/tasks?type=" + type);
    setLoading(false);
    setTasks(data.tasks);
  };
  useEffect(() => {
    fetchTasks();
  }, []);


  function onToggleComplete(taskId: string) {
    const index = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  function onEditComplete(task: Task) {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((t) => t.id === task.id);
    newTasks[index] = task;
    setTasks(newTasks);
  }

  function onDeleteComplete(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }
  function onTaskCreated(task: Task) {
    setTasks([...tasks, task]);
  }


  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoaderCircleIcon className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-clamp">All Tasks</h1>
        {/* {taskToEdit?.title} */}
        <button
          className="rounded-full p-2 border border-dashed"
          onClick={() => setShowDialog(true)}
        >
          <PlusIcon size={20} />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteComplete={() => onDeleteComplete(task.id)}
            onToggleComplete={() => onToggleComplete(task.id)}
            onEditComplete={onEditComplete}
          />
        ))}
        <EmptyTaskItem onClick={() => setShowDialog(true)} />
      </div>
      <CreateTaskDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onTaskCreated={onTaskCreated}
      />
    </>
  );
}
