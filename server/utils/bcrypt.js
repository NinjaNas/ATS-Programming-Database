const bcrypt = require("bcryptjs");

/**
 * Creates a hashed password
 *
 * @param {string} password
 * @returns {string} password_hash
 */
const hash = (password) => {
  /* 
    Salting is a technique to protect passwords stored in databases 
    by adding a string of 32 or more characters and then hashing them. 
    Salting prevents hackers who breach an enterprise environment from 
    reverse-engineering passwords and stealing them from the database.

    Default value of 10 rounds.
    */
  const salt = bcrypt.genSaltSync();
  // Hash the password+salt
  return bcrypt.hashSync(password, salt);
};

/**
 * Compares the submitted password to the hashed password
 *
 * @param {string} raw
 * @param {string} hash
 * @returns {boolean}
 */
const compareHash = (raw, hash) => {
  // Takes raw password and compares it to hash
  return bcrypt.compareSync(raw, hash);
};

module.exports = { hash, compareHash };
