const {Transaction} = require("../models");

const addOperation = async (body, userTransactions, operationType) => {
    const {_id: transactionId, balance, expenses, income} = userTransactions;

    if (operationType === "income"){
        const newBalance = +balance + +amount;
        const newTransactions = [...income, body];

        await Transaction.findByIdAndUpdate(transactionId, {balance: newBalance, income: newTransactions});

    }else if (operationType === "expense"){
        const newBalance = +balance - +amount;
        const newTransactions = [...expenses, body];

        await Transaction.findByIdAndUpdate(transactionId, {balance: newBalance, expenses: newTransactions});
    };
};

exports.module = addOperation;