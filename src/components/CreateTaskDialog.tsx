"use client";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Task } from "../../types";
import { useToast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datepicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  onTaskCreated: (task: Task) => void;
}

export default function CreateTaskDialog({
  open,
  onOpenChange,
  task,
  onTaskCreated,
}: Props) {
  const [savingTask, setSavingTask] = useState(false);
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      date: new Date(task?.date || new Date()),
      completed: task?.completed || false,
      important: task?.important || false,
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string(),
      date: yup.date().nullable(),
      completed: yup.boolean(),
      important: yup.boolean(),
    }),
    onSubmit: async (values) => {
      setSavingTask(true);
      let response = null;
      if (task) {
        // updating
        response = await axios.put(`/api/tasks/${task.id}`, values);
      } else {
        // create new one
        response = await axios.post("/api/tasks", values);
      }

      onTaskCreated(response.data.task as Task);
      onOpenChange(false);
      setSavingTask(false);
      console.log(response);

      toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Update" : "Create"} New Task</DialogTitle>
          <DialogDescription>
            Provide key information such as task name, description and due date
            etc.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <Input
            id="title"
            placeholder="Enter title"
            label="Enter Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched.title}
            error={formik.errors.title}
          />
          <Textarea
            id="description"
            placeholder="Enter description"
            label="Enter Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched.description}
            error={formik.errors.description}
          />
          <DatePicker
            value={formik.values.date}
            className="w-full"
            onSelect={(date) => formik.setFieldValue("date", date)}
            id="date"
            label="Due Date"
          />
          <div className="flex items-center justify-between">
            <Label htmlFor="completed">Toggle Completed</Label>
            <Switch
              id="completed"
              checked={formik.values.completed}
              onCheckedChange={(checked) =>
                formik.setFieldValue("completed", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="important">Toggle Important</Label>
            <Switch
              id="important"
              checked={formik.values.important}
              onCheckedChange={(checked) =>
                formik.setFieldValue("important", checked)
              }
            />
          </div>
          <Button className="w-full mt-4" type="submit" loading={savingTask}>
            {task ? "Update" : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
