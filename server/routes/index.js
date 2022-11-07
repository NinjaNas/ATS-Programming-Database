// Dependencies
const express = require("express");
const router = express.Router();
const user = require("./user");
const login = require("./login");
const logout = require("./logout");
const session = require("./session")
//const data = require("./data")
const demographics = require("./demographics")

// Routing
router.use("/user", user);
router.use("/login", login);
router.use("/logout", logout);
router.use("/session", session);
//router.use("/data", data);
router.use("/demographics", demographics);

module.exports = router;
