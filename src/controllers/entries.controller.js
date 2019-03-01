import { Entry } from '../models';
import { createDoc, patchDoc, deleteDoc } from '../lib';

export const createEntry = async (payload, params) => {
  const { title, content, type } = payload;

  const data = await createDoc(Entry, {
    title,
    content,
    type,
    author: params.user._id,
  });

  return data;
};

export const patchEntry = async (payload, id) => {
  const { title, content, type } = payload;

  const data = await patchDoc(Entry, id, {
    title,
    content,
    type,
  });

  return data;
};

export const deleteEntry = id => deleteDoc(Entry, id);
