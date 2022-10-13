// Dependencies
const express = require("express");
const fs = require("fs");
const router = express.Router();
const pool = require("../pool");
var userId;

pool.getConnection(function (err, connection) {
  // Bad connection
  if (err) throw err;
  /**
   * GET request handler for returning users table
   *
   * '/student' - route path will match requests to the /users/create route
   * req - Receives GET request
   * res - Send back HTTPS result
   */
  router.get("/", (req, res) => {
    userId = req.query.id;
    fs.readFile("suspense.html", "utf8", (err, form) => {
      // Error checking for bad file read
      if (err) {
        console.error(err);
        return;
      }

      // Send form
      res.send(form);
    });
  });

  /**
   * POST request handler for inserting new user in 'session' table
   *
   * '/student' - route path will match requests to the /users/student route
   * req - Receives GET request
   * res - Send back HTTPS result
   */
  router.post("/", (req, res) => {
    /**
     * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
     * The VALUES(?) is standard way to insert variables into a SQL statement using an array
     */
    // Create session associated with student
    connection.execute(
        "INSERT INTO session (user_id, intake_date, school_administrator, social_worker, school_counselor, student_pickup) VALUES (?, ?, ?, ?, ?, ?);",
        [userId, req.body.intake_date,req.body.school_admin, req.body.social_worker, req.body.school_counselor, req.body.pickup],
        (err, items, fields) => {
          // Error checking for bad query
          if (err) throw err;
           // Send HTTPS, redirect to root
           else res.redirect("/users");    
           // Release connection
           connection.release();
      }
    );
//Should have this execute a demographics creation as well.
  });
});
module.exports = router;
