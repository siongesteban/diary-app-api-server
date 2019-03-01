import { User } from '../models';
import {
  getDoc,
  patchDoc,
  deleteDoc,
} from '../lib';

export const getUser = async params => {
  const data = await getDoc(User, params.id, { password: 0 });

  return data;
};

export const patchUser = async (payload, id) => {
  const { name, username, password } = payload;

  const data = await patchDoc(User, id, {
    name,
    username,
    password,
  });

  return data;
};

export const deleteUser = id => deleteDoc(User, id);
