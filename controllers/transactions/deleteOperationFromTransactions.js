const { Transaction } = require("../../models");
const { findTransactions } = require("../../utils");
const createError = require("http-errors");

const deleteOperationFromTransactions = async (req, res) => {
  const { operationType, operationId } = req.params;
  if (!operationType || !operationId) {
    throw new createError(
      400,
      "Transaction type and transaction id must be present"
    );
  }

  const { _id: userId } = req.user;
  const userTransactions = await findTransactions(userId);
  const { _id: transactionId } = userTransactions;
  let balance = userTransactions.balance;
  let elem;

  if (operationType == "income") {
    let income = userTransactions.income;
    elem = income.find((inc) => inc.id === operationId);
    if (!elem) {
      throw new createError(
        400,
        `Cannot find income transaction with id = ${operationId}`
      );
    }
    balance -= elem.amount;
    income = income.filter((inc) => inc.id !== operationId);
    await Transaction.findByIdAndUpdate(transactionId, { balance, income });
  } else {
    let expenses = userTransactions.expenses;
    elem = expenses.find((exp) => exp.id === operationId);
    if (!elem) {
      throw new createError(
        400,
        `Cannot find expenses transaction with id = ${operationId}`
      );
    }
    balance += elem.amount;
    expenses = expenses.filter((exp) => exp.id !== operationId);
    await Transaction.findByIdAndUpdate(transactionId, { balance, expenses });
  }

  res.json(elem);
};

module.exports = deleteOperationFromTransactions;
