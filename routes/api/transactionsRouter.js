const express = require("express");
const ctrl = require("../../controllers/transactions");
const transactionsRouter = express.Router();
const { controllerWrapper, authenticate } = require("../../middlewares");

transactionsRouter.get(
  "/:operationType",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getOperations)
);

transactionsRouter.patch(
  "/:operationType",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.addOperations)
);

transactionsRouter.delete(
  "/:operationType/:operationId",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.deleteOperationFromTransactions)
);

transactionsRouter.patch(
  "/balance",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.renewBalance)
);

module.exports = transactionsRouter;
