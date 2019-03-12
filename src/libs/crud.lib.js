import forEach from 'lodash/forEach';

import { NotFoundError } from './error.lib';
import { chainPopulate, getModelName } from '../utils';

export const findDocs = (Model, params) =>
  chainPopulate(Model.find(params), Model);

export const getDoc = async (Model, id, params) => {
  const doc = await chainPopulate(Model.findOne({ _id: id }, params), Model);
  const modelName = getModelName(Model);

  if (!doc) {
    throw new NotFoundError(modelName);
  }

  return doc;
};

export const createDoc = async (Model, data) => {
  const newDoc = await Model.create(data);

  return getDoc(Model, newDoc._id);
};

export const patchDoc = async (Model, id, data) => {
  const fieldsToPatch = {};

  forEach(data, (value, field) => {
    if (value) {
      fieldsToPatch[field] = value;
    }
  });

  await getDoc(Model, id);

  return chainPopulate(
    Model.findByIdAndUpdate(id, { $set: fieldsToPatch }, { new: true }),
    Model,
  );
};

export const deleteDoc = async (Model, id) => {
  await getDoc(Model, id);

  return chainPopulate(Model.findByIdAndDelete(id), Model);
};
