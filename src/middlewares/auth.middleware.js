import jwt from 'jsonwebtoken';

import { User } from '../models';
import { AuthenticationError } from '../lib';
import { errorResponse } from './response.middleware';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AuthenticationError(null, null, {
        reason: 'No authorization provided.',
      });
    }

    const token = authorization.replace('Bearer ', '');

    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    if (!userId) {
      throw new AuthenticationError(null, null, {
        reason: 'Invalid token.',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AuthenticationError(null, null, {
        reason: 'User does not exist.',
      });
    }
  } catch (e) {
    res.locals.modelName = 'User';
    res.locals.error = e;

    return errorResponse(req, res);
  }

  return next();
};
