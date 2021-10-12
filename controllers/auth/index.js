const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const verifyEmailByToken = require("./verifyEmailByToken");
const verifyEmailByPostRequest = require("./verifyEmailByPostRequest");
const { googleAuth, googleRedirect } = require("./auth.controller");

module.exports = {
  signup,
  login,
  logout,
  verifyEmailByToken,
  verifyEmailByPostRequest,
  googleAuth,
  googleRedirect,
};
