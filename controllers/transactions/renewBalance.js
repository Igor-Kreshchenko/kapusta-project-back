const { Transaction } = require("../../models");
const { findTransactions } = require("../../utils");

const renewBalance = async (req, res, _) => {
  const { balance } = req.body;
  const { _id: userId } = req.user;

  const userTransactions = await findTransactions(userId);

  const { _id: transactionId } = userTransactions;

  await Transaction.findByIdAndUpdate(transactionId, { balance });

  res.json({
    status: "Success",
    code: 200,
    balance,
  });
};

module.exports = renewBalance;
