const pool = require("../../../utils/pool");

async function updateController(req, res) {
  // Format body
  let keys = req.body;

  let id = req.body.id;
  // Required field "task_id"
  delete keys.id;


  let [rows, fields] = await pool
    .query("SELECT * FROM user WHERE email=?;", [keys.email])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {

    // Delete all null values from keys
    keys = Object.fromEntries(
      Object.entries(keys).filter(([_, v]) => v != null)
    );

    await pool
      .query("UPDATE wrap_up_meeting SET ? WHERE session_id=?;", [keys, id])
      .then(() => {
        console.log("User values updated for user id " + id);
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
