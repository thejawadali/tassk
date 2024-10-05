/* eslint-disable @typescript-eslint/no-unused-vars */
import { db as prisma } from "@/utils/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { TaskType } from "../../../../types"

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

export async function GET(req: Request) {
  const url = new URL(req.url)
  const type = url.searchParams.get("type") as TaskType
  console.log(type)

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
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        ...obj
      },
    })
    return NextResponse.json({ tasks }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 400 })
  }
}