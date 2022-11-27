const pool = require("../../utils/pool");

async function deleteController(req, res) {
  // Get user ID from req body
  const { user_id, type, email } = req.body;

  // Prevents the deletion of the first admin account
  if (type && email && !(email == "admin")) {
    // Subfiles entries only exist for student types, so they only need to be deleted if it's a student.
    if (type == "student") {
      // Grabs session_id associated with user id to pass to session.

      let [session_id, fields] = await pool
        .query("SELECT id FROM session WHERE user_id=?;", [user_id])
        .catch((err) => {
          // Do not throw error inside of promise
          console.log(err);
        });
      if (session_id[0]) {
        await pool
          .execute(
            "DELETE task, sel_questionnaire, day FROM task INNER JOIN sel_questionnaire ON task.session_id = sel_questionnaire.session_id INNER JOIN day ON task.session_id = day.session_id WHERE task.session_id=?",
            [session_id[0].id]
          )
          .then(() => {
            console.log(
              session_id[0].id +
                " session id deleted from all task, questionnaire, and day tables"
            );
          })
          .catch((err) => {
            console.log(err);
          });

        // Should call ../session/delete which should handle questionnaire, task, day, and session
        await pool
          .execute("DELETE FROM session WHERE id=?", [session_id[0].id])
          .then(() => {
            console.log(session_id[0].id + " deleted from session table.");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //Delete associated user_id from demographics
      await pool
        .execute("DELETE FROM demographics WHERE user_id=?", [user_id])
        .then(() => {
          console.log(user_id + " student id deleted from demographics table.");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Delete user entry from table with cooresponding id after all other connected tables are handled.
    await pool
      .execute("DELETE FROM user WHERE id=?", [user_id])
      .then(() => {
        console.log(user_id + " deleted from user table.");
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
