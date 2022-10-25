// Dependencies
const express = require("express");
const router = express.Router();
const create = require("./create");
const { getConnection } = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

router.use(authorize());

// Routing
router.use("/create", create);

/**
 * GET request handler for returning users table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/users')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get("/", async (req, res) => {
  // Await connection
  let connection = await getConnection();
  /**
   * .query(), parameter substitution is handled on the client, including objects
   * 'SELECT * FROM users' is valid sql to select everything from the table 'users'
   *  rows is an array containing each row as an object
   *  fields is an array containing each field as an object
   */
  await connection
    .query("SELECT * FROM users;")
    .then((table) => {
      // Send HTTPS, promises return the table access rows at 0 and fields at 1
      res.send(table[0]);
      // Release connection
      connection.release();
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
