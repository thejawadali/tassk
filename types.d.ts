export interface Task {
  id: string
  title: string
  description: string
  date: string
  completed: boolean
  important: boolean
}

export type TaskType = "all" | "completed" | "important" | "urgent"