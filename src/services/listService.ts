import { findListByListId } from '@Entities/listEntity';
import { DList } from '@Models/list';

export const getListByListId = async (listId: string) => {
  try {
    const data = await findListByListId(listId);
    if (data) {
      const { _id, title, todos } = data as unknown as DList;
      return {
        id: _id,
        title,
        todos: todos.map((todo) => {
          const { _id, ...rest } = todo;
          return { id: todo._id, ...rest };
        }),
      };
    }
  } catch (error) {
    console.log(error);
  }
};
