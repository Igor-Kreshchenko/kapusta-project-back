const { findTransactions, getTransactions } = require("../../utils");

const getOperations = async (req, res, _) => {
  const { operationType } = req.params;
  const { month = null, year = null } = req.query;
  const { _id: userId } = req.user;

  const userTransactions = await findTransactions(userId, res);
  const data = getTransactions(operationType, month, year, userTransactions);

  res.json({
    status: "Success",
    code: 200,
    data,
  });
};

module.exports = getOperations;
