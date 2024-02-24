import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { todo } from "node:test";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: { id }, // Find a single item by its unique constraint
  });

  return todo;
};

//  the segments contain all  of the path after the domain name.
export async function GET(request: Request, { params }: Segments) {
  const id = params.id;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ message: "todo not found" }, { status: 404 });
  }

  return NextResponse.json({ todo });

  // return new Response(JSON.stringify(todo),{status :200 , headers:{ 'Content-Type': 'application/json'}});
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const id = params.id;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo con ${id} no existe` },
      { status: 404 }
    );
  }
  try {
    const { complete, description, ...rest } = await putSchema.validate(
      await request.json()
    ); // obtiene el body request.json()

    const UpdateTodo = await prisma.todo.update({
      where: { id }, // Find a single item by its unique constraint
      data: {
        description,
        complete,
      },
    });

    return NextResponse.json({ UpdateTodo });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }

  // return new Response(JSON.stringify(todo),{status :200 , headers:{ 'Content-Type': 'application/json'}});
}
