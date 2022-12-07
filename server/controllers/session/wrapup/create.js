const pool = require("../../../utils/pool");

async function createController(req, res) {
  // Object destructuring
  const {
    session_id,
    meeting_date,
    meeting_time,
    location,
    family_rep,
    family_rep_attend,
    school_rep,
    school_rep_attend,
    other_rep,
    other_rep_attend,
    parent_translator,
    school_translator,
    outside_translator,
    court_involved,
    court_counselor,
    meeting_status,
    performing_admin,
    notes,
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM session WHERE id=?;", [session_id])
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
        "INSERT INTO wrap_up_meeting (session_id, meeting_date, meeting_time, location, family_rep, family_rep_attend, school_rep, school_rep_attend, other_rep, other_rep_attend, parent_translator, school_translator, outside_translator, court_involved, court_counselor, meeting_status, performing_admin, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          session_id,
          meeting_date,
          meeting_time,
          location,
          family_rep,
          family_rep_attend,
          school_rep,
          school_rep_attend,
          other_rep,
          other_rep_attend,
          parent_translator,
          school_translator,
          outside_translator,
          court_involved,
          court_counselor,
          meeting_status,
          performing_admin,
          notes,
        ]
      )
      .then(() => {
        console.log(
          "New wrap up meeting created with associated session id " + session_id
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

module.exports = { createController };
