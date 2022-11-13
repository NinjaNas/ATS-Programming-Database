// Dependencies
const express = require("express");
const router = express.Router();
const { sessionController } = require("../controllers/sessionData");

// logout if user is login first
router.get("/", sessionController);

module.exports = router;
