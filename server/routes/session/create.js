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
    user_id,
    intake_date,
    grade, 
    school_id,
    school_admin,
    social_worker,
    school_counselor,
    pickup,
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
        "INSERT INTO session (user_id, intake_date, grade, school_id, school_administrator, social_worker, school_counselor, student_pickup) VALUES (?, ?, ?, ?, ?, ?);",
        [
          user_id,
          intake_date,
          grade, 
          school_id,
          school_admin,
          social_worker,
          school_counselor,
          pickup,
        ]
      )
      .then(() => {
        console.log("New session created with associated UUID " + user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Successful HTTPS
  res.sendStatus(201);
});

module.exports = router;
