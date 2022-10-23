// Dependencies
const express = require("express");
const router = express.Router();
const users = require("./users");
// const auth = require("./auth");

// Routing
router.use("/users", users);
// router.use("/auth", auth);

module.exports = router;
