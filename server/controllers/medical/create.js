const pool = require("../../utils/pool");

async function createController(req, res) {
  // Object destructuring
  const {
    id,
    contact_name,
    contact_relationship,
    contact_phone,
    physician,
    hospital,
    medical_concerns,
    allergies,
    allergies_list,
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
          "INSERT INTO demographics (id, contact_name, contact_relationship, contact_phone, physician, hospital, medical_concerns, allergies, allergies_list) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
          [
            id,
          contact_name,
          contact_relationship,
          contact_phone,
          physician,
          hospital,
          medical_concerns,
          allergies,
          allergies_list,
          ]
        )
        // .then() can be used because promise not destructured
        .then(() => {
          console.log("Molto bene");
        })
        .catch((err) => {
          console.log(err);
        });
      // Successful HTTPS
      res.sendStatus(201);
    }
  }
}

module.exports = { createController };
