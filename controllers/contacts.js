// const Joi = require("joi");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// const addSchema = require("../schemas/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

// const contacts = require("../models/contacts");

const Contact = require("../models/contact");

const getAll = async (req, res) => {
  // const result = await contacts.listContacts();
  const result = await Contact.find();
  res.json(result);
  console.log(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  // const result = await contacts.getContactById(contactId);
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, "missing required name field");
  //   }

  // const result = await contacts.addContact(req.body);
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  // const result = await contacts.removeContact(contactId);
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const update = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);

  //   if (error) {
  //     throw HttpError(400, "missing fields");
  //   }
  const { contactId } = req.params;

  // const result = await contacts.updateContact(contactId, req.body);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);

  return result;
};

const updateFavorite = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);

  //   if (error) {
  //     throw HttpError(400, "missing fields");
  //   }

  const { contactId } = req.params;

  // const result = await contacts.updateContact(contactId, req.body);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);

  return result;
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteContact: ctrlWrapper(deleteContact),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
