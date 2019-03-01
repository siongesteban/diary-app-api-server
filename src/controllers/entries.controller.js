import { Entry } from '../models';
import { create, patch } from '../lib';

export const createEntry = async (payload, params) => {
  const { title, content, type } = payload;

  const data = await create(Entry, {
    title,
    content,
    type,
    author: params.user._id,
  });

  return data;
};

export const patchEntry = async (payload, params) => {
  const { title, content, type } = payload;

  const data = await patch(Entry, params.id, {
    title,
    content,
    type,
  });

  return data;
};
