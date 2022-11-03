// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../../utils/pool");
const { authorize } = require("../../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor"]), async (req, res) => {
  // Object destructuring
  const {
    type,
    attendance_day,
    status,
    reason_missed,
    id
  } = req.body;

    /**
     * Checks for a task_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
    */
    await pool
      .execute(
        "UPDATE task SET (type, attendance_day, status, reason_missed) WHERE id=(id) VALUES (?, ?, ?, ?, ?);",
        [
            type,
            attendance_day,
            status,
            reason_missed,
            id
        ]
      )
      .then(() => {
        console.log("Values updated for day id " + id);
      })
      .catch((err) => {
        console.log(err);
      });
  // Successful HTTPS
  res.sendStatus(201);
});

module.exports = router;
