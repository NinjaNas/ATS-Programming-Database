// Dependencies
const express = require("express");
const passport = require("passport");
const router = express.Router();

// passport.authenticate() is middleware to check if user is logged in before running api call
router.post("/", passport.authenticate("local"), async (req, res) => {
  console.log("Logged In");
  res.sendStatus(200);
});

module.exports = router;
