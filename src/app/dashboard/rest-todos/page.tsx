export const dynamic = 'force-dynamic'
export const revalidate = 0;  // `revalidate` is not a valid option for Next.js API routes, so we set


import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";
import { useEffect } from "react";

export default  async function RestTodosPage() {
  console.log('construido');

const todos = await prisma.todo.findMany({orderBy:{description:"asc"}});


  return (
    <div>
      <div className=" w-full px-3 mx-5 mb-5">
        <NewTodo></NewTodo>
      </div>
      {/* TODO: Formulario para agregar */}
     <TodosGrid todos={todos}></TodosGrid>
    </div>
  );
}