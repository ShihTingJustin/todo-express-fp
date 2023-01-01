import List from '@Models/list';

export const findListByListId = (listId: string) => {
  return List.findById(listId)
    .populate({
      path: 'todos',
      select: '-isDeleted -listId -__v -createdAt -updatedAt',
    })
    .select('-owner -__v -createdAt -updatedAt')
    .lean();
};
