// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../../utils/pool");
const { authorize } = require("../../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor", "student"]), async (req, res) => {
    // Get user ID from req body
    const {id} = req.body;

    // Delete task entry with cooresponding id
    pool.execute(
    "DELETE FROM sel_questionnaire WHERE id=?", [id],
    )
    .then(() => {
    console.log(id + " deleted from questionnaire table.");
    })
    .catch((err) => {
    console.log(err);
    });

    // Successful HTTPS
    res.sendStatus(201);
});

module.exports = router;