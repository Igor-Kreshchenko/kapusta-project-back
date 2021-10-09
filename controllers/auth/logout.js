const { updateToken } = require("../../repositories/users");
const HttpCode = require("../../helpers/constants");
// const jwt = require("jsonwebtoken");
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const logout = async (req, res, next) => {
  const id = req.user._id;
  await updateToken(id, { token: null });
  return res.status(HttpCode.NO_CONTENT).json({});
};
module.exports = logout;
