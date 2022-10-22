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
        if (err) throw err;

        console.log("Values inserted!");

        // Send HTTPS, redirect to root, React page does not get redirected
        res.redirect("/api/users");

        // Release connection
        connection.release();
      }
    );
  });
});
module.exports = router;
