import { Router } from 'express';

import entryRouter from './entry.route';

export default app => {
  const indexRouter = Router();

  indexRouter.use('/entries', entryRouter);

  app.use('/api/v1', indexRouter);
};
