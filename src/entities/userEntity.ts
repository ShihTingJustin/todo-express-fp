import User from '@Models/user';

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
