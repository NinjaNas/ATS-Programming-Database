const pool = require("../../../utils/pool");

async function updateController(req, res) {
  // Format body
  let keys = req.body;
  let id = req.body.task_id;
  // Required field "task_id"
  delete keys.task_id;

  let [rows, fields] = await pool
    .query("SELECT * FROM wrap_up_meeting WHERE id=?;", [id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    await pool
      .query("UPDATE wrap_up_meeting SET ? WHERE id=?;", [keys, id])
      .then(() => {
        console.log("wrap up meeting updated for meeting id " + id);
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
