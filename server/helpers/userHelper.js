const User = require("../models/UserModel");
const axios = require("axios");
const constants = require("../constants/constants");

const getGoogleConnectionUrl = () => {
  return constants.oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: constants.defaultScope,
  });
};

const getUserInformationWithAxios = (access_token) => {
  return axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

const createUserByGoogleObject = (googleRes) => {
  return User.create({
    name: googleRes.given_name,
    email: googleRes.email,
    profilePicture: googleRes.picture,
    registerProvider: "Google",
  });
};

const generateUserPayloadFromUserObject = (user) => {
  const { _id, name, type, email, registerProvider } = user;
  return {
    _id,
    name,
    email,
    type,
    registerProvider,
  };
};

const findUserById = (_id) => {
  return User.findById(_id);
};

module.exports = {
  findUserById,
  generateUserPayloadFromUserObject,
  getGoogleConnectionUrl,
  getUserInformationWithAxios,
  createUserByGoogleObject,
};
