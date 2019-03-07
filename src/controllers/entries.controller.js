import { Entry } from '../models';
import {
  findDocs,
  getDoc,
  createDoc,
  patchDoc,
  deleteDoc,
} from '../libs';

export const findEntries = async params => {
  const data = await findDocs(Entry, { author: params.user._id });

  return data;
};

export const getEntry = async params => {
  const data = await getDoc(Entry, params.id);

  return data;
};

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
