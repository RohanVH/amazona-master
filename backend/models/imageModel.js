import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img:
    {
        data: Buffer,
        contentType: String
    }
  }
);
const Image = mongoose.model('Image', imageSchema);
export default Image;
