import { Document, Schema, model, Types } from 'mongoose';

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

export default model('Todo', TodoSchema);
export interface ITodo extends Document {
  title: string;
  completed: boolean;
  priority: string;
  isDeleted: boolean;
  listId: Types.ObjectId;
}
