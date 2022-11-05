// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../utils/pool");
const sessionDel = require("../session/delete")
const { authorize } = require("../../utils/authorize");

router.use("../session/delete", sessionDel);

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", async (req, res) => {
    // Get user ID from req body
    const {user_id} = req.body;
    console.log(user_id);

    let [type, fields] = await pool
    .query("SELECT type FROM users WHERE id=?;", [user_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

    // Subfiles entries only exist for student types, so they only need to be deleted if it's a student.
    if (type == "student") {
        console.log("STUDENT")
        // Grabs session_id associated with user id to pass to session.

        let [session_id, fields] = await pool
        .query("SELECT id FROM session WHERE user_id=?;", [user_id])
        .catch((err) => {
            // Do not throw error inside of promise
            console.log(err);
        });

        // Should call ../session/delete which should handle questionnaire, task, day, and session
        router.post("../session/delete", (req, res) => {
            res.send(session_id);
        })

        //Delete associated user_id from demographics
        
         await pool.execute("DELETE FROM demographics WHERE user_id=?", [user_id])
        .then(() => {
            console.log(user_id + " student id deleted from demographics table.");
            })
            .catch((err) => {
            console.log(err);
            });
    }
    
    // Delete user entry from table with cooresponding id.
    
    await pool.execute("DELETE FROM users WHERE id=?", [user_id])
    .then(() => {
        console.log(user_id + " deleted from user table.");
        })
        .catch((err) => {
        console.log(err);
        });
        
        // Successful HTTPS
        res.sendStatus(201);
});

module.exports = router;
