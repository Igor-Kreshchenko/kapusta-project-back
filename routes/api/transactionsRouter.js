const express = require('express')
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router()

// router.get('/', ctrl.getAllBanks);

transactionsRouter.patch('/incomes', ctrl.addIncome);

transactionsRouter.patch('/expenses', ctrl.addExpense);

transactionsRouter.patch('/balance', ctrl.renewBalance);

module.exports = transactionsRouter;