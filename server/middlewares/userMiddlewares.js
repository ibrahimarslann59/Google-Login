//GOOGLE CONF
const { google } = require("googleapis");
const OAuth2Data = require("../constants/google_key.json");
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
const User = require("../models/UserModel");
const userHelper = require("../helpers/userHelper");
const {
  ERROR,
  createErrorWithObject,
  serverError,
  createError,
} = require("../helpers/errorHelper");

const { verifyToken } = require("../helpers/tokenHelper");

const verifyAuthToken = (req, res, next) => {
  const token =
    req.headers["x-auth-token"] || req.body.token || req.query.token;
  if (token) {
    verifyToken(token)
      .then((decoded) => {
        res.locals.decoded = decoded;
        next();
      })
      .catch((err) => next(createError("", 400, "invalid-token")));
  } else {
    next(createError("", 400, `token-is-${token} :/`));
  }
};

const checkUserLoginType = (req, res, next) => {
  const code = req.query.code;
  oAuth2Client.getToken(code, (err, tokens) => {
    if (!err) {
      userHelper
        .getUserInformationWithAxios(tokens.access_token)
        .then((response) => {
          console.log("tokens", tokens);
          console.log("data", response.data);
          User.findOne({ email: response.data.email }).then((user) => {
            if (user) {
              if (user.registerProvider === "Google") {
                res.locals.user = user;
                return next();
              } else {
                return next(createErrorWithObject(ERROR.NOT_USE_GOOGLE_LOGIN));
              }
            } else {
              res.locals.googleRes = response.data;
              return next();
            }
          });
        })
        .catch((e) => next(serverError(e)));
    } else {
      return next(serverError(err));
    }
  });
};

module.exports = {
  verifyAuthToken,
  checkUserLoginType,
};
