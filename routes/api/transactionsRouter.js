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

module.exports = transactionsRouter;
