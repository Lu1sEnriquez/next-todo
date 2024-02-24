import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = +(searchParams.get("take") ?? "10"); // + sirve para convertir string a numero
  const skip = Number(searchParams.get("skip") ?? "0"); // sirve para convertir string a numero

  if (isNaN(+take)) {
    return NextResponse.json(
      { message: "take tiene que ser un numero" },
      { status: 400 }
    );
  }
  if (isNaN(+skip)) {
    return NextResponse.json(
      { message: "skip tiene que ser un numero" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });
  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false), //! TODO mostrar algo interesante
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: {
        complete,
        description,
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}


export async function DELETE(request: Request) {
try {
  
  const deletedTodos = await prisma.todo.deleteMany({
    where: {
      complete: true,

    }
  })
 
  
  return NextResponse.json(deletedTodos)
} catch (error) {
  return NextResponse.json({count: 0})
  
}
}
