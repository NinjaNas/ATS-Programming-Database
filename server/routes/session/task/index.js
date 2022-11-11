// Dependencies
const express = require("express");
const router = express.Router();
const create = require("./create");
const update = require("./update");
const del = require("./delete");
const { indexController } = require("../../../controllers/session/task/");
const { authorize } = require("../../../utils/authorize");

// Routing
router.use("/create", create);
router.use("/update", update);
router.use("/delete", del);

/**
 * GET request handler for returning task table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/session/task')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get(
  "/",
  authorize(["admin", "counselor", "student", "parent"]),
  indexController
);

module.exports = router;
