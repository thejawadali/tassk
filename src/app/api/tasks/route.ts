import { NextResponse } from "next/server"

export async function POST(request: Request) {

  const { title, description, date, completed, important } = await request.json();
  if (!title || !description) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }
  const newTask = {
    title,
    description,
    date: new Date(date),
    completed,
    important,
  };
  return NextResponse.json(newTask, { status: 201 })
  
}