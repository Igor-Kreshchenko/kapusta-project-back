const transactions = require("../../repositories");
const HttpCode = require("../../helpers");

const getBalance = async (req, res, next) => {
  try {
    const userBalance = req.user.balance;
    const balance = await transactions(userBalance, req.body);
    console.log(balance);
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
