import mongoose from 'mongoose';
const {Schema} = mongoose


const imageSchema = new Schema({
  imageData: {
    type: Buffer, // Store image as binary data (Buffer)
    required: true,
  },
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
