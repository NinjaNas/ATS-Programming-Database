const pool = require("../../../utils/pool");

async function deleteController(req, res) {
  // Get user ID from req body
  const { task_id } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM task WHERE id=?;", [task_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    // Delete task entry with cooresponding id
    pool
      .execute("DELETE FROM task WHERE id=?", [task_id])
      .then(() => {
        console.log(task_id + " deleted from task table.");
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

module.exports = { deleteController };
