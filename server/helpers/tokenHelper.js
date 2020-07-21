const { API_SECRET_KEY } = require("../constants/config");
const jwt = require("jsonwebtoken");

const userHelper = require("../helpers/userHelper");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, API_SECRET_KEY, (error, decoded) => {
      error ? reject(error) : resolve(decoded);
    });
  });
};

const generateToken = (data = {}, expiresIn = "24000h") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      userHelper.generateUserPayloadFromUserObject(data),
      API_SECRET_KEY,
      { expiresIn },
      (err, token) => {
        err ? reject(err) : resolve(token);
      }
    );
  });
};

module.exports = {
  verifyToken,
  generateToken,
};
