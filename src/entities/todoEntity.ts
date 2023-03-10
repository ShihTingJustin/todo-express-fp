import Todo from '@Models/todo';
import { ITodo } from '@Interfaces/I_todo';
import { CreateTodoReqBody, UpdateTodoReqBody } from '@Interfaces/I_todo';

export const createTodo = (todo: CreateTodoReqBody) => {
  return Todo.create(todo);
};

export const updateTodo = (todo: UpdateTodoReqBody) => {
  return Todo.findOneAndUpdate({ _id: todo.id }, todo, { new: true });
};

export const softDeleteTodo = (todoId: ITodo['id']) => {
  return Todo.findOneAndUpdate({ _id: todoId }, { isDeleted: true }, { new: true });
};

export const getTodoAmountByListId = ({
  listId,
  isDeleted = false,
}: {
  listId: string;
  isDeleted?: boolean;
}) => {
  return Todo.countDocuments({ listId, isDeleted }).lean();
};

export const findTodoByFilter = async (keyword: string) => {
  return Todo.find(
    {
      $or: [{ title: { $regex: new RegExp(keyword, 'i') } }],
      $and: [{ isDeleted: false }],
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
