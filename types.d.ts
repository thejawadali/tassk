import mongoose from 'mongoose';

export interface Task extends mongoose.Document {
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  important: boolean;
}

export type TaskType = "all" | "completed" | "important" | "urgent"