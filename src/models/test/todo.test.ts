import { faker } from '@faker-js/faker';
import { connection } from 'mongoose';
import { TodoStatus } from '@Interfaces/I_todo';
import Todo from '@Models/todo';
import db from '@Config/mongoose';

beforeAll(() => {
  const db = connection;
  db.once('open', () => console.log('mongodb connected'));
});

afterAll(async () => {
  await db.dropDatabase();
  await db.close();
});

describe('save', () => {
  it('should create user', async () => {
    const listId = faker.datatype.uuid();
    const title = faker.internet.avatar();
    const status = TodoStatus.UNFINISH;
    const isDelete = false;

    const todo = new Todo({ listId, title, status, isDelete });
    await todo.save();

    const fetched = await Todo.findOne();

    expect(fetched).not.toBeNull();
    expect(fetched?._id).not.toBeNull();
    expect(fetched?.listId).toBe(listId);
    expect(fetched?.title).toBe(title);
    expect(fetched?.status).toBe(status);
    expect(fetched?.isDelete).toBe(isDelete);
  });
});
