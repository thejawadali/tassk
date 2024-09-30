"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "./ui/datepicker";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "../hooks/use-toast"

export default function CreateTaskDialog() {
  const { toast } = useToast()
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: new Date(),
      completed: false,
      important: false,
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string(),
      date: yup.date().nullable(),
      completed: yup.boolean(),
      important: yup.boolean(),
    }),
    onSubmit: async(values) => {
      console.log(values);
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      console.log(response);
      
      toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Provide key information such as task name, description and due date etc.
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
              onCheckedChange={(checked) => formik.setFieldValue("completed", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="important">Toggle Important</Label>
            <Switch
              id="important"
              checked={formik.values.important}
              onCheckedChange={(checked) => formik.setFieldValue("important", checked)}
            />
          </div>
          <Button className="w-full mt-4" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
