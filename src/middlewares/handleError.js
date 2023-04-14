import validationError from 'express-validation';

const handleError = (error, req, res, next) => {
  if (error instanceof validationError) {
    return res.status(error.statusCode).json(error);
  }
};

export default handleError;
