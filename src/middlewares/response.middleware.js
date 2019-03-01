import map from 'lodash/map';

import { CAST_ERROR, VALIDATION_ERROR } from '../constants';

const dataResponse = (_, res) => {
  const statusCode = 200;

  res.status(statusCode).json({
    statusCode,
    data: res.locals.data,
  });
};

export const errorResponse = (req, res) => {
  const { modelName, error } = res.locals;
  const { data: errorData } = error;
  let {
    field: errorField,
    message: errorMessage,
    name: errorName,
    statusCode = 500,
  } = error;
  let errors;

  if (error.name === VALIDATION_ERROR) {
    statusCode = 400;
    errorField = '*';
    errorMessage = `${modelName} validation failed.`;
    errorName = error.name;

    errors = map(error.errors, e => {
      const {
        name,
        properties: {
          type,
          value,
          path: field,
          message: defaultMessage,
        } = {},
      } = e;
      let message;

      if (name === CAST_ERROR) {
        return {
          field: e.path,
          message: 'The value provided has an invalid type.',
        };
      }

      if (type === 'unique') {
        message = `${value} is already in use.`;
      } else {
        message = defaultMessage;
      }

      return {
        field,
        message,
      };
    });
  }

  const result = {
    statusCode,
    error: {
      name: errorName,
      message: errorMessage,
      ...(errorData && { data: errorData }),
      ...(errorField && { field: errorField }),
      ...(errors && { errors }),
      ...(req.query.getRaw && { raw: error }),
    },
  };

  res.status(statusCode).json(result);
};

export default (req, res) => {
  if (res.locals.error) {
    errorResponse(req, res);

    return;
  }

  dataResponse(req, res);
};
