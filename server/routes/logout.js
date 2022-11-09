// Dependencies
const express = require("express");
const router = express.Router();
const { logoutController } = require("../controllers/logout");

// logout if user is login first
router.post("/", logoutController);

module.exports = router;
