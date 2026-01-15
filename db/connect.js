const { MongoClient } = require("mongodb");

let db;

const connectToDatabase = async () => {
  if (db) {
    return db;
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  db = client.db("contactsDB");
  console.log("Connected to MongoDB");

  return db;
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};

module.exports = { connectToDatabase, getDb };
