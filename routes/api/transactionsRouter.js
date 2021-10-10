const express = require("express");
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router();
const { controllerWrapper, authenticate } = require("../../middlewares");

transactionsRouter.get("/:operationType", authenticate, ctrl.getOperations);

transactionsRouter.patch(
  "/:operationType",
  authenticate,
  controllerWrapper(ctrl.addOperations)
);

transactionsRouter.delete(
  "/:operationType/:operationId",
  authenticate,
  controllerWrapper(ctrl.deleteOperationFromTransactions)
);

transactionsRouter.patch(
  "/balance",
  authenticate,
  controllerWrapper(ctrl.renewBalance)
);

module.exports = transactionsRouter;
