import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { getMinMessage, getMaxMessage, getRequiredMessage } from '../utils';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [15, getMaxMessage('Name', 15)],
      minlength: [3, getMinMessage('Name', 3)],
      required: [true, getRequiredMessage('Name')],
      unique: true,
    },
    description: {
      type: String,
      maxlength: [50, getMaxMessage('Description', 50)],
      minlength: [30, getMinMessage('Description', 30)],
      required: [true, getRequiredMessage('Description')],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, getRequiredMessage('Created By')],
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.plugin(uniqueValidator);

export default mongoose.model('Category', categorySchema);