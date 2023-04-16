import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import isEmpty from 'lodash.isempty';
import { findListAndTodoFromUser } from '@Entities/userEntity';
import { createTodo, updateTodo, softDeleteTodo, findTodoByFilter } from '@Entities/todoEntity';
import { IUserDocument } from '@Models/user';
import { ITodoDocument } from '@Models/todo';
import { IListDocument } from '@Models/list';
import { ITodo, CreateTodoReqBody, UpdateTodoReqBody } from '@Interfaces/I_todo';

type TodoItem = {
  id: string;
  title: string;
  todo: Array<Pick<ITodo, 'id' | 'title' | 'completed'>>;
};

type TodoData = {
  [key: string]: TodoItem;
};

const formatResponse = (data: IUserDocument) => {
  const { _id, name, lists } = data;
  const user = { id: _id, name };
  const list = lists.map((list) => ({
    id: list._id,
    title: list.title,
    incompleteTodoAmount: list.todos.filter((todo) => !todo.completed).length,
  }));
  const todo = lists.reduce((acc, list) => {
    if (!(list._id in acc)) acc[list._id] = {} as TodoItem;
    acc[list._id] = {
      id: list._id,
      title: list.title,
      todo: list.todos.map((todo) => ({
        id: todo._id,
        title: todo.title,
        completed: todo.completed,
      })),
    };
    return acc;
  }, {} as TodoData);

  return { user, list, todo };
};

export const getListAndTodoByUserService = () =>
  pipe(
    TE.tryCatch(
      () => findListAndTodoFromUser(),
      (reason) => new Error(String(reason)),
    ),
    TE.map((data) => formatResponse(data)),
  )();

export const createTodoService = async (todo: CreateTodoReqBody) => {
  try {
    const data = await createTodo(todo);
    return !isEmpty(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoService = async (todo: UpdateTodoReqBody) => {
  try {
    const data = await updateTodo(todo);
    return !isEmpty(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoService = async (todoId: string) => {
  try {
    const data = await softDeleteTodo(todoId);
    return data?.isDeleted ?? null;
  } catch (error) {
    console.log(error);
  }
};

const formatSearchResponse = (data: Array<ITodoDocument & { listId: IListDocument }>) => {
  return Object.values(
    data.reduce((acc, curr) => {
      const { listId, _id, title, completed } = curr;
      if (!(curr.listId._id in acc)) {
        acc[curr.listId._id] = { id: listId._id, title: listId.title, todo: [] };
      }
      acc[listId._id].todo.push({ id: _id, title, completed });
      return acc;
    }, {} as TodoData),
  );
};

export const searchTodoService = (keyword: string) =>
  pipe(
    TE.tryCatch(
      () => findTodoByFilter(keyword),
      (reason) => new Error(String(reason)),
    ),
    TE.map((data) =>
      formatSearchResponse(data as unknown as Array<ITodoDocument & { listId: IListDocument }>),
    ),
  )();
