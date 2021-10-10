// const transactions = require("../../repositories/transactions");
// const { Transaction } = require("../../models");
const jwt = require("jsonwebtoken");
// const { Unauthorized } = require("http-errors");
const { findTransactions } = require("../../utils");
const HttpCode = require("../../helpers/constants");
const { JWT_SECRET_KEY } = process.env;

const getBalance = async (req, res, next) => {
  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const { balance } = await findTransactions(id, res);
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
