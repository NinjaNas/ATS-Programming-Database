const pool = require("../../../utils/pool");

async function updateController(req, res) {
  // Object destructuring
  let {
    session_id,
    type,
    question_strengths,
    question_help,
    question_pride,
    question_relationships,
    question_collaboration,
    question_composure,
    question_goals,
    status,
    notes,
  } = req.body;

  //console.log(req.body);

  let [rows, fields] = await pool
    .query("SELECT * FROM sel_questionnaire WHERE session_id=? AND type=?;", [
      session_id,
      type
    ])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

    //console.log(rows[0].id)

  if (rows.length) {

    /**
     * Checks for a session_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
     */
    await pool
      .execute(
        "UPDATE sel_questionnaire SET question_strengths=?, question_help=?, question_pride=?, question_relationships=?, question_collaboration=?, question_composure=?, question_goals=?, status=?, notes=? WHERE id=?;",
        [
          question_strengths,
          question_help,
          question_pride,
          question_relationships,
          question_collaboration,
          question_composure,
          question_goals,
          status,
          notes,
          rows[0].id
        ]
      )
      .then(() => {
        let beginend = "beginning";
        if (type == 2) {
          beginend = "end";
        }
        console.log(
          "Questionnaire values updated for session id " +
            session_id +
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
