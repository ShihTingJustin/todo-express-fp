import request from 'supertest';
import { connection } from 'mongoose';
import { createSeederData } from '@Utils/mock';
import db from '@Config/mongoose';
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

describe('GET /list', () => {
  it('', async () => {
    const res = await request(app)
      .get('/list')
      .set({ 'Content-Type': 'application/json' })
      .expect(200);

    expect(res).toBeTruthy();
    expect(res.body.status).toStrictEqual('success');
    expect(res.body.data).toHaveLength(5);
  });
});
