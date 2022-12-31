import { connect, connection, set } from 'mongoose';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './.env.development' });
} else {
  dotenv.config();
}

set('debug', process.env.NODE_ENV === 'development');
set('strictQuery', true);

const MONGODB_URI = process.env.MONGODB_URI!;
connect(MONGODB_URI).then(
  () => console.log('MongoDB connected'),
  (error) => console.log(error),
);

const db = connection;
export { db };
