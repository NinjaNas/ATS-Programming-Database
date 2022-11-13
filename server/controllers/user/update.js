const { hash } = require("../../utils/bcrypt");
const pool = require("../../utils/pool");

async function updateController(req, res) {
  // Object destructuring
  let { first_name, last_name, email, pronouns, status, notes, user_id, password } =
    req.body;

  let [rows, fields] = await pool
    .query("SELECT * FROM users WHERE email=?;", [email])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    //Overrides arguments with what's currently in the database if empty
    if (first_name == "") {
      first_name = rows[0].first_name;
    }
    if (last_name == "") {
      last_name = rows[0].last_name;
    }
    if (email == "") {
      email = rows[0].email;
    }
    if (status == "") {
      status = rows[0].status;
    }
    if (notes == "") {
      notes = rows[0].notes;
    } if (pronouns == "") {
      pronouns = rows[0].pronouns;
    }

    // Use hash function from utils/bcrypt.js
    const password_hash = hash(password);
    if (password == "") {
      password_hash = rows[0].password_hash;
    }
    /**
     * Checks for a user_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
     */
    await pool
      .execute(
        "UPDATE users SET (first_name, last_name, email, status, notes, password_hash, pronouns) WHERE id=(user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
        [first_name, last_name, email, status, notes, password_hash, pronouns, user_id]
      )
      .then(() => {
        console.log("User values updated for user id " + user_id);
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
