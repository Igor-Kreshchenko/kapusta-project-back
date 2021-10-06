const {Transaction} = require("../models");

const findTransactions = async (userId) => {
    const userTransactions = await Transaction.findOne({user: {_id: userId}});

    if (!userTransactions) {
        return new Error("Can't find transactions associated with user")
    };

    return userTransactions;
    
};

module.exports = findTransactions;