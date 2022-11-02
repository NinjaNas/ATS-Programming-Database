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
    user_id
  } = req.body;

    // Use hash function from utils/bcrypt.js
    const password_hash = hash(req.body.password);
    /**
     * Checks for a user_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
    */
    await pool
      .execute(
        "UPDATE user SET (first_name, last_name, email, type, password_hash) WHERE id=(user_id) VALUES(?, ?, ?, ?, ?, ?);",
        [first_name, last_name, email, type, password_hash, user_id]
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
