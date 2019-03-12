import { Entry } from '../models';
import {
  imgur,
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
  const { coverBase64, title, content, category } = payload;
  let coverUrl;

  if (coverBase64) {
    const base64 = coverBase64.split(',')[1];
    imgurResult = await imgur.uploadBase64(
      base64,
      process.env.IMGUR_ALBUM_ID,
      title,
    );
    const {
      data: { link: imgurLink },
    } = imgurResult;

    coverUrl = imgurLink;
  }

  const data = await createDoc(Entry, {
    title,
    content,
    category,
    coverUrl,
    author: params.user._id,
  });

  return data;
};

export const patchEntry = async (payload, id) => {
  const { coverBase64, title, content, category } = payload;
  let coverUrl;

  if (coverBase64) {
    const base64 = coverBase64.split(',')[1];
    const imgurResult = await imgur.uploadBase64(
      base64,
      process.env.IMGUR_ALBUM_ID,
      title,
    );
    const {
      data: { link: imgurLink },
    } = imgurResult;

    coverUrl = imgurLink;
  }

  const data = await patchDoc(Entry, id, {
    title,
    content,
    category,
    coverUrl,
  });

  return data;
};

export const deleteEntry = id => deleteDoc(Entry, id);
