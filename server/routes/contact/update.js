// Dependencies
const express = require("express");
const router = express.Router();
const { authorize } = require("../../utils/authorize");
const { updateController } = require("../../controllers/contact/update");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor"]), updateController);

module.exports = router;
