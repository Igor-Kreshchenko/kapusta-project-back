// const transactions = require("../../repositories/transactions");
const { Transaction } = require("../../models");
const HttpCode = require("../../helpers/constants");

const getBalance = async (req, res, next) => {
  try {
    const id = req.user._id;
    // const balance = req.transaction.balance;
    const transaction = await Transaction.findOne({ user: id });
    console.log(transaction.balance);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        balance,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getBalance;
