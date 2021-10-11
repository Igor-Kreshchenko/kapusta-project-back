const { Transaction } = require("../../models");
//const { findTransactions } = require("../../utils");
const createError = require("http-errors");

const deleteOperationFromTransactions = async (req, res) => {
  const { operationId } = req.params;
  if (!operationId) {
    throw new createError(
      400,
      "Transaction id must be present"
    );
  }

  //const { _id: userId } = req.user;
  //const userTransactions = await findTransactions(userId);
  //const { _id: transactionId } = userTransactions;
  //let balance = userTransactions.balance;
  let elem = await Transaction.findByIdAndDelete(operationId)

  res.json(elem);
};

module.exports = deleteOperationFromTransactions;
