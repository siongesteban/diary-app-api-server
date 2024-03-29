import { Router } from 'express';

import { sendResponse } from '../utils';
import {
  findEntries,
  getEntry,
  createEntry,
  patchEntry,
  deleteEntry,
} from '../controllers';

const router = Router();

router.get('/', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(findEntries(params), 'Entry', res, next);
});

router.get('/:id', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(getEntry(params), 'Entry', res, next);
});

router.post('/', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(createEntry(req.body, params), 'Entry', res, next);
});

router.patch('/:id', async (req, res, next) => {
  await sendResponse(patchEntry(req.body, req.params.id), 'Entry', res, next);
});

router.delete('/:id', async (req, res, next) => {
  await sendResponse(deleteEntry(req.params.id), 'Entry', res, next);
});

export default router;
