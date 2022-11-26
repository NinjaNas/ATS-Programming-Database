const pool = require("../../utils/pool");

async function createController(req, res) {
  // Object destructuring
  const {
    user_id,
    intake_date,
    consented,
    grade,
    school,
    school_administrator,
    social_worker,
    school_counselor,
    student_pickup,
    status,
    notes,
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM user WHERE id=?;", [user_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  console.log(
    user_id,
    intake_date,
    consented,
    grade,
    school,
    school_administrator,
    social_worker,
    school_counselor,
    student_pickup,
    status,
    notes
  );
  if (rows.length) {
    /**
     * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
     * The VALUES(?) is standard way to insert variables into a SQL statement using an array
     */
    await pool
      .execute(
        "INSERT INTO session (user_id, intake_date, consented, grade, school, school_administrator, social_worker, school_counselor, student_pickup, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          user_id,
          intake_date,
          consented,
          grade,
          school,
          school_administrator,
          social_worker,
          school_counselor,
          student_pickup,
          status,
          notes,
        ]
      )
      .then((response) => {
        // console.log(response[0].insertId);
        console.log("New session created with associated UUID " + user_id);
        // res.sendStatus(201) //.json({"session_id": response.insertedId});
        res.json({ session_id: response[0].insertId });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
    // Successful HTTPS
    res.status(201);
  } else {
    res.sendStatus(400);
  }
}

module.exports = { createController };
