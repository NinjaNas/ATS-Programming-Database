// Dependencies
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');

// Create instance of express
const app = express();
// Use the environment variable PORT or 3000
const port = process.env.PORT || 3000;

// BodyParser is deprecated and express is a built-in parser
// Tells the the system that JSON is to be used
app.use(express.json());
// True for deep parsing (can do nested objects) and false for shallow parsing
app.use(express.urlencoded({ extended: true })); 

// Sets a connection to PlanetScale using a connection string in the .env file
const connection = mysql.createConnection(process.env.DATABASE_URL);
// Connect to database and error checking
connection.connect((err) => {
  if (err) throw err;
});
console.log('Connected to PlanetScale!');

/**
 * GET request handler for returning users table
 * 
 * '/' - route path will match requests to the root route
 * req - Receives GET request
 * res - Send back HTTPS result
 */
app.get('/', (req, res) => {
    /** 
     * .query(), parameter substitution is handled on the client, including objects
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
 * GET request handler for reading data from 
 * 
 * '/insert' - route path will match requests to the /insert route
 * req - Receives GET request
 * res - Send back HTTPS result
 */
app.get('/insert', (req, res)=>{
  fs.readFile('./insert.html', 'utf8', (err, data) => {
    // Error checking for bad file read
    if (err) {
      console.error(err);
      return;
    }
    // Send data to be used in POST request
    // console.log(data);
    res.send(data);
  });
});

/**
 * POST request handler for inserting new user in 'users' table
 * 
 * '/insert' - route path will match requests to the /insert route
 * req - Receives GET request
 * res - Send back HTTPS result
 */
app.post('/insert', (req, res) => {
  /**
   * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
   * The VALUES(?) is standard way to insert variables into a SQL statement using an array
   */
  connection.execute('INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?);', [req.body.first_name, req.body.last_name, req.body.email], (err, rows, fields) => {
    // Error checking for bad query
    if (err) throw err; // or return res.sendStatus(500)?
    
    // Send HTTPS, redirect to root
    res.redirect('/');
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