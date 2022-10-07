// Dependencies
const express = require("express");
const fs = require("fs");
const router = express.Router();
const pool = require("../pool");

pool.getConnection(function (err, connection) {
  // Bad connection
  if (err) throw err;
  /**
   * GET request handler for returning users table
   *
   * '/create' - route path will match requests to the /users/create route
   * req - Receives GET request
   * res - Send back HTTPS result
   */
  router.get("/", (req, res) => {
    fs.readFile("insert.html", "utf8", (err, form) => {
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
        if (err) throw err;

        // Send HTTPS, redirect to root
        res.redirect("/users");

        // Release connection
        connection.release();
      }
    );
  });
});
module.exports = router;
