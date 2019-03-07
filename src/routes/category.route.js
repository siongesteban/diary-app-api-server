import { Router } from 'express';

import { sendResponse } from '../utils';
import {
  findCategories,
  getCategory,
  createCategory,
  patchCategory,
  deleteCategory,
} from '../controllers';

const router = Router();

router.get('/', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(findCategories(params), 'Category', res, next);
});

router.get('/:id', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(getCategory(params), 'Category', res, next);
});

router.post('/', async (req, res, next) => {
  const params = { ...req.params, user: req.user };

  await sendResponse(createCategory(req.body, params), 'Category', res, next);
});

router.patch('/:id', async (req, res, next) => {
  await sendResponse(
    patchCategory(req.body, req.params.id),
    'Category',
    res,
    next,
  );
});

router.delete('/:id', async (req, res, next) => {
  await sendResponse(deleteCategory(req.params.id), 'Category', res, next);
});

export default router;
