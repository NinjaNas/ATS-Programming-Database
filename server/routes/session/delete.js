// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor"]), async (req, res) => {
    // Get user ID from req body
    const session_id = req.body;

    // Delete session entry with cooresponding id
    pool.execute(
    "DELETE FROM session WHERE id=?", [session_id])
    .then(() => {
    console.log(session_id + " deleted from session table.");
    })
    .catch((err) => {
    console.log(err);
    });

    // Successful HTTPS
    res.sendStatus(201);
});

module.exports = router;
