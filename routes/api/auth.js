const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { joiUserSchema } = require("../../models");
const { joiValidation, controllerWrapper } = require("../../middlewares");

const userValidationMiddleware = joiValidation(joiUserSchema);

router.post(
  "/signup",
  userValidationMiddleware,
  controllerWrapper(ctrl.signup)
);
router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));
router.get("/logout", userValidationMiddleware, controllerWrapper(ctrl.logout));
router.get(
  "/current",
  userValidationMiddleware,
  controllerWrapper(ctrl.current)
);

module.exports = router;
