const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

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

    const result = await db
      .collection("contacts")
      .findOne({ _id: contactId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllContacts, getContactById };
