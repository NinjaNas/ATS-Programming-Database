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
    status,
    notes,
    user_id
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM users WHERE email=?;", [email])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

    //Overrides arguments with what's currently in the database if empty
    if (first_name == "") {
      first_name = rows[0].first_name;
    } if (last_name == "") {
      last_name = rows[0].last_name;
    } if (email == "") {
      email = rows[0].email;
    } if (status = "") {
      status = rows[0].status;
    } if (notes = "") {
      notes = rows[0].notes;
    }

    // Use hash function from utils/bcrypt.js
    const password_hash = hash(req.body.password);
    if (req.body.password = "") {
      password_hash = rows[0].password_hash;
    }
    /**
     * Checks for a user_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
    */
    await pool
      .execute(
        "UPDATE users SET (first_name, last_name, email, status, notes, password_hash) WHERE id=(user_id) VALUES(?, ?, ?, ?, ?, ?, ?);",
        [first_name, last_name, email, status, notes, password_hash, user_id]
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
