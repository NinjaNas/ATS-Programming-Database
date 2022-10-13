// Dependencies
const express = require("express");
const fs = require("fs");
const router = express.Router();
const pool = require("../pool");
const url = require("url");

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
      "INSERT INTO users (first_name, last_name, email, type, password_hash) VALUES (?, ?, ?, ?, ?);",
      [req.body.first_name, req.body.last_name, req.body.email, req.body.type, req.body.password_hash],
      (err, rows, fields) => {
        // Error checking for bad query
        if (err) {
          // Checks for the "already used" error, which can only happen via used email, and logs it
          if (err.errno == 1062) console.log("Account already established with that email.");
          else throw err;
        }

        //Looks for student type
        if (req.body.type == "student") {

          //Pulls ID of current user
          connection.query(
            "SELECT id FROM users WHERE email='" + req.body.email + "'", 
            (err, userId, fields) => {
            if (err) throw err;
            res.redirect(url.format({
              pathname:"./student",
              query: {
                "id": Number(userId[0].id)
              }
            }));
          });
        }
        // Send HTTPS, redirect to root
        else res.redirect("/users");    

        // Release connection
        connection.release();
      }
    );
  });
});
module.exports = router;