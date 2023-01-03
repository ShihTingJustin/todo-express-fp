import { Document, Schema, model, Types, Error } from 'mongoose';
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

TodoSchema.post('save', async function (doc: ITodo) {
  try {
    console.log(36, { doc });
    await List.updateOne({ _id: doc.listId }, { $addToSet: { todos: doc._id } });
  } catch (error) {
    console.log(error);
  }
});

// https://github.com/Automattic/mongoose/issues/964
TodoSchema.post('findOneAndUpdate', async function (doc: ITodo) {
  try {
    await List.updateOne({ _id: doc.listId }, { $pull: { todos: doc._id } });
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
