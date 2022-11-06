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
    // Get session ID from req body
    const {session_id} = req.body;

    // Should handle questionnaire, task, day, and session
    await pool.execute("DELETE task, sel_questionnaire, day FROM task INNER JOIN sel_questionnaire INNER JOIN day WHERE session_id=?", [session_id])
    .then(() => {
        console.log(session_id + " session id deleted from all task, questionnaire, and day tables");
    })
    .catch((err) => {
        console.log(err);
    });

    // Delete session entry with cooresponding id
    await pool.execute("DELETE FROM session WHERE id=?", [session_id])
    .then(() => {
    console.log("Session id " + session_id + " deleted from session table.");
    })
    .catch((err) => {
    console.log(err);
    });

    // Successful HTTPS
    res.sendStatus(201);
});

module.exports = router;
