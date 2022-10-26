// Dependencies
const express = require("express");
const router = express.Router();

// I believe that this function calls after every deserialize as well as for each request
const authorize = () => {
  return router.use((req, res, next) => {
    console.log(`${req.method}:${req.baseUrl}`);
    // console.log(req.user);

    // If user is logged in continue, otherwise, 401
    if (req.user) next();
    else res.sendStatus(401);
  });
};

module.exports = { authorize };
