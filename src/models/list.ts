import mongoose from 'mongoose';
const listSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
});

export default mongoose.model('LIST', listSchema);
