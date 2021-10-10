const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
// const { findTransactions } = require("../../utils");
const HttpCode = require("../../helpers/constants");
const { Transaction } = require("../../models");
// const transactions = require("../../repositories/transactions");

const getBalance = async (req, res, next) => {
  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const { balance } = await Transaction.findOne({ _id: id }, balance);
    console.log(balance);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      balance,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getBalance;
