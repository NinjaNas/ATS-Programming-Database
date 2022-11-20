const pool = require("../../utils/pool");

async function updateController(req, res) {
  // Object destructuring
  let {
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
    user_id,
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM demographics WHERE user_id=?;", [user_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    //Overrides arguments with what's currently in the database if empty (Perfect code, no ways to improve it)
    // EO ---- This logic seems to stop values from updating to a 0

    // if (date_of_birth == "") {
    //   date_of_birth = rows[0].date_of_birth;
    // }
    // if (gender == "") {
    //   gender = rows[0].gender;
    // }
    // if (gender_other == "") {
    //   gender_other = rows[0].gender_other || "";
    // }
    // if (race_bl == "") {
    //   race_bl = rows[0].race_bl;
    // }
    // if (race_ai == "") {
    //   race_ai = rows[0].race_ai;
    // }
    // if (race_as == "") {
    //   race_as = rows[0].race_as;
    // }
    // if (race_nhpi == "") {
    //   race_nhpi = rows[0].race_nhpi;
    // }
    // if (race_wh == "") {
    //   race_wh = rows[0].race_wh;
    // }
    // if (race_other == "") {
    //   race_other = rows[0].race_other;
    // }
    // if (race_other_specify == "") {
    //   race_other_specify = rows[0].race_other_specify || "";
    // }
    // if (ethnicity == "") {
    //   ethnicity = rows[0].ethnicity;
    // }
    // if (free_lunch == "") {
    //   free_lunch = rows[0].free_lunch;
    // }

    /**
     * Checks for a user_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
     */
    console.log(date_of_birth, gender, gender_other, race_bl, race_ai, race_as, race_nhpi, race_wh, race_other,
      race_other_specify, ethnicity, free_lunch)
    await pool
      .execute(
        // "UPDATE demographics SET (date_of_birth, gender, gender_specify, race_bl, race_ai, race_as, race_nhpi, race_wh, race_other, race_other_specify, ethnicity, free_lunch) WHERE id=(?) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        "UPDATE demographics SET date_of_birth=?, gender=?, gender_other=?, race_bl=?, race_ai=?, race_as=?, race_nhpi=?, race_wh=?, race_other=?, race_other_specify=?, ethnicity=?, free_lunch=? WHERE id=?;",

        [
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
          rows[0].id // previous use of user_id was incorrect since we're checking for id
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
