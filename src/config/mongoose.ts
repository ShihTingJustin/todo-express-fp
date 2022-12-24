import { connect, connection } from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-express-fp';
connect(MONGODB_URI);
const db = connection;

db.on('error', () => console.log('mongodb error!'));
db.once('open', () => console.log('mongodb connected'));

export default db;
