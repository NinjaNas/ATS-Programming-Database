// Dependencies
const express = require("express");
const router = express.Router();
const users = require("./users");
const login = require("./login");
const logout = require("./logout");

// Routing
router.use("/users", users);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;
