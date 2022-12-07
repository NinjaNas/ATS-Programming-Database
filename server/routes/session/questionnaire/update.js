// Dependencies
const express = require("express");
const {
  updateController,
} = require("../../../controllers/session/questionnaire/update");
const router = express.Router();
const { authorize } = require("../../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post(
  "/",
  authorize(["admin", "counselor", "student"]),
  updateController
);

module.exports = router;
