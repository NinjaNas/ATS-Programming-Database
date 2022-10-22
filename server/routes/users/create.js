// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../pool");

pool.getConnection(function (err, connection) {
  // Bad connection
  if (err) throw err;

  /**
   * POST request handler for inserting new user in 'users' table
   *
   * '/create' - route path will match requests to the /users/create route
   * req - Receives GET request
   * res - Send back HTTPS result
   */
  router.post("/", (req, res) => {
    /**
     * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
     * The VALUES(?) is standard way to insert variables into a SQL statement using an array
     */
    connection.execute(
      "INSERT INTO users (first_name, last_name, email, type) VALUES (?, ?, ?, ?);",
      [req.body.first_name, req.body.last_name, req.body.email, req.body.type],
      (err, rows, fields) => {
        // Error checking for bad query
        if (err) {
          if (err.errno == 1096) console.log("Account already established with that email.");
          else throw err;
        } else console.log("Values inserted!");

        // Release connection
        connection.release();
      }
    );
    
    //New session creator if student type given.
    if (req.body.type == "student") {

      //Pulls ID of current user
      connection.query(
        "SELECT id FROM users WHERE email=?", [req.body.email], 
        (err, userId, fields) => {
        if (err) throw err;

        //Creates new session with ID
        connection.execute(
          "INSERT INTO session (user_id, intake_date, school_administrator, social_worker, school_counselor, student_pickup) VALUES (?, ?, ?, ?, ?, ?);",
          [userId[0].id, req.body.intake_date,req.body.school_admin, req.body.social_worker, req.body.school_counselor, req.body.pickup],
          (err, items, fields) => {
            // Error checking for bad query
            if (err) throw err;

             // Release connection
             connection.release();
             
             console.log("More success!");
        }
      );
      });
    }
  });
});
module.exports = router;
