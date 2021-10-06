const { Transaction } = require("../../models");
const { findTransactionsAndCheckAmount } = require("../../utils");

const addIncome = async (req, res, next) => {
  const today = new Date();
  const {
    date = today,
    description = `Income added ${today.toLocaleDateString()}.`,
    category = "Доп. доход",
    amount,
  } = req.body;
  const { _id: userId } = req.user;

  const userTransactions = await findTransactionsAndCheckAmount(
    userId,
    amount,
    res
  );

  const { _id: transactionId, balance, income } = userTransactions;
  const newBalance = +balance + +amount;
  const newIncome = [...income, { date, description, category, amount }];

  await Transaction.findByIdAndUpdate(transactionId, {
    balance: newBalance,
    income: newIncome,
  });
};

module.exports = addIncome;
