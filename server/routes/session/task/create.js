// Dependencies
const express = require("express");
const router = express.Router();
const {
  createController,
} = require("../../../controllers/session/task/create");
const { authorize } = require("../../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post(
  "/",
  authorize(["admin", "counselor", "student"]),
  createController
);

module.exports = router;
