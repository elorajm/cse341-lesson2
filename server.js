const { connectToDatabase } = require("./db/connect");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/", require("./routes"));

app.get("/", (req, res) => {
  res.send("Lesson 2 API running");
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
