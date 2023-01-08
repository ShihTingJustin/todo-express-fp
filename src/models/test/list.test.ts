import { faker } from '@faker-js/faker';
import { connection } from 'mongoose';
import { createSeederData } from '@Utils/mock';
import User from '@Models/user';
import List from '@Models/list';
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
  it('should create list', async () => {
    const userQuery = await User.findOne();

    const title = faker.word.noun();

    const list = new List({
      title,
      owner: userQuery?._id,
    });
    const newList = await list.save();

    const query = await List.findOne({ _id: newList._id });

    expect(query).not.toBeNull();
    expect(query?._id).not.toBeNull();
    expect(query?.title).toBe(title);
  });
});
