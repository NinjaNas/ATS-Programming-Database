// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor"]), async (req, res) => {
  // Object destructuring
  const {
    intake_date,
    grade, 
    school_id,
    school_admin,
    social_worker,
    school_counselor,
    pickup,
    session_id
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM user WHERE email=?;", [email])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

    //Overrides arguments with what's currently in the database if empty
    if (intake_date == "") {
      intake_date = rows[0].intake_date;
    } if (grade == "") {
      grade = rows[0].grade;
    } if (school_id == "") {
      school_id = rows[0].school_id;
    } if (school_admin = "") {
      school_admin = rows[0].school_admin;
    } if (social_worker = "") {
      social_worker = rows[0].social_worker;
    } if (school_counselor = "") {
      school_counselor = rows[0].school_counselor;
    } if (pickup = "") {
      pickup = rows[0].pickup;
    }

    /**
     * Checks for a session_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
    */
    await pool
      .execute(
        "UPDATE session SET (intake_date, grade, school, school_administrator, social_worker, school_counselor, student_pickup) WHERE id=(session_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
            intake_date,
            grade, 
            school_id,
            school_admin,
            social_worker,
            school_counselor,
            pickup,
            session_id
        ]
      )
      .then(() => {
        console.log("Session values updated for session id " + session_id);
      })
      .catch((err) => {
        console.log(err);
      });
  // Successful HTTPS
  res.sendStatus(201);
});

module.exports = router;
