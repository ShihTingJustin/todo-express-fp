import { faker } from '@faker-js/faker';
import { connection } from 'mongoose';
import List from '@Models/list';
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
  it('should create list', async () => {
    const title = faker.word.noun();

    const list = new List({ title });
    await list.save();

    const query = await List.findOne();

    expect(query).not.toBeNull();
    expect(query?._id).not.toBeNull();
    expect(query?.title).toBe(title);
  });
});
