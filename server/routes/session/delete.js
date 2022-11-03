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
    console.log("NICE JOB BRO YOU DID IT");
    // Get session ID from req body
    const session_id = req.body;

    // Should call ../session/delete which should handle questionnaire, task, day, and session
    router.post("/task/delete", async(req, res) => {
        res.send(session_id);
    })
    router.post("/day/delete", async(req, res) => {
        res.send(session_id);
    })

    // Delete session entry with cooresponding id
    pool.execute(
    "DELETE FROM task WHERE session_id=?", [session_id])
    .then(() => {
    console.log("All tasks associated with session id " + session_id + " deleted from task table.");
    })
    .catch((err) => {
    console.log(err);
    });

    // Successful HTTPS
    res.sendStatus(201);
});

module.exports = router;
