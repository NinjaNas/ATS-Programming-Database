// Dependencies
const express = require("express");
const pool = require("../utils/pool");

/**
 * Used to authorize a route / request for given user types
 *
 * Alternatives if types is not required. req.isAuthenticated() and req.isUnauthenticated() are passport.js functions
 * @param {[string]} types
 * @returns Middleware next() or error status
 */
const authorize = (types) => {
  const router = express.Router();
  return router.use(async (req, res, next) => {
    // Print route and user object
    console.log(`${req.method}:${req.baseUrl}`);
    // console.log(req.user);

    // If user is logged in continue, otherwise, 401
    if (req.user) {
      // req.user = [rows[id], fields[]]
      let id = req.user[0][0].id;
      await pool
        .query("SELECT type FROM users WHERE id=?;", [id])
        .then((table) => {
          // Send HTTPS, promises return the table access rows at 0 and fields at 1
          // table = [rows[type], fields[]]
          if (types.includes(table[0][0].type)) {
            // Authorized
            next();
          } else {
            // Unauthorized
            res.sendStatus(401);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // User is not logged in
    } else res.sendStatus(401);
  });
};

module.exports = { authorize };
