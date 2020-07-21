const { ERROR } = require("../constants/error");

const createError = (message, status, code) => {
  if (!status || status < 100 || status > 600) {
    status = 500;
  }
  let err = new Error(message);
  err.status = status;
  err.code = code;
  return err;
};

const createErrorWithObject = (ERR, status) => {
  return createError(ERR.message, status || ERR.status, ERR.code);
};

const serverError = (error) => {
  return createError(error, 500, "server-error");
};

module.exports = {
  ERROR,
  createError,
  createErrorWithObject,
  serverError,
};
