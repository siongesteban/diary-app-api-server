import forEach from 'lodash/forEach';

export const create = (Model, data) => Model.create(data);
export const patch = (Model, id, data) => {
  const fieldsToPath = {};

  forEach(data, (value, field) => {
    if (value) {
      fieldsToPath[field] = value;
    }
  });

  const condition = { _id: id };
  const dataPatch = { $set: fieldsToPath };
  const options = { new: true };

  return Model.findOneAndUpdate(condition, dataPatch, options);
};
