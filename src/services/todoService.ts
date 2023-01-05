import { Either } from 'fp-ts/Either';
import { TaskEither as TE, tryCatch } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import isEmpty from 'lodash.isempty';
import { findListAndTodoFromUser } from '@Entities/userEntity';
import { createTodo, updateTodo, softDeleteTodo, findTodoByFilter } from '@Entities/todoEntity';
import { DUser } from '@Models/user';
import { DTodo } from '@Models/todo';
import { DList } from '@Models/list';
import { ITodo, CreateTodoReqBody, UpdateTodoReqBody, SearchTodoBody } from '@Interfaces/I_todo';

type TodoData = {
  [key: string]: {
    listTitle: string;
    todo: Array<Pick<ITodo, 'id' | 'title' | 'completed'>>;
  };
};

type Error = 'error';

const getUserData = (data: DUser) => ({ id: data._id, name: data.name });
const getListData = (data: DUser) => data;

const getAllData = (): TE<Error, any> =>
  tryCatch(
    async () => {
      const data = await findListAndTodoFromUser();
      if (isEmpty(data)) throw new Error('error');
      console.log(28, data);
      return data;
    },
    (error) => error as unknown as Error,
  );

const gatherData = (data: DUser) => {
  const { _id, name, lists } = data;
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

// FP().then(
//   Either.fold(
//     (error) => console.error(error),
//     (todo) => console.log(todo),
//   ),
// );

export const getListAndTodoByUserService = async () => {
  try {
    const data = await findListAndTodoFromUser();
    const FP = () => pipe(data, gatherData);
    console.log(FP());
    if (data) {
      const { _id, name, lists } = data as unknown as DUser;
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
          todo: list.todos.map((todo) => ({
            id: todo._id,
            title: todo.title,
            completed: todo.completed,
          })),
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

export const searchTodoService = async (keyword: string) => {
  try {
    const data = (await findTodoByFilter(keyword)) as unknown as Array<
      DTodo & { listId: Pick<DList, '_id' | 'title'> }
    >;
    const gatherTodoByListId = data.reduce(
      (acc, curr) => {
        const { listId, _id, title, completed } = curr;
        if (!(curr.listId._id in acc)) {
          acc[curr.listId._id] = { id: listId._id, title: listId.title, todo: [] };
        }
        acc[listId._id].todo.push({ id: _id, title, completed });
        return acc;
      },
      {} as {
        [key: string]: {
          id: string;
          title: string;
          todo: Array<Pick<ITodo, 'id' | 'title' | 'completed'>>;
        };
      },
    );

    return Object.values(gatherTodoByListId);
  } catch (error) {
    console.log(error);
  }
};
