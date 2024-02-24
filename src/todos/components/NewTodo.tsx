"use client";

import { Todo } from "@prisma/client";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as apiTodo from "../helpers/todos";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const NewTodo = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim() === "") return;
    const todo = await apiTodo.createTodo(description);
    router.refresh();
    setDescription("");
  };

  const deleteCompleted = async () => {
    const deletedTodos = await apiTodo.deleteTodos();
    console.log(`Deleted ${deletedTodos} todos`);

    if (deletedTodos.count == 0) {
      Swal.fire({
        title: "No hay tareas para eliminar",
        text: "click para cerrar",
        icon: "question",
      });
      return;
    }

    Swal.fire({
      title: "Eliminados Correctamente",
      text: "click para cerrar",
      icon: "success",
    });
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Borrar Completados</span>
      </button>
    </form>
  );
};
