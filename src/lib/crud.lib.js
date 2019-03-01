import forEach from 'lodash/forEach';
import { NotFoundError } from './error.lib';

export const findDocs = (Model, params) => Model.find(params);

export const getDoc = async (Model, id) => {
  const doc = await Model.findById(id);
  const { constructor: { modelName } } = new Model({});

  if (!doc) {
    throw new NotFoundError(modelName);
  }

  return doc;
};

export const createDoc = (Model, data) => Model.create(data);

export const patchDoc = async (Model, id, data) => {
  const fieldsToPath = {};

  forEach(data, (value, field) => {
    if (value) {
      fieldsToPath[field] = value;
    }
  });

  await getDoc(Model, id);

  return Model.findByIdAndUpdate(id, { $set: fieldsToPath }, { new: true });
};

export const deleteDoc = async (Model, id) => {
  await getDoc(Model, id);

  return Model.findByIdAndDelete(id);
};
