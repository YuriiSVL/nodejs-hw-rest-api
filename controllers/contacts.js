const { HttpError, ctrlWrapper } = require("../helpers");

const Contact = require("../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  // const result = await contacts.listContacts();
  const result = await Contact.find({ owner }, "-createAt -updateAt");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  // const result = await contacts.getContactById(contactId);
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  // const result = await contacts.addContact(req.body);
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  // const result = await contacts.removeContact(contactId);
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
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
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
