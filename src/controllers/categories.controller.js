import { Category, User } from '../models';
import {
  findDocs,
  getDoc,
  createDoc,
  patchDoc,
  deleteDoc,
} from '../libs';

export const findCategories = async params => {
  const diaryApp = await User.findOne({ name: 'YourDaily' });
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
  const {
    coverBase64,
    coverUrl,
    name,
    description,
  } = payload;

  const data = await createDoc(Category, {
    name,
    description,
    coverBase64,
    coverUrl,
    createdBy: params.user._id,
  });

  return data;
};

export const patchCategory = async (payload, id) => {
  const {
    coverBase64,
    coverUrl,
    name,
    description,
  } = payload;

  const data = await patchDoc(Category, id, {
    name,
    description,
    coverBase64,
    coverUrl,
  });

  return data;
};

export const deleteCategory = id => deleteDoc(Category, id);
