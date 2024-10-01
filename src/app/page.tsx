// "use client";

import { Task } from "../../types"
import Tasks from "../components/Tasks"

export default function Home() {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      date: "2023-01-01",
      completed: false,
      important: false,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      date: "2023-01-02",
      completed: true,
      important: true,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      date: "2023-01-03",
      completed: false,
      important: false,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Description 4",
      date: "2023-01-04",
      completed: true,
      important: true,
    },
  ]
  return (
    <div className="">
      <Tasks title="All Tasks" tasks={tasks}></Tasks>
    </div>
  );
}
