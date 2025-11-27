/**
 * Response Helpers
 * Standardized API responses
 */

const successResponse = (res, data, message = 'Success', pagination = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

const errorResponse = (res, message = 'Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse
};
