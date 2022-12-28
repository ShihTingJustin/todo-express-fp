import { faker } from '@faker-js/faker';
import List from '@Models/list';
import Todo from '@Models/todo';
import { TodoStatus } from '@Interfaces/I_todo';

export const createSeederData = async () => {
  try {
    const mockList = ['Reminders', 'Grocery List', 'Habits', 'Family', 'Emergency'];
    const listRes = await List.create(mockList.map((list) => ({ title: list })));
    const mockTodo = listRes
      .map((list, index) =>
        Array.from({ length: index }, () => ({
          listId: list._id,
          title: faker.word.noun(),
          status: TodoStatus.UNFINISH,
          isDelete: false,
        })),
      )
      .flat();

    await Todo.create(mockTodo);
  } catch (error) {
    console.log(error);
  }
};
