import { Router } from 'express';

import { sendResponse } from '../utils';
import { logIn, signUp } from '../controllers';

const router = Router();

router.post('/login', async (req, res, next) => {
  await sendResponse(logIn(req.body), 'User', res, next);
});

router.post('/signup', async (req, res, next) => {
  await sendResponse(signUp(req.body), 'User', res, next);
});

export default router;
