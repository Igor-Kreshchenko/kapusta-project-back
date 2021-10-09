const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { joiUserSchema } = require("../../models");
const {
  joiValidation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");

const userValidationMiddleware = joiValidation(joiUserSchema);

router.post(
  "/signup",
  userValidationMiddleware,
  controllerWrapper(ctrl.signup)
);
router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));
router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

module.exports = router;
