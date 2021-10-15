const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const verifyEmailByToken = require("./verifyEmailByToken");
const verifyEmailByPostRequest = require("./verifyEmailByPostRequest");
const getCurrent = require("./getCurrent");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");

module.exports = {
  signup,
  login,
  logout,
  verifyEmailByToken,
  verifyEmailByPostRequest,
  getCurrent,
  googleAuth,
  googleRedirect
};
