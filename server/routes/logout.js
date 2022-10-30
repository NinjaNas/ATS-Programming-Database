// Dependencies
const express = require("express");
const router = express.Router();

// logout if user is login first
router.post("/", (req, res, next) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    // Removes current session
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      // clearCookie needs something to be sent to work
      res.clearCookie("connect.sid").sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
