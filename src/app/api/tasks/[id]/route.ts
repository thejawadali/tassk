/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Task from "@/models/Task"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { userId } = auth()
    const { id } = params
    debugger
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const { title, description, date, completed, important } = await request.json()
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const task = await Task.findByIdAndUpdate(id, {
      title,
      description,
      date,
      completed,
      important
    }, { new: true })

    return NextResponse.json({ task }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: "Error updating task", status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { userId } = auth()
    const { id } = params

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const task = await Task.findByIdAndDelete(id)

    return NextResponse.json({ task }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task", status: 400 })
  }
}