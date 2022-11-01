// Dependencies
const express = require("express");
const router = express.Router();
const { hash } = require("../../utils/bcrypt");
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor"]), async (req, res) => {
  // Object destructuring
  const {
    first_name,
    last_name,
    email,
    type,
  } = req.body;

    // Use hash function from utils/bcrypt.js
    const password_hash = hash(req.body.password);
    /**
     * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
     * The VALUES(?) is standard way to update variables in an SQL statement using an array
     */
    await pool
      .execute(
        "UPDATE user SET (first_name, last_name, email, type, password_hash) WHERE id=? VALUES(?, ?, ?, ?, ?);", [user_id],
        [first_name, last_name, email, type, password_hash]
      )
      .then(() => {
        console.log("User values updated for user id " + user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  // Successful HTTPS
  res.sendStatus(201);
});

module.exports = router;
