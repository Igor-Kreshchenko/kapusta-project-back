const express = require("express");
const { joiBalanceSchema } = require("../../models/balance");
const {
  joiValidation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const ctrl = require("../../controllers/balance");

const balanceRouter = express.Router();

const orderValidationMiddleware = joiValidation(joiBalanceSchema);

balanceRouter.get(
  "/",
  controllerWrapper(authenticate),
  orderValidationMiddleware,
  controllerWrapper(ctrl.getBalance)
);

module.exports = balanceRouter;
