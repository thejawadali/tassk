import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import { auth } from "@clerk/nextjs/server"
const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {


    const { userId } = auth()
    console.log(userId);
    
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
    debugger
    console.log(error)

    return NextResponse.json({ error: "Error creating task" }, { status: 400 })

  }
}