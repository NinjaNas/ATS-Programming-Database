const bcrypt = require("bcryptjs");

function hash(password) {
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
}

function compareHash(raw, hash) {
  // Takes raw password and compares it to hash
  return bcrypt.compareSync(raw, hash);
}

module.exports = { hash, compareHash };
