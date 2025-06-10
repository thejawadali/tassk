/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { auth } from "@clerk/nextjs/server"
import { Task as ITask, TaskType } from "../../../../types"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const type = url.searchParams.get("type") as TaskType

  let obj = {}
  switch (type) {
    case "all":
      obj = {}
      break

    case "important":
      obj = { important: true }
      break

    case "completed":
      obj = { completed: true }
      break
    case "urgent":
      const startOfToday = new Date()
      startOfToday.setHours(0, 0, 0, 0)
      const endOfToday = new Date()
      endOfToday.setHours(23, 59, 59, 999)
      obj = {
        important: true, completed: false, date: {
          gte: startOfToday,
          lte: endOfToday,
        }
      }

    default:
      break
  }
  try {
    await connectDB();
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const tasks = await Task.find({ ...obj, userId });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await request.json();
    const task: ITask = await Task.create({ ...body, userId });

    if (!task.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }


    return NextResponse.json(task);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}