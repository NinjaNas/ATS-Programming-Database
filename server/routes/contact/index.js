// Dependencies
const express = require("express");
const router = express.Router();
const update = require("./update");
const create = require("./create");
const read = require("./read");
const { authorize } = require("../../utils/authorize");
const { indexController } = require("../../controllers/contact");

// Routing
router.use("/create", create);
router.use("/update", update);
router.use("/read", read);

/**
 * GET request handler for returning session table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/demographics')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get("/", authorize(["admin", "counselor"]), indexController);

module.exports = router;
