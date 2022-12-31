import { faker } from '@faker-js/faker';
import User from '@Models/user';
import List from '@Models/list';
import Todo from '@Models/todo';

export const createSeederData = async () => {
  try {
    const mockList = ['Reminders', 'Grocery List', 'Habits', 'Family', 'Emergency'];

    const userRes = await User.create({ name: 'John Wick' });
    const listRes = await List.create(
      mockList.map((list) => ({
        owner: userRes._id,
        title: list,
      })),
    );
    await User.findByIdAndUpdate(userRes._id, { lists: listRes });
    const mockTodo = listRes
      .map((list, index) =>
        Array.from({ length: index }, () => ({
          listId: list._id,
          title: faker.word.noun(),
          status: false,
          isDelete: false,
        })),
      )
      .flat();
    const todoRes = await Todo.create(mockTodo);
    await Promise.all(
      todoRes.map((todo) => {
        return List.findByIdAndUpdate(todo.listId, { $addToSet: { todos: todo } });
      }),
    );
  } catch (error) {
    console.log(error);
  }
};
