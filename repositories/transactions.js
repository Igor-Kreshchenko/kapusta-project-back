const { Transaction } = require("../models");

const create = async (id) => {
  const transaction = new Transaction({ user: { _id: id } });
  return await transaction.save();
};

const transactions = { create };

module.exports = transactions;
