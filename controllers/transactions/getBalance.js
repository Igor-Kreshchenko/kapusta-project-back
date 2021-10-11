const { findTransactions } = require("../../utils");
const HttpCode = require("../../helpers/constants");

const getBalance = async (req, res) => {
  const { _id: userId } = req.user;
  const { balance } = await findTransactions(userId);

  return res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    balance,
  });
};
module.exports = getBalance;
