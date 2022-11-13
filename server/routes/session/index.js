// Dependencies
const express = require("express");
const router = express.Router();
const create = require("./create");
const update = require("./update");
const del = require("./delete");
const day = require("./day");
const task = require("./task");
const read = require("./read");
const questionnaire = require("./questionnaire");
const { authorize } = require("../../utils/authorize");
const { indexController } = require("../../controllers/session");

// Routing
router.use("/create", create);
router.use("/update", update);
router.use("/delete", del);
router.use("/read", read);
router.use("/day", day);
router.use("/task", task);
router.use("/questionnaire", questionnaire);

/**
 * GET request handler for returning session table
 *
 * '/' - route path will match requests to the root route (in this case it would be '/session')
 * req - Receives GET request
 * res - Send back HTTPS result
 */
router.get("/", authorize(["admin", "counselor"]), indexController);

module.exports = router;
