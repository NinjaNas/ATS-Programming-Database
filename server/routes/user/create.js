// Dependencies
const express = require("express");
const router = express.Router();
const { hash } = require("../../utils/bcrypt");
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");
const { createController } = require("../../controllers/create");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor"], createController));

module.exports = router;
