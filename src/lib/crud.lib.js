import forEach from 'lodash/forEach';

export const createDoc = (Model, data) => Model.create(data);

export const patchDoc = (Model, id, data) => {
  const fieldsToPath = {};

  forEach(data, (value, field) => {
    if (value) {
      fieldsToPath[field] = value;
    }
  });

  return Model.findByIdAndUpdate(id, { $set: fieldsToPath }, { new: true });
};

export const deleteDoc = (Model, id) => Model.findByIdAndDelete(id);
