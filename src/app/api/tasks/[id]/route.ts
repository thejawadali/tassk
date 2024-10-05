/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(_req: Request,
  { params }: { params: { id: string } }) {

  try {
    const { userId } = auth()
    const { id } = params
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const task = await prisma.task.findUnique({
      where: {
        id,
        userId
      },
    })
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 400 })
    }
    return NextResponse.json({ task }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Error getting task", status: 400 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    const { id } = params
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const { title, description, date, completed, important } = await request.json()
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const task = await prisma.task.update({
      where: {
        id,
        userId
      },
      data: {
        title,
        description,
        date,
        completed,
        important
      },
    })

    return NextResponse.json({ task }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: "Error updating task", status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    const { id } = params

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const task = await prisma.task.delete({
      where: {
        id, userId
      },
    })

    return NextResponse.json({ task }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task", status: 400 })
  }
}