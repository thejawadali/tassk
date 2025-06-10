/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Task from "@/models/Task"
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { userId } = auth()
    const { id } = params
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const { completed } = await request.json()
    const task = await Task.findOneAndUpdate(
      {_id: id, userId}, 
      {completed},
      {new: true}
    )

    return NextResponse.json({ task }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: "Error updating task" }, { status: 400 })
  }
}
