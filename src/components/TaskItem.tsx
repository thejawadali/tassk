"use client";
import dayjs from "dayjs";
import axios from "axios";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import CreateTaskDialog from "./CreateTaskDialog";
import { Task } from "../../types";

interface Props {
  task: Task;
  onDeleteComplete: () => void;
  onToggleComplete: () => void;
  onEditComplete: (task: Task) => void;
}

export default function TaskItem({
  task,
  onDeleteComplete,
  onToggleComplete,
  onEditComplete,
}: Props) {
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  async function toggleTaskCompleteStatus(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();
    setStatusUpdating(true);
    try {
      await axios.patch(`/api/tasks/${task._id}/toggle-complete`, {
        completed: !task.completed,
      });
      onToggleComplete();
    } catch (error) {
      console.log(error);
    } finally {
      setStatusUpdating(false);
    }
  }

  async function deleteTask() {
    setLoading(true);
    try {
      await axios.delete(`/api/tasks/${task._id}`);
      onDeleteComplete();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        onClick={() => (loading ? null : setShowEditDialog(true))}
        className="py-[1.2rem] hover:shadow-2xl cursor-pointer relative px-4 overflow-hidden rounded-2xl group bg-zinc-100 dark:bg-zinc-700 border-2 dark:border-zinc-600 border-zinc-200 h-[16rem] flex flex-col gap-2"
      >
        {loading && (
          <div className="absolute inset-0 bg-background flex items-center justify-center opacity-50 z-10">
            <LoaderCircleIcon className="mr-2 h-10 w-10 animate-spin text-foreground" />
          </div>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold max-h-[1.8rem] truncate">
            {task.title}
          </h1>
          <Popover open={showConfirmation} onOpenChange={setShowConfirmation}>
            <PopoverTrigger asChild>
              <button
                className="min-w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmation(true);
                }}
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
                      deleteTask();
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
          {dayjs(task.date).format("MMM D, YYYY")}
        </p>
        <p className="text-sm overflow-hidden h-32">{task.description}</p>
        {/* footer */}
        <div className="flex items-center gap-5">
          <Button
            className="w-full"
            onClick={toggleTaskCompleteStatus}
            loading={statusUpdating}
            variant={task.completed ? "destructive" : "default"}
          >
            Mark as {task.completed ? "Incomplete" : "Complete"}
          </Button>
        </div>
      </div>
      <CreateTaskDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onTaskCreated={onEditComplete}
        task={task}
      />
    </>
  );
}
