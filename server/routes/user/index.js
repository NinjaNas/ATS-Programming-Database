// Dependencies
const express = require("express");
const router = express.Router();
const create = require("./create");
const update = require("./update");
const del = require("./delete");
const read = require("./read");
const { authorize } = require("../../utils/authorize");
const { indexController } = require("../../controllers/user/index");

// Routing
router.use("/create", create);
router.use("/update", update);
router.use("/delete", del);
router.use("/read", read);

/**
 * GET request handler for returning users table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/user')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get("/", authorize(["admin", "counselor"]), indexController);

module.exports = router;
