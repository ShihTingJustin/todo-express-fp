import request from 'supertest';
import { connection } from 'mongoose';
import { createSeederData } from '@Utils/mock';
import { db } from '@Config/mongoose';
import List from '@Models/list';
import app from '@Src/app';

beforeAll(async () => {
  const db = connection;
  db.once('open', () => console.log('mongodb connected'));
  await createSeederData();
});

afterAll(async () => {
  await db.dropDatabase();
  await db.close();
});

describe('GET /list/{listId}', () => {
  it('', async () => {
    // from createSeederData
    const list = await List.findOne({ title: 'Emergency' });
    const res = await request(app)
      .get(`/list/${list?._id}`)
      .set({ 'Content-Type': 'application/json' })
      .expect(200);

    expect(res).toBeTruthy();
    expect(res.body.status).toStrictEqual('success');
    expect(res.body.data.todos).toHaveLength(4);
  });
});
