// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../../utils/pool");
const { authorize } = require("../../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor", "student", "parent"]), async (req, res) => {
  // Object destructuring
  let {
    task_type,
    task_name,
    start_date,
    due_date,
    task_description,
    status,
    end_date,
    task_id
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM task WHERE id=?;", [task_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

    //Overrides arguments with what's currently in the database if empty
    if (task_type == "") {
      task_type = rows[0].task_type;
    } if (task_name == "") {
      task_name = rows[0].task_name;
    } if (start_date == "") {
      start_date = rows[0].start_date;
    } if (due_date = "") {
      due_date = rows[0].due_date;
    } if (task_description = "") {
      task_description = rows[0].task_description;
    } if (status = "") {
      status = rows[0].status;
    } if (end_date = "") {
      end_date = rows[0].end_date;
    }

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
