import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo

  const todo = await prisma.todo.createMany({
    data: [
      {
        description: "This is a test Todo",
        complete: true
      },
      {
        description: "This is a test Todo",
      },
      {
        description: "This is a test Todo",
        complete: true
      },
      {
        description: "This is a test Todo",
      },
    ],
  });

  console.log(todo);

  return NextResponse.json({
    message: "seed Executed",
  });
}
