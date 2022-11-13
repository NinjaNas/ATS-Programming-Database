// Dependencies
const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/userData");

// logout if user is login first
router.get("/", userController);

module.exports = router;
