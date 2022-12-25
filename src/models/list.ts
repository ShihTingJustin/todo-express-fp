import { Document, Schema, model } from 'mongoose';
import { IList } from '@Interfaces/I_list';

interface MList extends Omit<IList, 'id'>, Document<string> {}

const listSchema = new Schema<MList>({
  title: {
    type: String,
    require: true,
  },
});

export default model('LIST', listSchema);
