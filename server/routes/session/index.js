// Dependencies
const express = require("express");
const router = express.Router();
const create = require("./create");
const update = require("./update");
const del = require("./delete");
const day = require("./day");
const task = require("./task");
const questionnaire = require("./questionnaire");
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

// Routing
router.use("/create", create);
router.use("/update", update);
router.use("/delete", del);
router.use("/day", day);
router.use("/task", task);
router.use("/questionnaire", questionnaire);

/**
 * GET request handler for returning session table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/session')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get("/", authorize(["admin", "counselor"]), async (req, res) => {
  /**
   * .query(), parameter substitution is handled on the client, including objects
   * 'SELECT * FROM session' is valid sql to select everything from the table 'session'
   *  rows is an array containing each row as an object
   *  fields is an array containing each field as an object
   */
  await pool
    .query("SELECT * FROM session;")
    .then((table) => {
      // Send HTTPS, promises return the table access rows at 0 and fields at 1
      res.send(table[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
