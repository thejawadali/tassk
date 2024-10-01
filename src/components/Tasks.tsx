"use client";
import { Task } from "../../types";
import CreateTaskDialog from "../components/CreateTaskDialog";
import TaskItem from "./TaskItem";
import EmptyTaskItem from "./EmptyTaskItem";

interface Props {
  tasks: Task[];
  title: string;
}

export default function Tasks({ tasks, title }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-clamp">{title}</h1>
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
