const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { isValidId, authenticate, validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.listContacts);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema, "missing required name field"),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  authenticate,
  validateBody(schemas.addSchema, "missing fields"),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.updateFavorite
);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

module.exports = router;
