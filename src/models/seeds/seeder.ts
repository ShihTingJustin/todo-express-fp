import Todo from '@Models/todo';
import db from '@Config/mongoose';

db.once('open', async () => {
  try {
    console.log('run seeder...');
    await Todo.create({ title: 'test', completed: false });
    console.log('seeder complete!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
});
