const pool = require("../utils/pool");

/**
 * If query is requested then respond with session data given the session id
 * Else return the session data of the current logged in user
 */
async function sessionController(req, res) {
  console.log("Sent session");

  let { query } = req.query;

  if (query) {
    // Only admin and counselors can query
    if (req.user[0][0].type == "admin" || req.user[0][0].type == "counselor") {
      session = query;
    } else {
      res.sendStatus(401);
    }
  } else {
    let [rows, fields] = await pool
      .query("SELECT * FROM session WHERE user_id=?;", [req.user[0][0].id])
      .catch((err) => {
        // Do not throw error inside of promise
        console.log(err);
      });
    query = rows[0].id;
  }

  let [rows, fields] = await pool
    .query("SELECT * FROM session WHERE id=?;", [query])
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
