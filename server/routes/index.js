// Dependencies
const express = require("express");
const router = express.Router();
const users = require("./users");
const login = require("./login");

// Routing
router.use("/users", users);
router.use("/login", login);

module.exports = router;
