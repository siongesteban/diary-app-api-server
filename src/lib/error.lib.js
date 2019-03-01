class DomainError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends DomainError {
  constructor(message, field, data) {
    super(message || 'Authentication failed.');

    this.data = data;
    this.field = field;
    this.statusCode = 401;
  }
}

export class NotFoundError extends DomainError {
  constructor(modelName, field) {
    super(`${modelName} does not exist.`);

    this.field = field;
    this.statusCode = 404;
  }
}
