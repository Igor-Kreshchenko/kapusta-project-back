const express = require('express')
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router();
const { controllerWrapper } = require("../../middlewares")

// router.get('/', ctrl.getAllBanks);

transactionRouter.patch('/incomes', ctrl.addIncome);

transactionRouter.patch('/expenses', ctrl.addExpense);

transactionRouter.patch('/balance', ctrl.renewBalance);

transactionRouter.delete('/:operationType/:operationId', controllerWrapper(ctrl.deleteTransaction));

module.exports = transactionsRouter;