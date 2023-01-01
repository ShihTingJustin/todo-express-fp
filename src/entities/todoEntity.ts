import List from '@Models/list';
import Todo, { ITodo } from '@Models/todo';
import { CreateTodoReqBody, UpdateTodoReqBody, SearchTodoBody } from '@Interfaces/I_todo';

export const getListByListId = (listId: string) => {
  return List.findById(listId).lean();
};

export const createTodo = (todo: CreateTodoReqBody) => {
  return Todo.create(todo);
};

export const updateTodo = (todo: ITodo) => {
  return Todo.findByIdAndUpdate(todo.id, todo, { new: true });
};

export const deleteTodo = (todoId: ITodo['id']) => {
  return Todo.findByIdAndUpdate(todoId, { isDeleted: true });
};

export const getTodoAmountByListId = ({
  listId,
  isDelete = false,
}: {
  listId: string;
  isDelete?: boolean;
}) => {
  return Todo.countDocuments({ listId, isDelete }).lean();
};

export const searchTodoByFilter = ({ keyword }: { keyword: string }) => {
  return Todo.find(
    {
      $or: [{ title: { $regex: new RegExp(keyword, 'i') } }],
      $and: [{ isDelete: false }],
    },
    {},
    {
      sort: { _id: 1 },
      limit: 10,
    },
  );
};
