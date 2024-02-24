"use client";
import { Todo } from "@prisma/client";
import React from "react";
import { TodoItem } from ".";

import * as TodosApi from "@/todos/helpers";
import { updateTodo } from "../helpers/todos";
import { useRouter } from "next/navigation";
interface Props {
  todos?: Todo[];
}
export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();

  const toggleTodo = async (id: string, complete: boolean) => {
    const updateTodo = await TodosApi.updateTodo(id, complete);
    router.refresh();
    return updateTodo
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}></TodoItem>
      ))}
    </div>
  );
};
