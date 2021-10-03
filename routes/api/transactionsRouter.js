const express = require('express')
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router();
const { controllerWrapper } = require("../../middlewares")

// router.get('/', ctrl.getAllBanks);

transactionRouter.patch('/incomes', controllerWrapper(ctrl.addIncome));

transactionRouter.patch('/expenses', controllerWrapper(ctrl.addExpense));

transactionRouter.patch('/balance', controllerWrapper(ctrl.renewBalance));

transactionRouter.delete('/:operationType/:operationId', controllerWrapper(ctrl.deleteTransaction));

module.exports = transactionsRouter;