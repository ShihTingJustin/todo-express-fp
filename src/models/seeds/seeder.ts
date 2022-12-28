import { faker } from '@faker-js/faker';
import List from '@Models/list';
import Todo from '@Models/todo';
import db from '@Config/mongoose';
import { TodoStatus } from '@Interfaces/I_todo';
import {createSeederData} from '@Utils/mock'

db.once('open', async () => {
  try {
    console.log('run seeder...');
    await createSeederData();
    console.log('seeder complete!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
});
