const { Transaction } = require("../../models");
const { findTransactions } = require("../../utils");
const HttpCode = require("../../helpers/constants");

const renewBalance = async (req, res, _) => {
  const { balance } = req.body;

  if (!balance) {
    return res.status(HttpCode.BAD_REQUEST).json({
      message: "'balance' is required field",
    });
  }
  const { _id: userId } = req.user;

  const userTransactions = await findTransactions(userId);

  const { _id: transactionId } = userTransactions;

  await Transaction.findByIdAndUpdate(transactionId, { balance });

  res.json({
    status: "Success",
    code: HttpCode.OK,
    balance,
  });
};

module.exports = renewBalance;
