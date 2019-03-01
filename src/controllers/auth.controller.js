import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { User } from '../models';

const createUserToken = data => jwt.sign(data, process.env.APP_SECRET);

export const signUp = async payload => {
  const { name, username, password } = payload;

  const newUser = new User({
    name,
    username,
    password,
    id: new mongoose.Types.ObjectId(),
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
