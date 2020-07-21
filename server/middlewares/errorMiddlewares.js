const handleError = (err, req, res, next) => {
  let { status, code, message } = err;
  if (!status) status = 500;
  console.log(err);
  res.status(status).send({ code, message });
};

module.exports = {
  handleError,
};
