import List from '@Models/list';

export const findListByListId = (listId: string) => {
  return List.findOne({
    $and: [{ _id: listId, isDeleted: false }],
  })
    .populate({
      path: 'todos',
      select: '-isDeleted -listId -__v -createdAt',
      options: {
        sort: {
          completed: 1, // 將 completed: true 的待辦事項排在前面
          updatedAt: -1, // 根據 updatedAt 降序排列
        },
      },
    })
    .select('-owner -__v -createdAt -updatedAt')
    .lean();
};
