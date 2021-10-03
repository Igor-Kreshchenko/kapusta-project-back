const {Transaction} = require("../../models");
const {findTransactionsAndCheckAmount} = require("../../utils")

const addIncome = async (req, res, next) => {
    const {balance} = req.body;
    const {_id: userId} = req.user;

    try {
        const userTransactions = await findTransactionsAndCheckAmount(userId, balance, res);

        const {_id: transactionId} = userTransactions;
        
        await Transaction.findByIdAndUpdate(transactionId, {balance});
    } catch (error) {
        next(error);
    };
};

module.exports = addIncome;