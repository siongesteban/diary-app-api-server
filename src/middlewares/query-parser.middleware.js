import forEach from 'lodash/forEach';

const booleanFields = ['getRaw'];

export default (req, _, next) => {
  forEach(req.query, (value, field) => {
    if (booleanFields.includes(field)) {
      req.query[field] = value === 'true';
    }
  });

  next();
};
