const express = require("express");
const router = express.Router();
const { auth } = require("../../controllers");
const { joiUserSchema } = require("../../models");
const { validation, ctrl, authenticate } = require("../../validation");

router.post("/signup", validation(joiUserSchema), ctrl(auth.signup));
router.post("/login", validation(joiUserSchema), ctrl(auth.login));
router.get("/logout", ctrl(authenticate), ctrl(auth.logout));
router.get("/current", ctrl(authenticate), ctrl(auth.current));

module.exports = router;
