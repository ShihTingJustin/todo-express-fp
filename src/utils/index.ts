import List from '@Models/list';
import Todo, { MTodo } from '@Models/todo';
import { ITodo, CreateTodoReqBody } from '@Interfaces/I_todo';

export async function checkListIdValid(listId: string) {
  try {
    const data = await List.findById(listId).exec();
    return !!data?._id;
  } catch (err) {
    console.log(err);
  }
}

export async function addTodo(todo: CreateTodoReqBody) {
  try {
    const data = await Todo.create({ ...todo, isDelete: false });
    const newTodo: ITodo = {
      id: data._id,
      title: data.title,
      status: data.status,
      listId: data.listId,
    };
    return newTodo;
  } catch (err) {
    console.log(err);
  }
}

export async function updateTodoByTodoId(todoId: ITodo['id'], update: Partial<MTodo>) {
  try {
    const data = await Todo.findByIdAndUpdate(todoId, update, { new: true });
    if (!data) return false;

    const newTodo: ITodo = {
      id: data._id,
      title: data.title,
      status: data.status,
      listId: data.listId,
    };
    return newTodo;
  } catch (err) {
    console.log(err);
  }
}

export const getTodoAmountByListId = async ({
  listId,
  isDelete = false,
}: {
  listId: string;
  isDelete?: boolean;
}) => {
  try {
    const todoAmount = await Todo.countDocuments({ listId, isDelete }).exec();
    return todoAmount;
  } catch (error) {
    console.log(error);
  }
};

export const getListByListId = async (listId: string) => {
  try {
    const data = await List.findById(listId);
    if (data) {
      const result = {
        id: data._id,
        title: data?.title,
      };
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchTodoByFilter = async ({ keyword }: { keyword: string }) => {
  try {
    const reg = new RegExp(keyword, 'i');

    const data = await Todo.find(
      {
        $or: [{ title: { $regex: reg } }],
      },
      {},
      {
        sort: { _id: 1 },
        limit: 10,
      },
    ).exec();

    const result = data.map((item) => ({
      id: item._id,
      title: item.title,
      listId: item.listId,
      status: item.status,
    }));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const groupTodoByList = async (todo: ITodo[]) => {
  try {
    const todoData = todo.reduce((acc, curr) => {
      if (!(curr.listId in acc)) acc[curr.listId] = [];
      acc[curr.listId].push(curr);
      return acc;
    }, {} as { [key: ITodo['listId']]: ITodo[] });

    const allListId = Object.keys(todoData);

    const listData = await Promise.all(
      allListId.map(async (listId) => {
        const list = await getListByListId(listId);
        return list;
      }),
    );

    const groupData = listData?.map((list) => ({
      ...list,
      todo: todoData[list?.id || ''],
    }));

    return groupData;
  } catch (error) {
    console.log(error);
  }
};
