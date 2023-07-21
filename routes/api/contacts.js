const express = require("express");

// const contacts = require("../../models/contacts");
// const Joi = require("joi");

// const { HttpError } = require("../../helpers");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");
const { validateBody } = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post(
  "/",
  validateBody(schemas.addSchema, "missing required name field"),
  ctrl.add
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema, "missing fields"),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing fields"),
  ctrl.updateFavorite
);

module.exports = router;
