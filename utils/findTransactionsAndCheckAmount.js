const {Transaction} = require("../../models");

const findTransactionsAndCheckAmount = async (userId, amount, res) => {
    try {
        const userTransactions = await Transaction.findOne({user: {_id: userId}});

        if (!userTransactions) {
            return res.status(400).json({
                status: "Error",
                code: 400,
                message: "Can't find transactions associated with user",
            });
        };

        if (!amount){
            return res.status(400).json({
                status: "Error",
                code: 400,
                message: "Field amount must be filled",
            });
        }

        return userTransactions;
    } catch (error) {
        return error;
    };
};

module.exports = findTransactionsAndCheckAmount;

