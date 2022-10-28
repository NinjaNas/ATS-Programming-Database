// Dependencies
const express = require("express");
const router = express.Router();

// logout if user is login first
router.post("/", (req, res, next) => {
  console.log("hey");
  if (req.user) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      // Removes current session
      req.session.destroy((err) => {
        // does not work for some reason
        res.clearCookie("connect.sid", { path: "/", domain: "localhost" });
      });
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
