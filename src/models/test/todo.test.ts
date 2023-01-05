import { faker } from '@faker-js/faker';
import { connection } from 'mongoose';
import Todo from '@Models/todo';
import { db } from '@Config/mongoose';

beforeAll(() => {
  const db = connection;
  db.once('open', () => console.log('mongodb connected'));
});

afterAll(async () => {
  await db.dropDatabase();
  await db.close();
});

describe('save', () => {
  it('should create todo', async () => {
    const listId = faker.datatype.uuid();
    const title = faker.internet.avatar();
    const isCompleted = false;
    const isDelete = false;

    const todo = new Todo({ listId, title, isCompleted, isDelete });
    await todo.save();

    const query = await Todo.findOne();

    expect(query).not.toBeNull();
    expect(query?._id).not.toBeNull();
    expect(query?.listId).toBe(listId);
    expect(query?.title).toBe(title);
    expect(query?.completed).toBe(status);
    expect(query?.isDeleted).toBe(isDelete);
  });
});
