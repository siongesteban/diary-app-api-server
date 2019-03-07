import jwt from 'jsonwebtoken';

import { User } from '../models';
import { AuthenticationError, NotFoundError } from '../lib';

const createUserToken = data => jwt.sign(data, process.env.APP_SECRET);

export const logIn = async payload => {
  const user = await User.findOne({ username: payload.username });

  if (!user) {
    throw new NotFoundError('User', 'username');
  }

  const passwordMatched = await user.comparePassword(payload.password);

  if (!passwordMatched) {
    throw new AuthenticationError('Invalid password.', 'password');
  }

  const { _id, name, username } = user;

  const token = createUserToken({ _id, name, username });

  const data = {
    token,
    user: {
      _id,
      name,
      username,
    },
  };

  return data;
};

export const signUp = async payload => {
  const { name, username, password } = payload;

  const newUser = new User({
    name,
    username,
    password,
  });

  const user = await newUser.save();
  const token = createUserToken({
    _id: user._id,
    name,
    username,
  });

  const data = {
    token,
    user: {
      _id: user._id,
      name,
      username,
    },
  };

  return data;
};
