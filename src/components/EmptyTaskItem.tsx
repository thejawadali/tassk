"use client";

import { PlusIcon } from "lucide-react";

export default function TaskItem({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="py-[1.2rem] hover:shadow-2xl cursor-pointer relative px-4 rounded-2xl group bg-transparent border-dashed border-2 dark:border-zinc-600 border-zinc-200 h-[16rem] flex items-center justify-center"
    >
      <p className="flex items-center gap-x-2">
        <PlusIcon size={20} /> Add New Task
      </p>
    </div>
  );
}
