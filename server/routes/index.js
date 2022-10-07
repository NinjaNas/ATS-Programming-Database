// Dependencies
const express = require('express');
const path = require('path');
const users = require('./users');
const router = express.Router();

// Routing
router.use('/users', users);

// Store static files from '../build', _dirname returns the path of the folder
router.use(express.static(path.join(__dirname, '../build')));

/**
 * GET request handler for returning React frontend
 * 
 * '/' - route path will match requests to the root route (routes is the root folder)
 * req - Receives GET request
 * res - Send back HTTPS result
 */
 router.get('/', (req, res) => {
    // Error checking for bad request
    if (err) throw err;
    
    // Sends React's index.html file
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

module.exports = router; 
