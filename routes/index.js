const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("CSE 341 Lesson 3 API is running");
});

router.use("/contacts", require("./contacts"));

module.exports = router;
