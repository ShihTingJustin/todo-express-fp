import request from 'supertest';
import { connection } from 'mongoose';
import { createSeederData } from '@Utils/mock';
import { db } from '@Config/mongoose';
import app from '@Src/app';
import List from '@Models/list';

beforeAll(async () => {
  const db = connection;
  db.once('open', () => console.log('mongodb connected'));
  await createSeederData();
});

afterAll(async () => {
  await db.dropDatabase();
  await db.close();
});

describe('GET /todo/', () => {
  it('', async () => {
    const res = await request(app)
      .get(`/todo/`)
      .set({ 'Content-Type': 'application/json' })
      .expect(200);

    console.log(res.body);
    expect(res).toBeTruthy();
    expect(res.body.status).toStrictEqual('success');
    expect(res.body.data).toBeTruthy();
    expect(res.body.data.list).toHaveLength(5);
  });
});
