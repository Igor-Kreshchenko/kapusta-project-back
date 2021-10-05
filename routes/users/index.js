const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const repeatEmailVerification = require("../../controllers/users");
const guard = require("../../helpers/guard");
const {
  validationCreateUser,
  validationLoginUser,
  validationVerifyUser,
} = require("./validation.js");

router.get("/current", guard, ctrl.current);
router.post("/signup", validationCreateUser, ctrl.signup);
router.post("/login", validationLoginUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);

router.get("/verify/:verificationToken", ctrl.verify);
router.post("/verify", validationVerifyUser, ctrl.repeatEmailVerification);

module.exports = router;
