const express = require("express");

// const contacts = require("../../models/contacts");
// const Joi = require("joi");

// const { HttpError } = require("../../helpers");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  validateBody(schemas.addSchema, "missing required name field"),
  ctrl.add
);

router.delete("/:contactId", ctrl.deleteContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema, "missing fields"),
  ctrl.update
);

module.exports = router;
