import { Document, Schema, model, Types } from 'mongoose';
import User from '@Models/user';
import List from '@Models/list';

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    completed: {
      type: Boolean,
      require: true,
      default: false,
    },
    priority: {
      type: String,
      require: false,
    },
    isDeleted: {
      type: Boolean,
      require: false,
      default: false,
    },
    listId: {
      type: Types.ObjectId,
      required: true,
      ref: 'List',
    },
  },
  { timestamps: true },
);

TodoSchema.post('save', async function (next) {
  try {
    const todo = this;
    await List.updateOne({ _id: todo.listId }, { $addToSet: { todos: todo._id } });
    // next();
  } catch (error) {
    console.log(error);
  }
});

export default model('Todo', TodoSchema);
export interface ITodo extends Document {
  title: string;
  completed: boolean;
  priority: string;
  isDeleted: boolean;
  listId: Types.ObjectId;
}
