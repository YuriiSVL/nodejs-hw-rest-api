const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares/validateBody");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema, "wrong register field"),
  ctrl.register
);
// signin
router.post(
  "/login",
  validateBody(schemas.loginSchema, "wrong login field"),
  ctrl.login
);

module.exports = router;
