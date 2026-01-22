const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToDatabase } = require("./db/connect");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

const port = process.env.PORT || 8080;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
