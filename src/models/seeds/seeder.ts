import { faker } from '@faker-js/faker';
import List from '@Models/list';
import Todo from '@Models/todo';
import db from '@Config/mongoose';
import { TodoStatus } from '@Interfaces/I_todo';

const mockList = ['Reminders', 'Grocery List', 'Habits', 'Family', 'Emergency'];

db.once('open', async () => {
  try {
    console.log('run seeder...');

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

    console.log('seeder complete!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
});
