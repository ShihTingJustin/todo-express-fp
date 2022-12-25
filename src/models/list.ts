import { Document, Schema, model } from 'mongoose';

export interface IList extends Document {
  title: string;
}

const listSchema = new Schema<IList>({
  title: {
    type: String,
    require: true,
  },
});

export default model('LIST', listSchema);
