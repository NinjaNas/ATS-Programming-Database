const e = require("cors");
const pool = require("../../../utils/pool");

async function deleteController(req, res) {
  // Get day ID from req body
  const { day_id } = req.body;
  let [rows, fields] = await pool
    .query("SELECT * FROM day WHERE id=?;", [day_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    // Delete day entry with cooresponding id
    pool
      .execute("DELETE FROM day WHERE id=?", [day_id])
      .then(() => {
        console.log(day_id + " deleted from day table.");
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
