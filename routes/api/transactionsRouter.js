const express = require("express");
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router();
const { controllerWrapper, authenticate } = require("../../middlewares");

transactionsRouter.get(
  "/balance",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getBalance)
);

transactionsRouter.patch(
  "/balance",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.renewBalance)
);

transactionsRouter.get("/:operationType", ctrl.getOperations);

transactionsRouter.patch(
  "/:operationType",
  controllerWrapper(ctrl.addOperations)
);

transactionsRouter.delete(
  "/:operationType/:operationId",
  controllerWrapper(ctrl.deleteOperationFromTransactions)
);

// transactionsRouter.patch('/expenses', controllerWrapper(ctrl.addExpense));

module.exports = transactionsRouter;
