import { Router } from 'express';

import authRouter from './auth.route';
import entryRouter from './entry.route';
import { response } from '../middlewares';

export default app => {
  const indexRouter = Router();

  indexRouter.use('/auth', authRouter);
  indexRouter.use('/entries', entryRouter);

  app.use('/api/v1', indexRouter, response);
};
