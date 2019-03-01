import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models';

const createUserToken = data => jwt.sign(data);

export const signUp = async payload => {
  const { name, username, password } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    username,
    id: new mongoose.Types.ObjectId(),
    password: hashedPassword,
  });

  const user = await newUser.save();
  const token = createUserToken({ userId: user.id });

  const data = {
    token,
    user: {
      name,
      username,
    },
  };

  return data;
};
