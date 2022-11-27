// Dependencies
const express = require("express");
const router = express.Router();
const update = require("./update");
const read = require("./read");
const create = require("./create");
const { authorize } = require("../../utils/authorize");
const { indexController } = require("../../controllers/demographics");

// Routing
router.use("/update", update);
router.use("/read", read);
router.use("/create", create);

/**
 * GET request handler for returning session table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/demographics')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get("/", authorize(["admin", "counselor"]), indexController);

module.exports = router;
