const pool = require("../../../utils/pool");

async function updateController(req, res) {
  // Format body
  let keys = req.body;
  let id = req.body.session_id;
  // Required field "id"
  delete keys.session_id;

  console.log(keys);
  console.log(id);
  let [rows, fields] = await pool
    .query("SELECT * FROM sel_questionnaire WHERE session_id=? AND type=?;", [
      id,
      keys.type,
    ])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  console.log(rows);

  if (rows.length) {
    // Delete all null values from keys
    keys = Object.fromEntries(
      Object.entries(keys).filter(([_, v]) => v != null)
    );

    await pool
      .query("UPDATE sel_questionnaire SET ? WHERE session_id=?;", [keys, id])
      .then(() => {
        let beginend = "beginning";
        if (keys.type == 2) {
          beginend = "end";
        }
        console.log(
          "Questionnaire values updated for session id " +
            id +
            " at the " +
            beginend
        );
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
