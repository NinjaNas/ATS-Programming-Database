// Dependencies
const express = require('express');
const create = require('./create');
const router = express.Router();
const pool = require('../pool');

// Routing 
router.use('/create', create);

pool.getConnection(function(err, connection) {
  // Bad connection
  if (err) throw err; 
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

        // Release connection
        connection.release();
      });
    });
    
});
module.exports = router; 
