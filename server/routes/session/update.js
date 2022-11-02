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

    /**
     * Checks for a session_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
    */
    await pool
      .execute(
        "UPDATE session SET (intake_date, grade, school_id, school_administrator, social_worker, school_counselor, student_pickup) WHERE id=(session_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
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
