const { hash } = require("../../utils/bcrypt");
const pool = require("../../utils/pool");

async function createController(req, res) {
  // Object destructuring
  const { first_name, last_name, email, pronouns, created_at, type, notes } =
    req.body;

  /**
   * https://stackoverflow.com/questions/60476055/javascript-promises-unhandledpromiserejectionwarning
   * try/catch also works but let is out of scope
   */
  let [rows, fields] = await pool
    .query("SELECT * FROM user WHERE email=?;", [email])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  // falsey, if 0 then there is no user with the same email
  if (rows.length) {
    // Error out if email exists
    res.sendStatus(400);
  } else {
    // Use hash function from utils/bcrypt.js
    const password_hash = hash(req.body.password);
    /**
     * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
     * The VALUES(?) is standard way to insert variables into a SQL statement using an array
     */
    await pool
      .execute(
        "INSERT INTO user (first_name, last_name, email, pronouns, created_at, type, password_hash, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [
          first_name,
          last_name,
          email,
          pronouns,
          created_at,
          type,
          password_hash,
          notes,
        ]
      )
      .then((response) => {
        console.log("Values inserted!");
        res.send({ id: response[0].insertId });
      })
      .catch((err) => {
        console.log(err);
      });
    // Successful HTTPS
    res.status(201);
  }
}

module.exports = { createController };
