const pool = require("../../../utils/pool");

async function updateController(req, res) {
  // Object destructuring
  let { column, new_value, task_id } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM task WHERE id=?;", [task_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    obj = {};
    obj[column] = new_value;
    await pool
      .query("UPDATE task SET ? WHERE id=?;", [obj, task_id])
      .then(() => {
        console.log("task_type updated for task id " + task_id);
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
