import { Router } from 'express';

import { sendResponse } from '../utils';
import { signUp } from '../controllers';

const router = Router();

router.post('/signup', async (req, res, next) => {
  await sendResponse(signUp(req.body), 'User', res, next);
});

export default router;
