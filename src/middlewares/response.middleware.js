import map from 'lodash/map';

import { VALIDATION_ERROR, INTERNAL_SERVER_ERROR } from '../constants';

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
  let errorName;
  let status;

  if (error.name === VALIDATION_ERROR) {
    status = 400;
    errorMessage = `${entity} already exists`;
    errorName = error.name;

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
  } else {
    status = 500;
    errorMessage = error.message;
    errorName = INTERNAL_SERVER_ERROR;
  }

  const result = {
    status,
    name: errorName,
    message: errorMessage,
    ...(errors && { errors }),
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
