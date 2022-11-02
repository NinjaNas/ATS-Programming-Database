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
    const user_id = req.body;

    // Delete user entry with cooresponding id
    pool.execute(
    "DELETE FROM user WHERE id=?", [user_id],
    )
    .then(() => {
    console.log(user_id + " deleted from users table.");
    })
    .catch((err) => {
    console.log(err);
    });

    // Successful HTTPS
    res.sendStatus(201);
});

module.exports = router;
