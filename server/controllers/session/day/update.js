const pool = require("../../../utils/pool");

async function updateController(req, res) {
  // Object destructuring
  let { type, attendance_day, status, reason_missed, id } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM day WHERE id=?;", [id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    //Overrides arguments with what's currently in the database if empty
    if (attendance_day == "") {
      attendance_day = rows[0].attendance_day;
    }
    if (type == "") {
      type = rows[0].type;
    }
    if (reason_missed == "") {
      reason_missed = rows[0].reason_missed;
    }
    if (status == "") {
      status = rows[0].status;
    }

    /**
     * Checks for a task_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
     */
    await pool
      .execute(
        "UPDATE task SET (type, attendance_day, status, reason_missed) WHERE id=(id) VALUES (?, ?, ?, ?, ?);",
        [type, attendance_day, status, reason_missed, id]
      )
      .then(() => {
        console.log("Values updated for day id " + id);
      })
      .catch((err) => {
        console.log(err);
      });
    // Successful HTTPS
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
}

module.exports = { updateController };
