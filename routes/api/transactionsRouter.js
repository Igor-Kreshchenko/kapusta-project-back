const express = require('express')
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router();
const { controllerWrapper } = require("../../middlewares")

// router.get('/', ctrl.getAllBanks);

transactionsRouter.patch('/incomes', controllerWrapper(ctrl.addIncome));

transactionsRouter.patch('/expenses', controllerWrapper(ctrl.addExpense));

transactionsRouter.patch('/balance', controllerWrapper(ctrl.renewBalance));

transactionsRouter.patch('/:operationType/:operationId', controllerWrapper(ctrl.deleteOperationFromTransactions));

module.exports = transactionsRouter;