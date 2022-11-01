// Dependencies
const express = require("express");
const router = express.Router();
const user = require("./user");
const login = require("./login");
const logout = require("./logout");
const session = require("./session")

// Routing
router.use("/user", user);
router.use("/login", login);
router.use("/logout", logout);
router.use("/session", session);

module.exports = router;
