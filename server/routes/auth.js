// Dependencies
const { response } = require("express");
const express = require("express");
const router = express.Router();
const { getConnection } = require("../utils/pool");
const { compareHash } = require("../utils/bcrypt");

router.post("/login", async (req, res) => {
  // Await connection
  let connection = await getConnection();

  const { email, password } = req.body;
  // Bad request if values aren't received correctly
  if (!email || !password) return res.sendStatus(400);

  let [rows, fields] = await connection
    .query("SELECT * FROM users WHERE email=?;", [email])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  // If no email matches, auth fails
  if (!rows.length) return res.sendStatus(401);

  // Grab the account and compare the login password to the hash password in the table
  const isValid = compareHash(password, rows[0].password_hash);

  if (isValid) {
    console.log("Authenticated Successfully!");
    // Attach the user object to the session, since the user is now attached to the session a cookie is attached to the session automatically
    req.session.user = rows[0];
    res.sendStatus(200);
  } else {
    console.log("Failed to Authenticate!");
    res.sendStatus(401);
  }
});

module.exports = router;
