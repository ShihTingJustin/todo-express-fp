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
  return Todo.findOneAndUpdate({ _id: todo.id }, todo, { new: true });
};

export const softDeleteTodo = (todoId: ITodo['id']) => {
  return Todo.findOneAndUpdate({ _id: todoId }, { isDeleted: true }, { new: true });
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

export const findTodoByFilter = (keyword: string) => {
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
  )
    .populate({
      path: 'listId',
      select: '-owner -todos -__v -createdAt -updatedAt',
    })
    .select('-__v -createdAt -updatedAt');
};
