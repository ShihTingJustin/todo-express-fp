import { db } from '@Config/mongoose';
import { createSeederData } from '@Utils/mock';

db.once('open', async () => {
  try {
    console.log('run seeder...');
    await createSeederData();
    console.log('seeder complete!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
});
