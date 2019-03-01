import { Router } from 'express';

import { sendResponse } from '../utils';
import { createEntry } from '../controllers';

const router = Router();

router.post('/', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(
    createEntry(req.body, params),
    'Entry',
    res,
    next,
  );
});

export default router;
