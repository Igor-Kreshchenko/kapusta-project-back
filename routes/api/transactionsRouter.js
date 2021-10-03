const express = require('express')
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router()

// router.get('/', ctrl.getAllBanks);

transactionrouter.patch('/incomes', ctrl.addIncome);

transactionrouter.patch('/expenses', ctrl.addExpense);

transactionrouter.patch('/balance', ctrl.renewBalance);

module.exports = transactionsRouter;