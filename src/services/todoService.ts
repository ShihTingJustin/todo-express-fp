import { findListAndTodoFromUser } from '@Entities/userEntity';
import { createTodo, updateTodo } from '@Entities/todoEntity';
import { IUser } from '@Models/user';
import { ITodo } from '@Models/todo';
import { CreateTodoReqBody, UpdateTodoReqBody, SearchTodoBody } from '@Interfaces/I_todo';

type TodoData = {
  [key: string]: {
    listTitle: string;
    todo: Array<ITodo>;
  };
};

export const getListAndTodoByUser = async () => {
  try {
    const data = await findListAndTodoFromUser();
    if (data) {
      const { _id, name, lists } = data as unknown as IUser;
      const user = { id: _id, name };
      const list = lists.map((list) => ({
        id: list._id,
        title: list.title,
        todoAmount: list.todos.length,
      }));
      const todo = lists.reduce((acc, list) => {
        if (!(list._id in acc)) acc[list._id] = { listTitle: '', todo: [] };
        acc[list._id] = {
          listTitle: list.title,
          todo: list.todos,
        };
        return acc;
      }, {} as TodoData);

      return { user, list, todo };
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTodoService = async (todo: CreateTodoReqBody) => {
  try {
    const data = await createTodo(todo);
    if (data) {
      return {
        id: data._id,
        title: data.title,
        completed: data.completed,
      } as ITodo;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoService = async (todo: ITodo) => {
  try {
    const data = await updateTodo(todo);
    if (data) {
      return {
        id: data._id,
        title: data.title,
        completed: data.completed,
      } as ITodo;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
