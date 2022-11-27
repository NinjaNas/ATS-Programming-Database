// Dependencies
const express = require("express");
const router = express.Router();
const {
  updateController,
} = require("../../../controllers/session/wrapup/update");
const { authorize } = require("../../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post(
  "/",
  authorize(["admin"]),
  updateController
);

module.exports = router;
