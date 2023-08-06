const express = require("express");
const router = express.Router();

const { validateBody, authenticate, upload } = require("../../middlewares");
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
  validateBody(schemas.updateSubscriptionSchema, "wrong request"),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.uploadAvatar
);

module.exports = router;
