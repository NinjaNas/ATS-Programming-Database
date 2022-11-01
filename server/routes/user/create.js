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
    date_of_birth,
    gender,
    gender_specify,
    race_bl,
    race_ai,
    race_as,
    race_nhpi,
    race_wh,
    race_other,
    race_other_specify,
    ethnicity,
    free_lunch
  } = req.body;

  /**
   * https://stackoverflow.com/questions/60476055/javascript-promises-unhandledpromiserejectionwarning
   * try/catch also works but let is out of scope
   */
  let [rows, fields] = await pool
    .query("SELECT * FROM users WHERE email=?;", [email])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  // falsey, if 0 then there is no user with the same email
  if (rows.length) {
    // Error out if email exists
    res.status(400).send({ msg: "Email already exists!" });
  } else {
    // Use hash function from utils/bcrypt.js
    const password_hash = hash(req.body.password);
    /**
     * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
     * The VALUES(?) is standard way to insert variables into a SQL statement using an array
     */
    await pool
      .execute(
        "INSERT INTO user (first_name, last_name, email, type, password_hash) VALUES (?, ?, ?, ?, ?);",
        [first_name, last_name, email, type, password_hash]
      )
      .then(() => {
        console.log("Values inserted!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //New session creator if student type given.
  if (type == "student") {
    //Pulls ID of current user
    let [user_id, fields] = await pool
      .query("SELECT id FROM user WHERE email=?;", [email])
      .catch((err) => {
        console.log(err);
      });

    //Creates new demographics with ID
    await pool
      .execute(
        "INSERT INTO demographics (user_id, date_of_birth, gender, gender_specify, race_bl, race_ai, race_as, race_nhpi, race_wh, race_other, race_other_specify, ethnicity, free_lunch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          user_id[0].id,
          date_of_birth,
          gender,
          gender_specify,
          race_bl,
          race_ai,
          race_as,
          race_nhpi,
          race_wh,
          race_other,
          race_other_specify,
          ethnicity,
          free_lunch
        ]
      )
      // .then() can be used because promise not destructured
      .then(() => {
        console.log("More success!");
        connection.release();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Successful HTTPS
  res.sendStatus(201);
});

module.exports = router;
