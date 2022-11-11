const pool = require("../../../utils/pool");

async function createController(req, res) {
  // Object destructuring
  const {
    session_id,
    task_type,
    task_name,
    start_date,
    due_date,
    task_description,
    status,
    end_date,
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
        "INSERT INTO task (session_id, task_type, task_name, start_date, due_date, task_description, status, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [
          session_id,
          task_type,
          task_name,
          start_date,
          due_date,
          task_description,
          status,
          end_date,
        ]
      )
      .then(() => {
        console.log(
          "New task created with associated session id " + session_id
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
