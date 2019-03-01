import { Router } from 'express';

import authRouter from './auth.route';
import entryRouter from './entry.route';
import { response, auth } from '../middlewares';

export default app => {
  const indexRouter = Router();

  indexRouter.use('/auth', authRouter);
  indexRouter.use('/entries', auth, entryRouter);

  app.use('/api/v1', indexRouter, response);
};
