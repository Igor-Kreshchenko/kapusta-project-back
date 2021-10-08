const { Balance } = require("../../models/balance");

const getBalance = async (req, res, _next) => {
  const result = await Balance.create({ owner: req.user._id }).populate(
    "owner",
    "balance",
    "_id email"
  );
  return res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getBalance;
