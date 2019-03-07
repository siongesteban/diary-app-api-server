import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { getMinMessage, getMaxMessage, getRequiredMessage } from '../utils';

const entrySchema = new Schema(
  {
    title: {
      type: String,
      maxlength: [100, getMaxMessage('Title', 100)],
      minlength: [3, getMinMessage('Title', 3)],
      required: [true, getRequiredMessage('Title')],
      unique: true,
    },
    content: {
      type: String,
      required: [true, getRequiredMessage('Content')],
    },
    type: {
      type: String,
      enum: ['academic', 'fitness', 'health', 'religious', 'travel', 'work'],
      required: [true, getRequiredMessage('Entry Type')],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, getRequiredMessage('Category')],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

entrySchema.plugin(uniqueValidator);

export default mongoose.model('Entry', entrySchema);
