const {Transaction} = require("../../models");
const {findTransactions, addTransaction} = require("../../utils");

const addIncome = async (req, res, _) => {
    const {balance} = req.body;
    const {_id: userId} = req.user;

    const userTransactions = await findTransactions(userId, res);

    const {_id: transactionId} = userTransactions;
        
    await Transaction.findByIdAndUpdate(transactionId, {balance});

    res.json({
        status: "Success",
        code: 200,
        balance,
    });
};

module.exports = addIncome;