// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor", "student", "parent"]), async (req, res) => {
  // Object destructuring
  const {
    task_type,
    task_name,
    start_date,
    due_date,
    task_description,
    status,
    end_date,
    task_id
  } = req.body;

    /**
     * Checks for a task_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
    */
    await pool
      .execute(
        "UPDATE task SET (task_type, task_name, start_date, due_date, task_description, status, end_date) WHERE id=(task_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
            task_type,
            task_name,
            start_date,
            due_date,
            task_description,
            status,
            end_date,
            task_id
        ]
      )
      .then(() => {
        console.log("Task values updated for task id " + task_id);
      })
      .catch((err) => {
        console.log(err);
      });
  // Successful HTTPS
  res.sendStatus(201);
});

module.exports = router;
