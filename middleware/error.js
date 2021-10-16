const ErrorResponse = require('../utils/errorResponse');

const errorHandler = async (err, req, res, next) => {
  console.log(err.name);
  //   console.log(err);
  let error = { ...err };
  error.message = err.message;

  //   For duplicate entry
  if (err.code === 11000) {
    error = new ErrorResponse(400, `Duplicate entry found`);
  }

  //   Bad mongoose id
  if (err.name === 'CastError') {
    error = new ErrorResponse(404, `Record not found with id ${err.value}`);
  }

  //   for validation error
  if (err.name === 'ValidationError') {
    const errorMessage = Object.values(err.errors).map(er => er.message);
    error = new ErrorResponse(400, errorMessage);
  }
  res.status(error.statusCode || 400).json({
    success: false,
    error: error.message,
  });
};
module.exports = errorHandler;
