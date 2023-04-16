import User, { IUserDocument } from '@Models/user';

export const findListAndTodoFromUser: () => Promise<IUserDocument> = async () =>
  User.findOne({
    $and: [{ isDeleted: false }],
  })
    .populate({
      path: 'lists',
      select: '-owner -__v -createdAt -updatedAt',
      populate: {
        path: 'todos',
        select: '-isDeleted -listId -__v -createdAt',
        options: {
          sort: {
            completed: 1, // 將 completed: true 的待辦事項排在前面
            updatedAt: -1, // 根據 updatedAt 降序排列
          },
        },
      },
    })
    .select('-__v -createdAt -updatedAt')
    .lean();
