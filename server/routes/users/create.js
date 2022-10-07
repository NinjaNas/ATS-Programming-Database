// Dependencies
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const router = express.Router();
const mysql = require('mysql2');

// Sets a connection to PlanetScale using a connection string in the .env file
const connection = mysql.createConnection(process.env.DATABASE_URL);
// Connect to database and error checking
connection.connect((err) => {
  if (err) throw err;
});
console.log('Connected to PlanetScale at /users/create.js!');

// Cross-origin resource sharing, in order for your server to be accessible by other origins (domains)
// Enables the express server to respond to preflight requests
// Axios will need this to run correctly in the frontend
router.use(cors());

// BodyParser is deprecated and express is a built-in parser
// Tells the the system that JSON is to be used
router.use(express.json());
// True for deep parsing (can do nested objects) and false for shallow parsing
router.use(express.urlencoded({ extended: true })); 

/**
 * GET request handler for returning users table
 * 
 * '/create' - route path will match requests to the /users/create route
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get('/', (req, res)=>{
    fs.readFile('insert.html', 'utf8', (err, form) => {
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
router.post('/', (req, res) => {
    /**
     * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
     * The VALUES(?) is standard way to insert variables into a SQL statement using an array
     */
    connection.execute('INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?);', [req.body.first_name, req.body.last_name, req.body.email], (err, rows, fields) => {
        console.error(req.body.first_name);
        console.error(req.body.last_name);
        console.error(req.body.email);
        console.error(rows);
        console.error(fields);
      // Error checking for bad query
      if (err) {console.error(err)}; // or return res.sendStatus(500)?
      
      // Send HTTPS, redirect to root
      res.redirect('/');
    });
  });
  
module.exports = router; 