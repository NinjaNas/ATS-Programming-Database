// Dependencies
const express = require("express");
const router = express.Router();
const { hash } = require("../../utils/bcrypt");
const pool = require("../../utils/pool");

pool.getConnection(function (err, connection) {
  // Bad connection
  if (err) throw err;

  // async function to make sure the session execute goes after
  router.post("/", async (req, res) => {
    // Destructuring
    const {
      first_name,
      last_name,
      email,
      type,
      intake_date,
      school_admin,
      social_worker,
      school_counselor,
      pickup,
    } = req.body;

    await connection.execute(
      "SELECT * FROM users WHERE email=?",
      [email],
      (err, rows, fields) => {
        if (err) throw err;

        // falsey, if 0 then there is no user with the same email
        if (rows.length) {
          res.status(400).send({ msg: "Email already exists!" });
        } else {
          // Use hash function from utils/bcrypt.js
          const password_hash = hash(req.body.password_hash);
          console.log(password_hash);
          /**
           * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
           * The VALUES(?) is standard way to insert variables into a SQL statement using an array
           */
          connection.execute(
            "INSERT INTO users (first_name, last_name, email, type, password_hash) VALUES (?, ?, ?, ?, ?);",
            [first_name, last_name, email, type, password_hash],
            (err, rows, fields) => {
              // Error checking for bad query
              if (err) throw err;
              console.log("Values inserted!");

              // Release connection
              connection.release();
            }
          );
        }

        // Release connection
        connection.release();
      }
    );

    //New session creator if student type given.
    if (type == "student") {
      //Creates new session with ID
      await connection.execute(
        "INSERT INTO session (intake_date, school_administrator, social_worker, school_counselor, student_pickup) VALUES (?, ?, ?, ?, ?);",
        [
          // rows[0].id,
          intake_date,
          school_admin,
          social_worker,
          school_counselor,
          pickup,
        ],
        (err, rows, fields) => {
          // Error checking for bad query
          if (err) throw err;

          console.log("More success!");

          // Release connection
          connection.release();
        }
      );
    }
    res.sendStatus(201);
  });
});

module.exports = router;
