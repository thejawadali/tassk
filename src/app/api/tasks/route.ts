import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import { auth } from "@clerk/nextjs/server"
const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { title, description, date, completed, important } = await request.json()
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        userId,
        completed,
        important
      },
    })
    return NextResponse.json({ task }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: "Error creating task" }, { status: 400 })
  }
}

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId
      }
    })
    return NextResponse.json({ tasks }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 400 })
  }
}