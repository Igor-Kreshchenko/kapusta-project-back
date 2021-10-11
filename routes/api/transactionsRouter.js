const express = require("express");
const { transactions: ctrl } = require("../../controllers");
const transactionsRouter = express.Router();
const {
  joiSchemaAddOperation,
  joiSchemaRenewBalance,
} = require("../../models");
const {
  controllerWrapper,
  joiValidation,
  authenticate,
} = require("../../middlewares");

const operationsAddValidation = joiValidation(joiSchemaAddOperation);
const renewBalanceValidation = joiValidation(joiSchemaRenewBalance);

transactionsRouter.get(
  "/balance",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getBalance)
);

transactionsRouter.patch(
  "/balance",
  renewBalanceValidation,
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
  operationsAddValidation,
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.addOperations)
);

transactionsRouter.delete(
  "/:operationType/:operationId",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.deleteOperationFromTransactions)
);

module.exports = transactionsRouter;
