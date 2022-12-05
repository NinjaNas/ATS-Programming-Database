const pool = require("../../utils/pool");

async function updateController(req, res) {
  // Format body
  let keys = req.body;
  let id = req.body.user_id;
  // Required field "user_id"
  delete keys.user_id;

  let [rows, fields] = await pool
    .query("SELECT * FROM medical WHERE user_id=?;", [id])
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
      .query("UPDATE medical SET ? WHERE user_id=?;", [keys, id])
      .then(() => {
        console.log("Medical values updated for user id " + id);
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
