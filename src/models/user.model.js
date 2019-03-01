import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';
import { getMinMessage, getMaxMessage, getRequiredMessage } from '../utils';

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [50, getMaxMessage('Name', 50)],
      minlength: [3, getMinMessage('Name', 3)],
      required: [true, getRequiredMessage('Name')],
    },
    username: {
      type: String,
      required: [true, getRequiredMessage('Username')],
      minlength: [6, getMinMessage('Username', 6)],
      maxlength: [15, getMaxMessage('Username', 15)],
      unique: true,
      validate: {
        validator: value => /^[a-zA-Z0-9]+$/.test(value),
        message: () => 'Username must be alphabetic only.',
      },
    },
    password: {
      type: String,
      minlength: [8, getMinMessage('Password', 8)],
      required: [true, getRequiredMessage('Password')],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function hashPassword(next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
