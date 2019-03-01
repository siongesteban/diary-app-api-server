import { Router } from 'express';

import { sendResponse } from '../utils';
import { getUser, patchUser, deleteUser } from '../controllers';

const router = Router();

router.get('/:id', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(getUser(params), 'User', res, next);
});

router.patch('/:id', async (req, res, next) => {
  await sendResponse(patchUser(req.body, req.params.id), 'User', res, next);
});

router.delete('/:id', async (req, res, next) => {
  await sendResponse(deleteUser(req.params.id), 'User', res, next);
});

export default router;
