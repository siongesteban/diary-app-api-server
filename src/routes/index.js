import { Router } from 'express';

import { response, auth } from '../middlewares';
import authRouter from './auth.route';
import categoryRouter from './category.route';
import entryRouter from './entry.route';
import userRouter from './user.route';

export default app => {
  const indexRouter = Router();

  indexRouter.use('/auth', authRouter);
  indexRouter.use('/categories', auth, categoryRouter);
  indexRouter.use('/entries', auth, entryRouter);
  indexRouter.use('/users', auth, userRouter);

  app.use('/api/v1', indexRouter, response);
};
