// Dependencies
const express = require("express");
const router = express.Router();
const create = require("./create");
const update = require("./update");
const read = require("./read");
const { indexController } = require("../../../controllers/session/wrapup/");
const { authorize } = require("../../../utils/authorize");

// Routing
router.use("/create", create);
router.use("/update", update);
router.use("/read", read);

/**
 * GET request handler for returning wrapup table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/session/wrapup')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get(
  "/",
  authorize(["admin", "counselor"]),
  indexController
);

module.exports = router;
