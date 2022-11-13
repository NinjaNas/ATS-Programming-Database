// Dependencies
const express = require("express");
const router = express.Router();
const { authorize } = require("../../utils/authorize");
const { createController } = require("../../controllers/user/create");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", createController);

module.exports = router;
