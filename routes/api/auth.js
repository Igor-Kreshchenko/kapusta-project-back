const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { joiUserSchema, joiSchemaVerifyEmail } = require("../../models");
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
router.get("/google", controllerWrapper(ctrl.googleAuth));
router.get("/google-redirect", controllerWrapper(ctrl.googleRedirect));
router.get(
  "/verify/:verificationToken",
  controllerWrapper(ctrl.verifyEmailByToken)
);
router.post(
  "/verify",
  joiValidation(joiSchemaVerifyEmail),
  controllerWrapper(ctrl.verifyEmailByPostRequest)
);
router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));
router.get(
  "/logout",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout)
);
router.get(
  "/current",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getCurrent)
);

module.exports = router;
