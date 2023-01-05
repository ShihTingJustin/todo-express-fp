import { Query, LeanDocument } from 'mongoose';
import User, { DUser } from '@Models/user';
import { DTodo } from '@Models/todo';

type UserListTodoData = {
  name: string;
  List: {
    title: string;
    todos: Array<DTodo>;
  };
};

export const findListAndTodoFromUser = () => {
  return User.findOne({
    $and: [{ isDeleted: false }],
  })
    .populate({
      path: 'lists',
      select: '-owner -__v -createdAt -updatedAt',
      populate: {
        path: 'todos',
        select: '-isDeleted -listId -__v -createdAt -updatedAt',
      },
    })
    .select('-__v -createdAt -updatedAt')
    .lean();
};
