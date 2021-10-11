const { findTransactions, addOperation } = require("../../utils");
const HttpCode = require("../../helpers/constants");

const addOperations = async (req, res, _) => {
  const { operationType } = req.params;
  const { body } = req;
  if ((!body.amount) || (!body.date) || (!body.category) || (!body.description)) {
    return res.status(HttpCode.BAD_REQUEST).json({
      message: "'amount', 'date', 'category', and 'description' are required fields"
    });
  };
  const { _id: userId } = req.user;

  const userTransactions = await findTransactions(userId);

  await addOperation(body, userTransactions, operationType);

  res.status(201).json({
    status: "Success",
    code: 201,
    body,
  });
};

module.exports = addOperations;
