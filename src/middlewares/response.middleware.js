import map from 'lodash/map';

import { VALIDATION_ERROR } from '../constants';

const dataResponse = (_, res) => {
  const status = 200;

  res.status(status).json({
    status,
    data: res.locals.data,
  });
};

const errorResponse = (req, res) => {
  const { entity, error } = res.locals;
  let errors;
  let errorMessage;
  let status;

  if (error.name === VALIDATION_ERROR) {
    status = 400;

    errorMessage = `${entity} already exists`;

    errors = map(error.errors, errorField => {
      const {
        properties: { path: field, type, value },
      } = errorField;
      let message;

      if (type === 'unique') {
        message = `${value} is already in use.`;
      }

      return {
        field,
        message,
      };
    });
  }

  const result = {
    errors,
    status,
    name: error.name,
    message: errorMessage,
    ...(req.query.getRaw && { raw: error }),
  };

  res.status(status).json(result);
};

export default (req, res) => {
  if (res.locals.error) {
    errorResponse(req, res);

    return;
  }

  dataResponse(req, res);
};
