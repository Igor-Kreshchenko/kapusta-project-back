const { Users } = require("../../repositories/users");
const HttpCode = require("../../helpers/constants");

require("dotenv").config();

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, { token: null });
  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = logout;
