const pool = require("../../utils/pool");

async function deleteController(req, res) {
  // Get session ID from req body
  const { session_id } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM session WHERE id=?;", [session_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length && session_id) {
    // Should handle questionnaire, task, day, and session
    await pool
      .execute(
        "DELETE task, sel_questionnaire, day FROM task INNER JOIN sel_questionnaire ON task.session_id = sel_questionnaire.session_id INNER JOIN day ON task.session_id = day.session_id WHERE task.session_id=?",
        [session_id]
      )
      .then(() => {
        console.log(
          session_id +
            " session id deleted from all task, questionnaire, and day tables"
        );
      })
      .catch((err) => {
        console.log(err);
      });

    // Delete session entry with cooresponding id
    await pool
      .execute("DELETE FROM session WHERE id=?", [session_id])
      .then(() => {
        console.log(
          "Session id " + session_id + " deleted from session table."
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

module.exports = { deleteController };
