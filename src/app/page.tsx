"use client";
// import CreateTaskDialog from "../components/CreateTaskDialog"

import TaskItem from "../components/TaskItem";

export default function Home() {
  return (
    <div className="lg:w-[25%]">
      <TaskItem
        title={"Complete that shit"}
        description={
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, cupiditate."
        }
        date={""}
        isCompleted={false}
        onDelete={() => {}}
        onEdit={() => {}}
      ></TaskItem>
    </div>
  );
}
