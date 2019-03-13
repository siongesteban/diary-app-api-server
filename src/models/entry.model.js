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
    coverUrl: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, getRequiredMessage('Category')],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
);

entrySchema.plugin(uniqueValidator);

export default mongoose.model('Entry', entrySchema);
