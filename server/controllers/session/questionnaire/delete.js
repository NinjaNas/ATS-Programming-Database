const pool = require("../../../utils/pool");

async function deleteController(req, res) {
  // Get questionnaire ID from req body
  const { questionnaire_id } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM sel_questionnaire WHERE id=?;", [questionnaire_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    // Delete questionnaire entry with cooresponding id
    pool
      .execute("DELETE FROM sel_questionnaire WHERE id=?", [questionnaire_id])
      .then(() => {
        console.log(questionnaire_id + " deleted from questionnaire table.");
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
