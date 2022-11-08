// Dependencies
const express = require("express");
const router = express.Router();
const update = require("./update");
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

// Routing
router.use("/update", update);

/**
 * GET request handler for returning session table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/demographics')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get("/", authorize(["admin", "counselor"]), async (req, res) => {
  /**
   * .query(), parameter substitution is handled on the client, including objects
   * 'SELECT * FROM demographics' is valid sql to select everything from the table 'demographics'
   *  rows is an array containing each row as an object
   *  fields is an array containing each field as an object
   */
  await pool
    .query("SELECT * FROM demographics;")
    .then((table) => {
      // Send HTTPS, promises return the table access rows at 0 and fields at 1
      res.send(table[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;