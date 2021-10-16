const { Transaction } = require("../models");
const { v4 } = require("uuid");

const addOperation = async (body, userTransactions, operationType) => {
  const { _id: transactionId, balance, expenses, income } = userTransactions;
  body.id = v4();
  const amount = body.amount;

  if (operationType === "income") {
    const newBalance = +balance + +amount;
    const newTransactions = [body, ...income];

    await Transaction.findByIdAndUpdate(transactionId, {
      balance: newBalance,
      income: newTransactions,
    });
  } else if (operationType === "expense") {
    const newBalance = +balance - +amount;
    const newTransactions = [body, ...expenses];

    await Transaction.findByIdAndUpdate(transactionId, {
      balance: newBalance,
      expenses: newTransactions,
    });
  }
};

module.exports = addOperation;
