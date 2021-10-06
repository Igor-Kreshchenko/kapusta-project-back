const express = require('express')
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router();
const { controllerWrapper } = require("../../middlewares")

router.get('/:operationType', ctrl.getOperations);

transactionsRouter.patch('/transactions/:operationType', controllerWrapper(ctrl.addOperations));

// transactionsRouter.patch('/expenses', controllerWrapper(ctrl.addExpense));

transactionsRouter.patch('/balance', controllerWrapper(ctrl.renewBalance));

transactionsRouter.patch('/:operationType/:operationId', controllerWrapper(ctrl.deleteOperationFromTransactions));

module.exports = transactionsRouter;