const router = require("express").Router();

// Root route
router.get("/", (req, res) => {
  res.send("CSE 341 Contacts API is running");
});

// Contacts routes
router.use("/contacts", require("./contacts"));      // original routes
router.use("/api/contacts", require("./contacts"));  // Swagger routes

module.exports = router;
