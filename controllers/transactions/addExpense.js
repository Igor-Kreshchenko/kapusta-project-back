const {Transaction} = require("../../models");
const {findTransactionsAndCheckAmount} = require("../../utils")

const addExpense = async (req, res, next) => {
    const today = new Date();
    const {date = today, description = `Expense added ${today.toLocaleDateString()}.`, category = "Прочее", amount} = req.body;
    const {_id: userId} = req.user;

    try {
        const userTransactions = await findTransactionsAndCheckAmount(userId, amount, res);

        const {_id: transactionId, balance, expenses} = userTransactions;
        const newBalance = +balance - +amount;
        const newExpenses = [...expenses, {date, description, category, amount}]
        
        await Transaction.findByIdAndUpdate(transactionId, {balance: newBalance, expenses: newExpenses});
    } catch (error) {
        next(error);
    };
};

module.exports = addExpense;