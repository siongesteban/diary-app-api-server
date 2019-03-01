import { Router } from 'express';

import { sendResponse } from '../utils';
import { createEntry, patchEntry } from '../controllers';

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

router.patch('/:id', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(
    patchEntry(req.body, params),
    'Entry',
    res,
    next,
  );
});

export default router;
