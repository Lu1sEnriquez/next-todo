'use server'



import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const sleep = (seconds: number = 0): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000)
    })
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

    const todo = await prisma.todo.findFirst({
        where: { id }
    })

    if (!todo) {
        throw `Todo con id ${id} no encontrado`;
    }

    const updatedTodo = prisma.todo.update({
        where: { id },
        data: {
            complete: complete
        }
    })
    revalidatePath('/dashboard/server-todos')
    return updatedTodo
}

export const addTodo = async (description: string) => {
    try {

        const todo = await prisma.todo.create({
            data: {
                description,
            },
        });
        revalidatePath('/dashboard/server-todos')

        return todo
    } catch (error) {
        return {
            message: 'Error creando todo'
        }
    }
}


interface deleteTodoResponse { count: number }
export const deleteCompleted = async (): Promise<deleteTodoResponse> => {
    try {

        const result = await prisma.todo.deleteMany({
            where: {
                complete: true
            }
        })


        return result;
    } catch (error) {
        return {
            count: 0
        };
    }
}
