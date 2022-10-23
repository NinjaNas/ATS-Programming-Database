// Dependencies
const express = require("express");
const router = express.Router();
const { hash } = require("../../utils/bcrypt");
const pool = require("../../utils/pool");

pool.getConnection(function (err, connection) {
  // Bad connection
  if (err) throw err;

  router.post("/", (req, res) => {
    // Object destructuring
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

    connection.execute(
      "SELECT * FROM users WHERE email=?",
      [email],
      (err, rows, fields) => {
        if (err) throw err;

        // falsey, if 0 then there is no user with the same email
        if (rows.length) {
          // Error out if email exists
          res.status(400).send({ msg: "Email already exists!" });
        } else {
          // Use hash function from utils/bcrypt.js
          const password_hash = hash(req.body.password_hash);
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

        //New session creator if student type given.
        if (type == "student") {
          //Pulls ID of current user
          connection.query(
            "SELECT id FROM users WHERE email=?",
            [email],
            (err, user_id, fields) => {
              if (err) throw err;

              //Creates new session with ID
              connection.execute(
                "INSERT INTO session (user_id, intake_date, school_administrator, social_worker, school_counselor, student_pickup) VALUES (?, ?, ?, ?, ?, ?);",
                [
                  user_id[0].id,
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
          );
        }

        // Release connection
        connection.release();
      }
    );
    // Successful HTTPS
    res.sendStatus(201);
  });
});

module.exports = router;
