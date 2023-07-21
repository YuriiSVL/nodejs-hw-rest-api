const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");
const { validateBody } = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post(
  "/",
  validateBody(schemas.addSchema, "missing required name field"),
  ctrl.addContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema, "missing fields"),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.updateFavorite
);

module.exports = router;
