// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor"]), async (req, res) => {
  // Object destructuring
  const {
    date_of_birth,
    gender,
    gender_specify,
    race_bl,
    race_ai,
    race_as,
    race_nhpi,
    race_wh,
    race_other,
    race_other_specify,
    ethnicity,
    free_lunch,
    user_id
  } = req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM demographics WHERE user_id=?;", [user_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

    //Overrides arguments with what's currently in the database if empty (Perfect code, no ways to improve it)
    if (date_of_birth == "") {
        date_of_birth = rows[0].date_of_birth;
    } if (gender == "") {
        gender = rows[0].gender;
    } if (gender_specify == "") {
        gender_specify = rows[0].gender_specify;
    } if (race_bl = "") {
        race_bl = rows[0].race_bl;
    } if (race_ai = "") {
        race_ai = rows[0].race_ai;
    } if (race_as = "") {
        race_as = rows[0].race_as;
    } if (race_nhpi = "") {
        race_nhpi = rows[0].race_nhpi;
    } if (race_wh = "") {
        race_wh = rows[0].race_wh;
    } if (race_other = "") {
        race_other = rows[0].race_other;
    } if (race_other_specify = "") {
        race_other_specify = rows[0].race_other_specify;
    } if (ethnicity = "") {
        ethnicity = rows[0].ethnicity;
    } if (free_lunch = "") {
        free_lunch = rows[0].free_lunch;
    }
    
    /**
     * Checks for a user_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
    */
    await pool
      .execute(
        "UPDATE demographics SET (date_of_birth, gender, gender_specify, race_bl, race_ai, race_as, race_nhpi, race_wh, race_other, race_other_specify, ethnicity, free_lunch) WHERE id=(user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
            date_of_birth,
            gender,
            gender_specify,
            race_bl,
            race_ai,
            race_as,
            race_nhpi,
            race_wh,
            race_other,
            race_other_specify,
            ethnicity,
            free_lunch,
            user_id
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
});

module.exports = router;
