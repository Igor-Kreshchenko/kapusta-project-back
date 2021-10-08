const { updateToken } = require("../../repositories/users");

const HttpCode = require("../../helpers/constants");

const logout = async (req, res, next) => {
  const id = req.user.id;
  await updateToken(id, { token: null });
  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = logout;
