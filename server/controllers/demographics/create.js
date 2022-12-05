const pool = require("../../utils/pool");

async function createController(req, res) {
  // Object destructuring
  const {
    id,
    date_of_birth,
    gender,
    gender_other,
    race_bl,
    race_ai,
    race_as,
    race_nhpi,
    race_wh,
    race_other,
    race_other_specify,
    ethnicity,
    free_lunch,
  } = req.body;

  /**
   * https://stackoverflow.com/questions/60476055/javascript-promises-unhandledpromiserejectionwarning
   * try/catch also works but let is out of scope
   */
  let [rows, fields] = await pool
    .query("SELECT * FROM user WHERE id=?;", [id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  // if 0 then there is no user
  if (!rows.length) {
    // Error out if no user
    res.sendStatus(400);
  } else {
    //New session creator if student type given.
    if (rows[0].type == "student") {
      //Creates new demographics with ID
      await pool
        .execute(
          "INSERT INTO demographics (user_id, date_of_birth, gender, gender_other, race_bl, race_ai, race_as, race_nhpi, race_wh, race_other, race_other_specify, ethnicity, free_lunch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
          [
            id,
            date_of_birth,
            gender,
            gender_other,
            race_bl,
            race_ai,
            race_as,
            race_nhpi,
            race_wh,
            race_other,
            race_other_specify,
            ethnicity,
            free_lunch,
          ]
        )
        // .then() can be used because promise not destructured
        .then((request) => {
          console.log("More success!");
          res.send({ demographics_id: request[0].insertId });
        })
        .catch((err) => {
          console.log(err);
        });
      // Successful HTTPS
      res.status(201);
    }
    res.status(400);
  }
}

module.exports = { createController };
