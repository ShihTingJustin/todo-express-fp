import { Document, Schema, model, Types } from 'mongoose';
import { IListDocument } from '@Models/list';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lists: [
      {
        type: Types.ObjectId,
        required: true,
        ref: 'List',
      },
    ],
  },
  { timestamps: true },
);

export default model('User', UserSchema);
export interface IUserDocument extends Document {
  name: string;
  lists: Array<IListDocument>;
}
