import { Document, Schema, model } from 'mongoose';
import { TodoStatus, TodoPriority } from '@Interfaces/I_todo';

export interface ITodo extends Document {
  id: string;
  listId: string;
  title: string;
  status: TodoStatus;
  priority?: TodoPriority;
}

const todoSchema = new Schema<ITodo>({
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
    require: true,
    default: TodoStatus.UNFINISH,
  },
  priority: {
    type: String,
    require: false,
  },
});

export default model('TODO', todoSchema);
