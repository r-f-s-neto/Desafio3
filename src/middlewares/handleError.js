import { ValidationError } from 'express-validation';
import { UnauthorizedError } from 'express-jwt';

const handleError = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json(error.details.body[0].message);
  }
  if (error instanceof UnauthorizedError) {
    return res.status(error.status).json(error.name);
  }
  return res.status(500).json(error);
};

export default handleError;
