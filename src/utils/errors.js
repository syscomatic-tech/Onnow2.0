/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
export class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

export class BadRequest extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
  }

  getCode() {
    return 400;
  }
}

export class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
  }

  getCode() {
    return 404;
  }
}

export class MongoError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'MongoError';
  }

  getCode() {
    return 400;
  }
}

export const handleError = async (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  let code = 500;
  if (err instanceof GeneralError) {
    code = err.getCode();
  }

  const correlationId = req.headers['x-correlation-id'];

  return res.status(code).json({
    correlationId,
    message: err.message,
  });
};
