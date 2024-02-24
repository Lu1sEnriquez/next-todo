import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";
import { useEffect } from "react";

export default  async function RestTodosPage() {

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