const userMiddlewares = require("./userMiddlewares");

const googleLogin = [userMiddlewares.checkUserLoginType];

module.exports = {
  verifyAuthToken: userMiddlewares.verifyAuthToken,
  googleLogin,
};
