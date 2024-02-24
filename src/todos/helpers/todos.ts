import { Todo } from "@prisma/client";

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {

    const body = { complete };

    const todo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())

    console.log(todo);

    return todo
}




export const createTodo = async (description: string): Promise<Todo> => {

    const body = { description };

    const todo = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())



    return todo
}


interface deleteTodoResponse { count: number }
export const deleteTodos = async (): Promise<deleteTodoResponse> => {



    const todo = await fetch(`/api/todos`, {
        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())

    console.log(todo);
    return todo
}