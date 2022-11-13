const pool = require("../utils/pool");

async function sessionController(req, res) {
  console.log("Sent session");
  let [rows, fields] = await pool
    .query("SELECT * FROM session WHERE user_id=?;", [req.user[0][0].id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });
  if (rows.length) {
    console.log(rows[0]);
    res.send(rows[0]);
    res.status(200);
  } else {
    res.sendStatus(400);
  }
}

module.exports = { sessionController };
