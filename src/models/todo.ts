import { Document, Schema, model } from 'mongoose';
import { ITodo, TodoStatus, TodoPriority } from '@Interfaces/I_todo';

export interface MTodo extends Omit<ITodo, 'id'>, Document<string> {
  isDelete: boolean;
}

const todoSchema = new Schema<MTodo>({
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
  isDelete: {
    type: Boolean,
    require: false,
  },
});

export default model('TODO', todoSchema);
