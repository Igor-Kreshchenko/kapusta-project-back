const { findById } = require("../../repositories");
const HttpCode = require("../../helpers");

const getBalance = async (req, res, next) => {
  const { balance } = req.body;
  const { _id: userId } = req.user;
  await findById(userId, balance, res);
  return res.status(HttpCode.NO_CONTENT).json({});
};
module.exports = getBalance;
