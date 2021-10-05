const { Transaction } = require("../models");

const findTransactions = async (userId, res) => {
  try {
    const userTransactions = await Transaction.findOne({
      user: { _id: userId },
    });

    if (!userTransactions) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "Can't find transactions associated with user",
      });
    }

    return userTransactions;
  } catch (error) {
    return error;
  }
};

module.exports = findTransactions;
