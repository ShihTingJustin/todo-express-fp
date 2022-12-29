import { connect, connection } from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-express-fp';

connect(MONGODB_URI).then(
  () => console.log('MongoDB connected'),
  (error) => console.log(error),
);

const db = connection;
export default db;
