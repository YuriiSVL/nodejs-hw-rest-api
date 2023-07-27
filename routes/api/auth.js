const express = require("express");
const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");
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

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema, "wrong field"),
  ctrl.updateSubscription
);

module.exports = router;
