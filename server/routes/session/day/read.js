// Dependencies
const express = require("express");
const router = express.Router();
const { authorize } = require("../../../utils/authorize");
const { readController } = require("../../../controllers/session/day/read");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.get("/", authorize(["admin", "counselor"]), readController);

module.exports = router;