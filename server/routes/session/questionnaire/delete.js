// Dependencies
const express = require("express");
const router = express.Router();
const { authorize } = require("../../../utils/authorize");
const {
  deleteController,
} = require("../../../controllers/session/questionnaire/delete");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post(
  "/",
  authorize(["admin", "counselor", "student"]),
  deleteController
);

module.exports = router;
