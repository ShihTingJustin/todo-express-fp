import mongoose from 'mongoose';
import { TodoStatus } from '@Interfaces/I_todo';

const todoSchema = new mongoose.Schema({
  listId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: TodoStatus.UNFINISH,
  },
});

export default mongoose.model('TODO', todoSchema);
