// Dependencies
const express = require("express");
const router = express.Router();
const create = require("./create");
const update = require("./update");
const del = require("./delete");
const read = require("./read");
const { authorize } = require("../../../utils/authorize");
const { indexController } = require("../../../controllers/session/day");

// Routing
router.use("/create", create);
router.use("/update", update);
router.use("/delete", del);
router.use("/read", read);

/**
 * GET request handler for returning day table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/session/day')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get(
  "/",
  authorize(["admin", "counselor", "student", "parent"]),
  indexController
);

module.exports = router;
