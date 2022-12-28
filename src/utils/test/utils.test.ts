import { faker } from '@faker-js/faker';
import { connection } from 'mongoose';
import { TodoStatus } from '@Interfaces/I_todo';
import Todo from '@Models/todo';
import List from '@Models/list';
import db from '@Config/mongoose';
import app from '@Src/app';
import {
  addTodo,
  checkListIdValid,
  updateTodoByTodoId,
  getTodoAmountByListId,
  getListByListId,
} from '@Utils/index';

beforeAll(() => {
  const db = connection;
  db.once('open', () => console.log('mongodb connected'));
});

afterAll(async () => {
  await db.dropDatabase();
  await db.close();
});

describe('Negative', () => {
  it('[Utils] checkListIdValid', async () => {
    const res = await checkListIdValid('nothing');

    expect(res).toBeFalsy();
  });

  it('[Utils] updateTodoByTodoId', async () => {
    const res = await updateTodoByTodoId('nothing', {
      title: 'nothing',
      status: TodoStatus.UNFINISH,
    });

    expect(res).toBeFalsy();
  });

  it('[Utils] getTodoAmountByListId', async () => {
    const res = await getListByListId('nothing');

    expect(res).toBeFalsy();
  });
});

describe('Positive', () => {
  it('[Utils] addTodo', async () => {
    const listId = faker.datatype.uuid();
    const title = faker.internet.avatar();
    const status = TodoStatus.UNFINISH;

    const res = await addTodo({
      listId,
      title,
      status,
    });

    expect(res).not.toBeNull();
    expect(res?.id).not.toBeNull();
    expect(res?.listId).toBe(listId);
    expect(res?.title).toBe(title);
    expect(res?.status).toBe(status);
  });

  it('[Utils] checkListIdValid', async () => {
    const query = await Todo.findOne();
    const res = checkListIdValid(query!.listId);

    expect(res).toBeTruthy();
  });

  it('[Utils] updateTodoByTodoId', async () => {
    const randomTodo = await Todo.findOne();
    const title = faker.internet.avatar();
    const status = TodoStatus.FINISH;
    const res = await updateTodoByTodoId(randomTodo!.id, {
      title,
      status,
    });

    if (res) {
      expect(res).not.toBeNull();
      expect(res.id).not.toBeNull();
      expect(res.listId).not.toBeNull();
      expect(res.title).toBe(title);
    }
  });

  it('[Utils] getTodoAmountByListId', async () => {
    const testList = await List.create({ title: 'test' });
    const res = await getListByListId(testList!._id);

    expect(res).not.toBeNull();
    expect(res!.id).toStrictEqual(testList!._id);
    expect(res!.title).toStrictEqual(testList!.title);
  });
});
