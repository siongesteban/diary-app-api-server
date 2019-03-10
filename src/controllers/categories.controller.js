import { Category, User } from '../models';
import {
  imgur,
  findDocs,
  getDoc,
  createDoc,
  patchDoc,
  deleteDoc,
} from '../libs';

export const findCategories = async params => {
  const diaryApp = (await User.findOne({ name: 'YourDaily' })) || {};
  const query = {
    $or: [
      {
        createdBy: diaryApp._id,
      },
      {
        createdBy: params.user._id,
      },
    ],
  };

  const data = await findDocs(Category, query);

  return data;
};

export const getCategory = async params => {
  const data = await getDoc(Category, params.id);

  return data;
};

export const createCategory = async (payload, params) => {
  const { coverBase64, name, description } = payload;

  const base64 = coverBase64.split(',')[1];
  const imgurResult = await imgur.uploadBase64(
    base64,
    process.env.IMGUR_ALBUM_ID,
    name,
    description,
  );
  const {
    data: { link: imgurLink },
  } = imgurResult;

  const data = await createDoc(Category, {
    name,
    description,
    coverUrl: imgurLink,
    createdBy: params.user._id,
  });

  return data;
};

export const patchCategory = async (payload, id) => {
  const { coverBase64, name, description } = payload;
  let coverUrl;

  if (coverBase64) {
    const base64 = coverBase64.split(',')[1];
    const imgurResult = await imgur.uploadBase64(
      base64,
      process.env.IMGUR_ALBUM_ID,
      name,
      description,
    );
    const {
      data: { link: imgurLink },
    } = imgurResult;

    coverUrl = imgurLink;
  }

  const data = await patchDoc(Category, id, {
    name,
    description,
    coverUrl,
  });

  return data;
};

export const deleteCategory = id => deleteDoc(Category, id);
