const pool = require("../../utils/pool");

async function updateController(req, res) {
  // Object destructuring
  let {
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
    id,
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM session WHERE id=?;", [id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    //Overrides arguments with what's currently in the database if empty
    // if (intake_date == "") {
    //   intake_date = rows[0].intake_date;
    // }
    // if (grade == "") {
    //   grade = rows[0].grade;
    // }
    // if (school_id == "") {
    //   school_id = rows[0].school_id;
    // }
    // if (school_admin == "") {
    //   school_admin = rows[0].school_admin;
    // }
    // if (social_worker == "") {
    //   social_worker = rows[0].social_worker;
    // }
    // if (school_counselor == "") {
    //   school_counselor = rows[0].school_counselor;
    // }
    // if (pickup == "") {
    //   pickup = rows[0].pickup;
    // }

    /**
     * Checks for a session_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
     */
    await pool
      .execute(
        // "UPDATE session SET (intake_date, grade, school, school_administrator, social_worker, school_counselor, student_pickup) WHERE id=(session_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        "UPDATE session SET intake_date=?, consented=?, grade=?, school=?, school_administrator=?, social_worker=?, school_counselor=?, student_pickup=?, status=?, notes=? WHERE id=?;",
        [
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
          id,
        ]
      )
      .then(() => {
        console.log("Session values updated for session id " + id);
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
