import { faker } from '@faker-js/faker';
import { connection } from 'mongoose';
import { createSeederData } from '@Utils/mock';
import List from '@Models/list';
import Todo from '@Models/todo';
import { db } from '@Config/mongoose';

beforeAll(async () => {
  const db = connection;
  db.once('open', () => console.log('mongodb connected'));
  await createSeederData();
});

afterAll(async () => {
  await db.dropDatabase();
  await db.close();
});

describe('save', () => {
  it('should create todo', async () => {
    const listQuery = await List.findOne();
    const title = faker.internet.avatar();
    const isCompleted = false;
    const isDeleted = false;

    const todo = new Todo({ listId: listQuery?._id, title, isCompleted, isDeleted });
    const newTodo = await todo.save();

    const query = await Todo.findOne({ _id: newTodo._id });

    expect(query).not.toBeNull();
    expect(query?._id).not.toBeNull();
    expect(query?.listId).toStrictEqual(listQuery?._id);
    expect(query?.title).toBe(title);
    expect(query?.completed).toBe(isCompleted);
    expect(query?.isDeleted).toBe(isDeleted);
  });
});
