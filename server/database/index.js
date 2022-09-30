// Dependencies
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

// Create instance of express
const app = express();
// Use the environment variable PORT or 3000
const port = process.env.PORT || 3000;

// Sets a connection to PlanetScale using a connection string in the .env file
const connection = mysql.createConnection(process.env.DATABASE_URL);
// Connect to database and error checking
connection.connect((err) => {
  if (err) throw err;
});
console.log('Connected to PlanetScale!');

/**
 * GET request handler
 * 
 * '/' - route path will match requests to the root route
 * req - Receives GET request
 * res - Send back HTTPS result
 */
app.get('/', (req, res) => {
    /** 
     * 'SELECT * FROM users' is valid sql to select everything from the table 'users'
     *  rows is an array containing each row as an object
     *  fields is an array containing each field as an object
    */
    connection.query('SELECT * FROM users', (err, rows, fields) => {
      // Error checking for bad query
      if (err) throw err; // or return res.sendStatus(500)?
      
      // Send HTTPS
      res.send(rows);
    });
  });
  
  /**
   * Event listener
   * 
   *  Binds and listens to the connections on the specified host and port
   */
  app.listen(port, () => {
    // Listens and prints out if port is running
    console.log(`Example app listening at http://localhost:${port}`);
  });