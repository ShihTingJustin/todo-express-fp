import { findListByListId } from '@Entities/listEntity';
import { IListDocument } from '@Models/list';

export const getListByListId = async (listId: string) => {
  try {
    const data = await findListByListId(listId);
    if (data) {
      const { _id, title, todos } = data as unknown as IListDocument;
      return {
        id: _id,
        title,
        todo: todos.map((todo) => {
          const { _id, ...rest } = todo;
          return { id: todo._id, ...rest };
        }),
        incompleteTodoAmount: todos.filter((todo) => !todo.completed).length,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
