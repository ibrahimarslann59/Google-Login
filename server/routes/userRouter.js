const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const axios = require("axios");
// GOOGLE CONF
const constants = require("../constants/constants");

const {
  ERROR,
  createErrorWithObject,
  serverError,
} = require("../helpers/errorHelper");
const Middlewares = require("../middlewares/Middlewares");
const Helper = require("../helpers/Helper");

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: constants.defaultScope,
  });
}

router.get("/google", async (req, res, nex) => {
  const url = await getConnectionUrl(constants.oAuth2Client);
  res.send(url);
});

router.get("/", Middlewares.verifyAuthToken, (req, res, next) => {
  const { _id } = res.locals.decoded;
  if (_id) {
    Helper.user
      .findUserById(_id)
      .then((user) => {
        res.send({ user: Helper.user.generateUserPayloadFromUserObject(user) });
      })
      .catch((e) => next(serverError(e)));
  } else {
    return next(createErrorWithObject(ERROR.NULL_USER_ID));
  }
});

router.get("/google/login", Middlewares.googleLogin, (req, res, next) => {
  const { user, googleRes } = res.locals;
  if (user !== undefined) {
    Helper.token.generateToken(user).then((token) => {
      res.redirect(`http://localhost:3000/googleLogin?authToken=${token}`);
    });
  } else {
    Helper.user
      .createUserByGoogleObject(googleRes)
      .then((user) => {
        Helper.token.generateToken(user).then((token) => {
          res.redirect(`http://localhost:3000/googleLogin?authToken=${token}`);
        });
      })
      .catch((e) => next(serverError(e)));
  }
});

module.exports = router;
