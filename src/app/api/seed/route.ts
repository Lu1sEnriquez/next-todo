import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo

  const todo = await prisma.todo.createMany({
    data: [
      {
        description: "Piedra del alma",
        complete: true
      },
      {
        description: "Piedra del espacio",
      },
      {
        description: "Piedra del poder",
        complete: true
      },
      {
        description: "Piedra del tiempo",
      },
    ],
  });

  console.log(todo);

  return NextResponse.json({
    message: "seed Executed",
  });
}
