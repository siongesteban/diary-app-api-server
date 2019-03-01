import map from 'lodash/map';

import {
  CAST_ERROR,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
} from '../constants';

const dataResponse = (_, res) => {
  const status = 200;

  res.status(status).json({
    status,
    data: res.locals.data,
  });
};

const errorResponse = (req, res) => {
  const { model, error } = res.locals;
  let errors;
  let errorMessage;
  let errorName;
  let status;

  if (error.name === VALIDATION_ERROR) {
    status = 400;
    errorMessage = `${model} validation failed.`;
    errorName = error.name;

    errors = map(error.errors, errorField => {
      const {
        name,
        properties: {
          type,
          value,
          path: field,
          message: defaultMessage,
        } = {},
      } = errorField;
      let message;

      if (name === CAST_ERROR) {
        return {
          field: errorField.path,
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
