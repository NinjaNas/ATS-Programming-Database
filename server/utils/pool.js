require("dotenv").config();
const mysql = require("mysql2/promise");

// Sets a pool of 10 (default value) connections to PlanetScale using a connection string in the .env file
const pool = mysql.createPool(process.env.DATABASE_URL);

// getConnection function
const getConnection = () =>
  pool.getConnection((err) => {
    if (err) throw err;
  });

console.log("Connected to PlanetScale!");

module.exports = { getConnection };
