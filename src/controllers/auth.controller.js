import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models';

const createUserToken = data => jwt.sign(data, process.env.APP_SECRET);

export const signUp = async (req, res, next) => {
  const { name, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    username,
    id: new mongoose.Types.ObjectId(),
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    const token = createUserToken({ userId: user.id });

    res.locals.data = {
      token,
      user: {
        name,
        username,
      },
    };

    next();
  } catch (e) {
    res.locals.entity = 'User';
    res.locals.error = e;
    next();
  }
};
