import { ValidationError } from 'express-validation';

const handleError = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json(error.details.body[0].message);
  }
  return res.status(500).json(error);
};

export default handleError;
