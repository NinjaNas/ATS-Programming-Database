const pool = require("../../utils/pool");

async function updateController(req, res) {
  // Object destructuring
  let {
    user_id,
    contact_name,
    contact_relationship,
    contact_phone,
    physician,
    hospital,
    medical_concerns,
    allergies,
    allergies_list,
  } = req.body;

  console.log("--------------------------")
  console.log(req.body)

  let [rows, fields] = await pool
    .query("SELECT * FROM medical WHERE user_id=?;", [user_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    /**
     * Checks for a user_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
     */
    await pool
      .execute(
        "UPDATE medical SET contact_name=?, contact_relationship=?, contact_phone=?, physician=?, hospital=?, medical_concerns=?, allergies=?, allergies_list=? WHERE id=?;",

        [
          contact_name,
          contact_relationship,
          contact_phone,
          physician,
          hospital,
          medical_concerns,
          allergies,
          allergies_list,
          rows[0].id // previous use of user_id was incorrect since we're checking for id
        ]
      )
      .then(() => {
        console.log("Medical values updated for user id " + user_id);
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
