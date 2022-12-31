import { ITodo } from '@Models/todo';
import { Document, Schema, model, Types } from 'mongoose';

const listSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    todos: [
      {
        type: Types.ObjectId,
        required: true,
        ref: 'Todo',
      },
    ],
  },
  { timestamps: true },
);

export default model('List', listSchema);
export interface IList extends Document {
  owner: Types.ObjectId;
  title: string;
  todos: Array<ITodo>;
}
