import { Entry } from '../models';
import { create } from '../lib';

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
