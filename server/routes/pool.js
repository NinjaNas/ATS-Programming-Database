require("dotenv").config();
const mysql = require("mysql2");

// Sets a pool of 10 (default value) connections to PlanetScale using a connection string in the .env file
const pool = mysql.createPool(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");
module.exports = pool;
