const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const verifyEmailByToken = require("./verifyEmailByToken");
const verifyEmailByPostRequest = require("./verifyEmailByPostRequest");

module.exports = {
  signup,
  login,
  logout,
  verifyEmailByToken,
  verifyEmailByPostRequest,
};
