"use client";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TaskItem({
  title,
  description,
  date,
  isCompleted,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div
      onClick={onEdit}
      className="py-[1.2rem] cursor-pointer relative px-4 rounded-2xl group bg-zinc-100 dark:bg-zinc-700 shadow border-2 dark:border-zinc-600 border-zinc-200 h-[16rem] flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold max-h-[1.8rem] truncate">
          {title}
        </h1>
        <button className="min-w-4" onClick={onDelete}>
          <TrashIcon size={16} />
        </button>
      </div>
      <p className="text-sm overflow-hidden h-32">{description}</p>
      {/* date */}
      <p className="text-sm opacity-50">{date}</p>
      {/* footer */}
      <div className="flex items-center gap-5">
        <Button className="w-full">
          Mark as {isCompleted ? "Incomplete" : "Complete"}
        </Button>
      </div>
    </div>
  );
}
