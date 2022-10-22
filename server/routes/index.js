// Dependencies
const express = require("express");
const router = express.Router();
const users = require("./users");

// Routing
router.use("/users", users);

module.exports = router;
