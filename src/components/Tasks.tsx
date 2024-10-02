"use client";
import axios from "axios";
import { Task, TaskType } from "../../types";
import CreateTaskDialog from "../components/CreateTaskDialog";
import TaskItem from "./TaskItem";
import EmptyTaskItem from "./EmptyTaskItem";
import { useEffect, useState } from "react";

export default function Tasks({ type }: { type: TaskType }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchTasks = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/tasks?type=" + type);
    setLoading(false);
    setTasks(data.tasks);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div className="">Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-clamp">All Tasks</h1>
        <CreateTaskDialog></CreateTaskDialog>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.completed}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        ))}
        <EmptyTaskItem onClick={() => {}} />
      </div>
    </>
  );
}
