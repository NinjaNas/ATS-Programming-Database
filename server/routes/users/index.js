// Dependencies
require('dotenv').config();
const express = require('express');
const create = require('./create');
const router = express.Router();
const mysql = require('mysql2');

// Routing 
router.use('/create', create);

// Sets a connection to PlanetScale using a connection string in the .env file
const connection = mysql.createConnection(process.env.DATABASE_URL);
// Connect to database and error checking
connection.connect((err) => {
  if (err) throw err;
});
console.log('Connected to PlanetScale at /users/index.js!');

/**
 * GET request handler for returning users table
 * 
 * '/' - route path will match requests to the root route (in this case it would be '/users')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get('/', (req, res) => {
    /** 
     * .query(), parameter substitution is handled on the client, including objects
     * 'SELECT * FROM users' is valid sql to select everything from the table 'users'
     *  rows is an array containing each row as an object
     *  fields is an array containing each field as an object
    */
    connection.query('SELECT * FROM users', (err, rows, fields) => {
      // Error checking for bad query
      if (err) throw err;
      
      // Send HTTPS
      res.send(rows);
    });
  });

module.exports = router; 
