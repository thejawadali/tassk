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
  const [taskToEdit, setTaskToEdit] = useState<Task>();
  

  const fetchTasks = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/tasks?type=" + type);
    setLoading(false);
    setTasks(data.tasks);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  function onOpenChange(open: boolean) {
    setShowDialog(open);
    if (!open) {
      setTaskToEdit(undefined);
    }
  }

  function onToggleComplete(taskId: string) {
    const index = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  async function deleteTask(taskId: string) {
    await axios.delete(`/api/tasks/${taskId}`);
    fetchTasks();
  }

  function openEditDialog(task: Task) {
    setTaskToEdit(task);
    setShowDialog(true);
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
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.completed}
            onDelete={() => deleteTask(task.id)}
            id={task.id}
            onToggleComplete={() => onToggleComplete(task.id)}
            onEdit={() => openEditDialog(task)}
          />
        ))}
        <EmptyTaskItem onClick={() => setShowDialog(true)} />
      </div>
      <CreateTaskDialog
        open={showDialog}
        onOpenChange={onOpenChange}
        task={taskToEdit}
        onTaskCreated={fetchTasks}
      />
    </>
  );
}
