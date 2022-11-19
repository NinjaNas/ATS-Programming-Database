const pool = require("../../utils/pool");

async function updateController(req, res) {
  // Object destructuring
  let {
    id,
    phone,
    address,
    city,
    zip,
    status,
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM contact WHERE id=?;", [id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    //Overrides arguments with what's currently in the database if empty (Perfect code, no ways to improve it)
    // EO ---- This logic seems to stop values from updating to a 0

 
    await pool
      .execute(
        "UPDATE contact SET phone=?, address=?, city=?, zip=?, status=? WHERE id=?;",

        [
          phone,
          address,
          city,
          zip,
          status,
          rows[0].id 
        ]
      )
      .then(() => {
        console.log("Demographics values updated for user id " + user_id);
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
