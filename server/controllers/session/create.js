const pool = require("../../utils/pool");

async function createController(req, res) {
  // Object destructuring
  const {
    user_id,
    intake_date,
    grade,
    school_id,
    school_admin,
    social_worker,
    school_counselor,
    pickup,
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM users WHERE id=?;", [user_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    /**
     * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
     * The VALUES(?) is standard way to insert variables into a SQL statement using an array
     */
    await pool
      .execute(
        "INSERT INTO session (user_id, intake_date, grade, school_id, school_administrator, social_worker, school_counselor, student_pickup) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [
          user_id,
          intake_date,
          grade,
          school_id,
          school_admin,
          social_worker,
          school_counselor,
          pickup,
        ]
      )
      .then(() => {
        console.log("New session created with associated UUID " + user_id);
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

module.exports = { createController };
