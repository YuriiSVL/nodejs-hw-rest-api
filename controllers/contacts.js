const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 2, limit = 1, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const result = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt"
    ).populate("owner", "email subscription");

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } else {
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email subscription");

    res.json(result);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

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
