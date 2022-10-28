// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../utils/pool");

// Pass in expected type
const authorize = (type) => {
  return router.use(async (req, res, next) => {
    console.log(`${req.method}:${req.baseUrl}`);
    // console.log(req.user);

    // If user is logged in continue, otherwise, 401
    if (req.user) {
      let id = req.user[0][0].id;
      console.log(id);
      await pool
        .query("SELECT type FROM users WHERE id=?;", [id])
        .then((table) => {
          // Send HTTPS, promises return the table access rows at 0 and fields at 1
          if (table[0][0].type === type) {
            next();
          } else {
            res.sendStatus(401);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else res.sendStatus(401);
  });
};

module.exports = { authorize };
