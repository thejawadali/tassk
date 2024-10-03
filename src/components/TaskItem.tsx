"use client";
import dayjs from "dayjs";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  return (
    <>
      <div
        onClick={onEdit}
        className="py-[1.2rem] hover:shadow-2xl cursor-pointer relative px-4 rounded-2xl group bg-zinc-100 dark:bg-zinc-700 border-2 dark:border-zinc-600 border-zinc-200 h-[16rem] flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold max-h-[1.8rem] truncate">
            {title}
          </h1>
          <Popover open={showConfirmation} onOpenChange={setShowConfirmation}>
            <PopoverTrigger asChild>
              <button
                className="min-w-4"
                onClick={(e) => {e.stopPropagation();setShowConfirmation(true)}}
              >
                <TrashIcon size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent onClick={(e) => e.stopPropagation()}>
              <div className="">
                <h1>Are you sure you want to delete this task?</h1>
                <div className="flex items-center gap-x-2 mt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      onDelete();
                      setShowConfirmation(false);
                    }}
                    className="w-full"
                  >
                    Yes
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowConfirmation(false)}
                    className="w-full"
                  >
                    No
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* date */}
        <p className="text-sm opacity-50">
          {dayjs(date).format("MMM D, YYYY")}
        </p>
        <p className="text-sm overflow-hidden h-32">{description}</p>
        {/* footer */}
        <div className="flex items-center gap-5">
          <Button className="w-full">
            Mark as {isCompleted ? "Incomplete" : "Complete"}
          </Button>
        </div>
      </div>
    </>
  );
}
