const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");


const requiredFields = ["firstName", "lastName", "email", "favoriteColor", "birthday"];

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("contacts").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);

    const result = await db.collection("contacts").findOne({ _id: contactId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const db = getDb();
    const contact = req.body || {};

    const missing = requiredFields.filter((f) => !contact[f]);
    if (missing.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missing.join(", ")}` });
    }

    const result = await db.collection("contacts").insertOne(contact);

    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const contact = req.body || {};

    const missing = requiredFields.filter((f) => !contact[f]);
    if (missing.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missing.join(", ")}` });
    }

    await db.collection("contacts").replaceOne({ _id: contactId }, contact);

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);

    await db.collection("contacts").deleteOne({ _id: contactId });

    return res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
