// Dependencies
const express = require("express");
const passport = require("passport");
const router = express.Router();
const { loginController } = require("../controllers/login");

// passport.authenticate() is middleware to check if user is logged in before running api call
router.post("/", passport.authenticate("local"), loginController);

module.exports = router;
