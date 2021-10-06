const { Transaction } = require("../../models");
const { findTransactionsAndCheckAmount } = require("../../utils");

const addIncome = async (req, res, next) => {
  const { balance } = req.body;
  const { _id: userId } = req.user;

  const userTransactions = await findTransactionsAndCheckAmount(
    userId,
    balance,
    res
  );

  const { _id: transactionId } = userTransactions;

  await Transaction.findByIdAndUpdate(transactionId, { balance });
};

module.exports = addIncome;
